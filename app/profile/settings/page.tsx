'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { User, Camera, Save, Loader2, Mail, Bell, Moon, Globe, Shield, Lock } from 'lucide-react';
import Image from 'next/image';

export default function ProfileSettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        bio: '',
        favorite_heroes: '',
        favorite_directors: '',
    });
    const supabase = createClient();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') throw error;

                if (data) {
                    setFormData({
                        full_name: data.full_name || '',
                        username: data.username || '',
                        bio: data.bio || '',
                        favorite_heroes: data.favorite_heroes?.join(', ') || '',
                        favorite_directors: data.favorite_directors?.join(', ') || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        try {
            const updates = {
                id: user.id,
                full_name: formData.full_name,
                username: formData.username,
                bio: formData.bio,
                favorite_heroes: formData.favorite_heroes.split(',').map(s => s.trim()).filter(Boolean),
                favorite_directors: formData.favorite_directors.split(',').map(s => s.trim()).filter(Boolean),
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from('users')
                .upsert(updates);

            if (error) throw error;
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-24 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Personal Information</h2>

                            {/* Avatar Placeholder */}
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                                        <Camera className="w-4 h-4" />
                                        Change Photo
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">Recommended: 400x400px</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors resize-none"
                                    placeholder="Tell us about your TFI fandom..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Favorite Heroes (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.favorite_heroes}
                                    onChange={(e) => setFormData({ ...formData, favorite_heroes: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
                                    placeholder="e.g. Prabhas, Pawan Kalyan, Mahesh Babu"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Favorite Directors (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.favorite_directors}
                                    onChange={(e) => setFormData({ ...formData, favorite_directors: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
                                    placeholder="e.g. Rajamouli, Trivikram, Sukumar"
                                />
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div className="space-y-6 pt-6">
                            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">App Preferences</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Default View</label>
                                    <select className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors">
                                        <option value="month">Month View</option>
                                        <option value="week">Week View</option>
                                        <option value="list">List View</option>
                                        <option value="timeline">Timeline View</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Theme Accent</label>
                                    <select className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors">
                                        <option value="purple">TFI Purple</option>
                                        <option value="blue">Mega Blue</option>
                                        <option value="red">Rebel Red</option>
                                        <option value="yellow">Lion Yellow</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <h3 className="text-white font-medium">Email Notifications</h3>
                                        <p className="text-sm text-gray-400">Receive updates about new releases</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <h3 className="text-white font-medium">Public Profile</h3>
                                        <p className="text-sm text-gray-400">Allow others to see your fandom</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Data Section */}
                        <div className="space-y-6 pt-6">
                            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Data & Privacy</h2>
                            <div className="flex gap-4">
                                <button type="button" className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors border border-white/10">
                                    Export My Data
                                </button>
                                <button type="button" className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors border border-red-500/20">
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <button
                                disabled={saving}
                                className="px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center gap-2 disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
