'use client';

import { useState } from 'react';
import { X, Calendar, MapPin, Link as LinkIcon, Tag, Film, Cake, Music, Star, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date;
    onEventCreated?: () => void;
}

const eventTypes = [
    { value: 'release', label: 'Movie Release', icon: Film, color: 'from-yellow-400 to-orange-500' },
    { value: 'birthday', label: 'Birthday', icon: Cake, color: 'from-pink-400 to-red-500' },
    { value: 'jayanti', label: 'Jayanti', icon: Star, color: 'from-purple-400 to-pink-500' },
    { value: 'audio_launch', label: 'Audio Launch', icon: Music, color: 'from-blue-400 to-cyan-500' },
    { value: 'premiere', label: 'Premiere', icon: Sparkles, color: 'from-green-400 to-emerald-500' },
    { value: 'anniversary', label: 'Anniversary', icon: Calendar, color: 'from-indigo-400 to-purple-500' },
    { value: 'custom', label: 'Custom Event', icon: Calendar, color: 'from-gray-400 to-gray-500' },
];

const popularTags = [
    'Pawan Kalyan', 'Prabhas', 'Mahesh Babu', 'Allu Arjun', 'Jr NTR', 'Ram Charan',
    'Chiranjeevi', 'Rajamouli', 'Trivikram', 'Sukumar', 'DSP', 'Thaman'
];

const platformOptions = [
    { value: 'youtube', label: 'YouTube', color: 'bg-red-500' },
    { value: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
    { value: 'twitter', label: 'Twitter/X', color: 'bg-blue-500' },
    { value: 'spotify', label: 'Spotify', color: 'bg-green-500' },
    { value: 'bookmyshow', label: 'BookMyShow', color: 'bg-orange-500' },
    { value: 'custom', label: 'Custom Link', color: 'bg-gray-500' },
];

export default function CreateEventModal({ isOpen, onClose, selectedDate, onEventCreated }: CreateEventModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        eventTime: '',
        eventType: 'release',
        isPublic: false,
    });

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [customTag, setCustomTag] = useState('');
    const [links, setLinks] = useState<Array<{ platform: string; url: string; title: string }>>([]);
    const [newLink, setNewLink] = useState({ platform: 'youtube', url: '', title: '' });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Implement API call to create event
        console.log('Creating event:', {
            ...formData,
            tags: selectedTags,
            links,
        });

        // Mock success
        alert('Event created successfully! 🎉');
        onEventCreated?.();
        onClose();
    };

    const addTag = (tag: string) => {
        if (tag && !selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const removeTag = (tag: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const addLink = () => {
        if (newLink.url) {
            setLinks([...links, newLink]);
            setNewLink({ platform: 'youtube', url: '', title: '' });
        }
    };

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-black/30 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Create TFI Event
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Event Type Selection */}
                    <div>
                        <label className="block text-white font-semibold mb-3">Event Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {eventTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, eventType: type.value })}
                                        className={`p - 3 rounded - xl border - 2 transition - all ${formData.eventType === type.value
                                                ? `bg-gradient-to-r ${type.color} border-white text-black font-bold`
                                                : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                                            } `}
                                    >
                                        <Icon className="w-5 h-5 mx-auto mb-1" />
                                        <span className="text-xs">{type.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-white font-semibold mb-2">Event Title *</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., OG Movie Release, Pawan Kalyan Birthday"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white font-semibold mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Add details about this event..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-semibold mb-2">Date *</label>
                            <input
                                type="date"
                                required
                                value={formData.eventDate}
                                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-2">Time (Optional)</label>
                            <input
                                type="time"
                                value={formData.eventTime}
                                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-white font-semibold mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {popularTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => selectedTags.includes(tag) ? removeTag(tag) : addTag(tag)}
                                    className={`px - 3 py - 1 rounded - full text - sm font - medium transition - all ${selectedTags.includes(tag)
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        } `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Custom Tag Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                placeholder="Add custom tag..."
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag(customTag);
                                        setCustomTag('');
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    addTag(customTag);
                                    setCustomTag('');
                                }}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                <Tag className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Selected Tags */}
                        {selectedTags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-sm font-medium flex items-center gap-2"
                                    >
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)}>
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    <div>
                        <label className="block text-white font-semibold mb-2">Attach Links</label>

                        {/* Add Link Form */}
                        <div className="space-y-2 mb-3">
                            <select
                                value={newLink.platform}
                                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                {platformOptions.map((platform) => (
                                    <option key={platform.value} value={platform.value}>
                                        {platform.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <input
                                type="text"
                                value={newLink.title}
                                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                placeholder="Link title (optional)"
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button
                                type="button"
                                onClick={addLink}
                                className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <LinkIcon className="w-4 h-4" />
                                Add Link
                            </button>
                        </div>

                        {/* Added Links */}
                        {links.length > 0 && (
                            <div className="space-y-2">
                                {links.map((link, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`px - 2 py - 1 ${platformOptions.find(p => p.value === link.platform)?.color} text - white text - xs rounded`}>
                                                    {platformOptions.find(p => p.value === link.platform)?.label}
                                                </span>
                                                <span className="text-white text-sm">{link.title || link.url}</span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeLink(index)}
                                            className="p-1 hover:bg-white/10 rounded text-red-400"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Public/Private Toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isPublic"
                            checked={formData.isPublic}
                            onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                            className="w-5 h-5 rounded bg-white/10 border-white/20"
                        />
                        <label htmlFor="isPublic" className="text-white">
                            Make this event public (visible to everyone)
                        </label>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-bold hover:scale-105 transition-transform"
                        >
                            Create Event 🎉
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
