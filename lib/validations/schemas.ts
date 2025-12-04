import { z } from 'zod';

// User Validation Schemas
export const UserSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    location: z.string().optional(),
});

export const UpdateUserSchema = UserSchema.partial();

// Event Validation Schemas
export const EventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
    eventDate: z.string().datetime('Invalid date format'),
    eventType: z.enum(['release', 'birthday', 'jayanti', 'audio', 'announcement', 'other']),
    isPublic: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
    links: z.array(z.object({
        linkType: z.enum(['youtube', 'twitter', 'instagram', 'spotify', 'bookmyshow', 'other']),
        url: z.string().url('Invalid URL'),
        title: z.string().optional(),
    })).optional(),
});

export const UpdateEventSchema = EventSchema.partial();

// Comment Validation Schema
export const CommentSchema = z.object({
    eventId: z.string().uuid('Invalid event ID'),
    content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment must be less than 1000 characters'),
});

// Reaction Validation Schema
export const ReactionSchema = z.object({
    eventId: z.string().uuid('Invalid event ID'),
    type: z.enum(['like', 'love', 'hype', 'fire', 'sad']),
});

// Follow Validation Schema
export const FollowSchema = z.object({
    followingId: z.string().uuid('Invalid user ID'),
});

// Notification Validation Schema
export const NotificationSchema = z.object({
    userId: z.string().uuid('Invalid user ID'),
    type: z.enum(['event', 'follow', 'comment', 'reaction', 'system']),
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    metadata: z.record(z.any()).optional(),
});

// Shared Calendar Validation Schema
export const SharedCalendarSchema = z.object({
    isPublic: z.boolean().default(false),
    settings: z.record(z.any()).optional(),
});

// Auth Validation Schemas
export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const SignupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
});

export const ResetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

// Search Validation Schema
export const SearchSchema = z.object({
    query: z.string().min(1, 'Search query is required'),
    type: z.enum(['events', 'users', 'all']).optional(),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
});

// Filter Validation Schema
export const EventFilterSchema = z.object({
    eventType: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    createdBy: z.string().uuid().optional(),
});

// Type exports for TypeScript
export type UserInput = z.infer<typeof UserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type EventInput = z.infer<typeof EventSchema>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
export type CommentInput = z.infer<typeof CommentSchema>;
export type ReactionInput = z.infer<typeof ReactionSchema>;
export type FollowInput = z.infer<typeof FollowSchema>;
export type NotificationInput = z.infer<typeof NotificationSchema>;
export type SharedCalendarInput = z.infer<typeof SharedCalendarSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type SearchInput = z.infer<typeof SearchSchema>;
export type EventFilterInput = z.infer<typeof EventFilterSchema>;
