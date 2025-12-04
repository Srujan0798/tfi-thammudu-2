'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send, Sparkles, Loader2, Trash2, MessageSquare, Mic, MicOff, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    images?: string[];
}

interface TFIChatbotProps {
    userContext?: {
        favoriteHeroes?: string[];
        favoriteDirectors?: string[];
    };
}

const QUICK_REPLIES = [
    "Upcoming Movies 🎬",
    "Prabhas Updates 👑",
    "Suggest a Movie 🍿",
    "TFI News 📰"
];

export default function TFIChatbot({ userContext }: TFIChatbotProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hey anna! 🎬 I'm your TFI calendar assistant! Ask me about movie releases, birthdays, or any TFI events you want to track. What can I help you with today?",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const [personality, setPersonality] = useState<'mass' | 'classy' | 'neutral'>('mass');

    // ... (Speech Recognition useEffect)

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async (text: string = input) => {
        if ((!text.trim() && !selectedImage) || isLoading) return;

        const userMessage = text.trim();
        const currentImage = selectedImage;

        setInput('');
        setSelectedImage(null);

        const newMessage: Message = {
            role: 'user',
            content: userMessage,
            images: currentImage ? [currentImage] : undefined
        };

        setMessages((prev) => [...prev, newMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, newMessage],
                    userContext: {
                        ...userContext,
                        currentPage: pathname,
                        currentDate: new Date().toLocaleDateString(),
                        personality,
                    },
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.message },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: "Sorry anna, I'm having some trouble right now. Please try again! 😅",
                    },
                ]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Oops! Something went wrong. Let's try that again! 🎬",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (handleKeyPress, clearHistory)

    if (!isOpen) {
        // ... (return button)
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl border border-white/20 flex flex-col z-50 animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-black" />
                        <div>
                            <h3 className="font-bold text-black">TFI Assistant</h3>
                            <p className="text-xs text-black/70">Your cinema companion 🎬</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            // onClick={clearHistory} // Assuming clearHistory is defined elsewhere
                            className="p-1 hover:bg-black/10 rounded-lg transition-colors text-black"
                            title="Clear History"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-black/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-black" />
                        </button>
                    </div>
                </div>

                {/* Personality Switcher */}
                <div className="flex bg-black/10 rounded-lg p-1 gap-1">
                    {(['mass', 'classy', 'neutral'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPersonality(p)}
                            className={`flex-1 py-1 text-[10px] font-bold uppercase rounded transition-all ${personality === p
                                    ? 'bg-black text-white shadow-sm'
                                    : 'text-black/60 hover:bg-black/5'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-3 rounded-2xl ${message.role === 'user'
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-tr-none'
                                : 'bg-white/10 text-white border border-white/20 rounded-tl-none'
                                }`}
                        >
                            {message.images && message.images.map((img, i) => (
                                <img key={i} src={img} alt="Uploaded" className="w-full rounded-lg mb-2 max-h-40 object-cover" />
                            ))}
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                className="text-sm prose prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 break-words"
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
                {/* ... (Loader) */}
                <div ref={messagesEndRef} />
            </div>

            {/* Image Preview */}
            {selectedImage && (
                <div className="px-4 pb-2 flex items-center gap-2">
                    <div className="relative">
                        <img src={selectedImage} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-white/20" />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                    </div>
                </div>
            )}

            {/* Quick Replies */}
            {/* ... */}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                        title="Upload Image"
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={toggleListening}
                        className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        title="Voice Input"
                    >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={isListening ? "Listening..." : "Ask about TFI events..."}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all disabled:opacity-50"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || (!input.trim() && !selectedImage)}
                        className="p-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                {/* ... (Powered by Gemini) */}
            </div>
        </div>
    );
}
