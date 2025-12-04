import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
let requestCount = 0;
let windowStart = Date.now();

function checkRateLimit(): boolean {
    const now = Date.now();
    if (now - windowStart > RATE_LIMIT_WINDOW) {
        requestCount = 0;
        windowStart = now;
    }
    if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }
    requestCount++;
    return true;
}

const TFI_PERSONALITY_PROMPT = `You are a passionate Telugu Film Industry (TFI) expert and enthusiast! Your personality:

🎬 **Knowledge**: You know EVERYTHING about TFI - from classic films like *Mahanati* and *Mayabazar* to modern blockbusters like *Baahubali*, *RRR*, *Pushpa*, and *Kalki 2898 AD*. You track heroes (Prabhas, Pawan Kalyan, Mahesh Babu, Allu Arjun, Jr NTR, Ram Charan, Chiranjeevi, Balakrishna), directors (Rajamouli, Trivikram, Sukumar, Nag Ashwin), and music directors (DSP, Thaman, Keeravani).

⚡ **Personality**: You're energetic, enthusiastic, and speak like a true TFI fan! Use Telugu film references, celebrate achievements, and show genuine excitement about releases, birthdays, and events. You're friendly, conversational, and sometimes use popular TFI dialogues or references.

🎯 **Purpose**: You help users with:
- Suggesting TFI events to add to their calendar
- Providing information about movie releases, birthdays, jayantis
- Recommending which events to track based on their interests
- Sharing TFI news and updates
- Answering questions about TFI history and current happenings

💬 **Tone**: Casual, enthusiastic, knowledgeable. Use emojis occasionally. Mix English with occasional Telugu words when appropriate (like "anna", "thammudu", "mass", "blockbuster", "elevation", "BGM").

⚠️ **Constraints**:
- If asked about non-TFI topics, politely steer the conversation back to Telugu cinema.
- Do not make up release dates. If unsure, say "TBD" or "Official announcement awaited".
- Be respectful to all heroes and fan bases (no fan wars!).

Remember: You're helping users organize their TFI fandom through a calendar app. Always be helpful, accurate, and show your love for Telugu cinema!`;

async function retryOperation<T>(operation: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryOperation(operation, retries - 1, delay * 2);
    }
}

const PERSONALITIES = {
    'mass': `You are a hardcore Tollywood (TFI) fan. You are enthusiastic, energetic, and use TFI slang like "Anna", "Thop", "Ramp", "Mass", "Elevation".
    - You love commercial cinema, hero elevations, and BGM.
    - You refer to users as "Anna" or "Boss".
    - Your tone is high-energy and hype-filled.
    - You are respectful but very passionate.`,

    'classy': `You are a sophisticated film critic and TFI connoisseur. You appreciate technical details, screenplay, cinematography, and music.
    - You analyze movies deeply rather than just hyping them.
    - You use terms like "Screenplay", "Cinematography", "BGM", "Direction".
    - Your tone is calm, analytical, and appreciative of art.
    - You refer to users as "Sir" or "Friend".`,

    'neutral': `You are a helpful and professional TFI Assistant. You provide accurate information about movies, events, and dates.
    - You are concise and factual.
    - You do not use slang or excessive emotion.
    - Your goal is to be efficient and informative.`
};

export async function createTFIChatCompletion(
    messages: Array<{ role: 'user' | 'assistant'; content: string; images?: string[] }>,
    userContext?: {
        favoriteHeroes?: string[];
        favoriteDirectors?: string[];
        upcomingEvents?: any[];
        currentPage?: string;
        currentDate?: string;
        personality?: 'mass' | 'classy' | 'neutral';
    }
) {
    if (!checkRateLimit()) {
        return {
            success: false,
            error: 'Rate limit exceeded. Please try again in a minute.',
        };
    }

    try {
        // Use gemini-1.5-flash for multimodal support
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const personalityKey = userContext?.personality || 'mass';
        const personalityPrompt = PERSONALITIES[personalityKey];

        // Build context
        let contextMessage = '';
        if (userContext) {
            if (userContext.currentDate) {
                contextMessage += `\nCurrent Date: ${userContext.currentDate}`;
            }
            if (userContext.currentPage) {
                contextMessage += `\nUser is currently viewing: ${userContext.currentPage}`;
            }
            if (userContext.favoriteHeroes?.length) {
                contextMessage += `\nUser's favorite heroes: ${userContext.favoriteHeroes.join(', ')}`;
            }
            if (userContext.favoriteDirectors?.length) {
                contextMessage += `\nUser's favorite directors: ${userContext.favoriteDirectors.join(', ')}`;
            }
            if (userContext.upcomingEvents?.length) {
                contextMessage += `\nUser's upcoming events: ${userContext.upcomingEvents.map(e => e.title).join(', ')}`;
            }
        }

        // Format conversation history
        // Note: For multimodal, we need to construct the prompt differently if using chatSession,
        // but for single turn generateContent, we can just append text.
        // For simplicity in this stateless implementation, we'll append history as text.
        const conversationHistory = messages
            .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
            .join('\n\n');

        const prompt = `${TFI_PERSONALITY_PROMPT}
        
${personalityPrompt}

${contextMessage}

Previous conversation:
${conversationHistory}

Respond as the TFI expert assistant:`;

        // Check for images in the last message
        const lastMessage = messages[messages.length - 1];
        const imageParts: any[] = [];

        if (lastMessage.role === 'user' && lastMessage.images && lastMessage.images.length > 0) {
            for (const base64Image of lastMessage.images) {
                // Remove data URL prefix if present
                const base64Data = base64Image.split(',')[1] || base64Image;
                imageParts.push({
                    inlineData: {
                        data: base64Data,
                        mimeType: 'image/jpeg', // Assuming JPEG for simplicity, or detect from prefix
                    },
                });
            }
        }

        const result = await retryOperation(async () => {
            if (imageParts.length > 0) {
                return await model.generateContent([prompt, ...imageParts]);
            } else {
                return await model.generateContent(prompt);
            }
        });

        const response = await result.response;
        const text = response.text();

        return {
            success: true,
            message: text,
        };
    } catch (error: any) {
        console.error('Error in TFI chat completion:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate response',
        };
    }
}

export async function generateEventSuggestions(userPreferences: {
    favoriteHeroes?: string[];
    favoriteDirectors?: string[];
    interests?: string[];
}) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `As a TFI expert, suggest 5-10 important upcoming events that a fan should add to their calendar.

User preferences:
- Favorite heroes: ${userPreferences.favoriteHeroes?.join(', ') || 'Not specified'}
- Favorite directors: ${userPreferences.favoriteDirectors?.join(', ') || 'Not specified'}
- Interests: ${userPreferences.interests?.join(', ') || 'General TFI'}

Current date: ${new Date().toLocaleDateString()}

Suggest events like:
- Movie releases (confirmed dates)
- Hero/Director birthdays
- Jayantis (death anniversaries)
- Audio launches
- Important TFI milestones

Format each suggestion as JSON:
{
  "title": "Event name",
  "date": "YYYY-MM-DD",
  "type": "release|birthday|jayanti|audio_launch|anniversary",
  "description": "Brief description",
  "tags": ["tag1", "tag2"],
  "reason": "Why this is relevant to the user"
}

Return ONLY a JSON array of suggestions, no other text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const suggestions = JSON.parse(jsonMatch[0]);
            return {
                success: true,
                suggestions,
            };
        }

        return {
            success: false,
            error: 'Could not parse suggestions',
        };
    } catch (error: any) {
        console.error('Error generating event suggestions:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate suggestions',
        };
    }
}

export async function analyzeTFINews(newsText: string) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Analyze this TFI news and extract any calendar-worthy events:

News: ${newsText}

Extract:
1. Movie release dates
2. Birthday announcements
3. Audio launch dates
4. Premiere dates
5. Any other significant TFI events

Format as JSON array:
[
  {
    "title": "Event name",
    "date": "YYYY-MM-DD" or "TBD",
    "type": "release|birthday|audio_launch|premiere|announcement",
    "description": "Details",
    "tags": ["relevant", "tags"],
    "confidence": "high|medium|low"
  }
]

Return ONLY the JSON array, no other text. If no events found, return empty array [].`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const events = JSON.parse(jsonMatch[0]);
            return {
                success: true,
                events,
            };
        }

        return {
            success: true,
            events: [],
        };
    } catch (error: any) {
        console.error('Error analyzing TFI news:', error);
        return {
            success: false,
            error: error.message || 'Failed to analyze news',
        };
    }
}

export async function analyzeSentiment(comments: string[]) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Analyze the sentiment of these social media comments about a movie/event:

Comments:
${comments.map(c => `- ${c}`).join('\n')}

Provide a "Hype Score" from 0 to 100 (where 100 is extreme hype/positive) and a brief summary of the general sentiment.

Format as JSON:
{
  "score": 85,
  "sentiment": "Positive|Mixed|Negative",
  "summary": "Fans are excited about...",
  "keywords": ["keyword1", "keyword2"]
}

Return ONLY the JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const analysis = JSON.parse(jsonMatch[0]);
            return {
                success: true,
                analysis,
            };
        }

        return {
            success: false,
            error: 'Could not parse sentiment analysis',
        };
    } catch (error: any) {
        console.error('Error analyzing sentiment:', error);
        return {
            success: false,
            error: error.message || 'Failed to analyze sentiment',
        };
    }
}

export async function prioritizeNotification(notification: { title: string; message: string }) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Analyze this notification and determine if it is "Urgent", "Important", or "Normal" for a Tollywood fan.
        
        Notification:
        Title: ${notification.title}
        Message: ${notification.message}
        
        Rules:
        - Urgent: Ticket bookings opening, sudden release date changes, breaking news about top stars.
        - Important: New trailer release, audio launch date, festival wishes from stars.
        - Normal: General news, rumors, minor updates.
        
        Return ONLY the priority string: "Urgent" | "Important" | "Normal"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const priority = response.text().trim();

        return { success: true, priority };
    } catch (error) {
        return { success: false, priority: 'Normal' };
    }
}

export async function summarizeNotifications(notifications: Array<{ title: string; message: string }>) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Summarize these missed notifications into a single concise paragraph for a user returning to the app. Focus on the most important updates.
        
        Notifications:
        ${notifications.map(n => `- ${n.title}: ${n.message}`).join('\n')}
        
        Keep it friendly and exciting. Use emojis.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        return { success: true, summary };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
