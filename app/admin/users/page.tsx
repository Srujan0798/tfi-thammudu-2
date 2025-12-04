'use client';

import { useState } from 'react';
import { MoreHorizontal, Shield, User, Trash2, Mail, CheckSquare } from 'lucide-react';

export default function UsersPage() {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const users = [1, 2, 3, 4, 5];

    const toggleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users);
        }
    };

    const toggleSelectUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(u => u !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
                    <p className="text-white/60">Manage system users and roles.</p>
                </div>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                    Add User
                </button>
            </div>

            {/* Bulk Actions Bar */}
            {selectedUsers.length > 0 && (
                <div className="absolute top-20 left-0 right-0 bg-blue-600 text-white p-4 rounded-xl flex justify-between items-center shadow-lg z-10 animate-in fade-in slide-in-from-top-2">
                    <span className="font-bold">{selectedUsers.length} users selected</span>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm">
                            <Mail className="w-4 h-4" /> Email
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm">
                            <Shield className="w-4 h-4" /> Change Role
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-lg transition-colors text-sm">
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </div>
                </div>
            )}

            {/* User List */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 border-b border-white/10">
                        <tr>
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded border-white/20 bg-slate-800 text-yellow-500 focus:ring-yellow-500"
                                    checked={selectedUsers.length === users.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-4 text-sm font-medium text-white/60">User</th>
                            <th className="p-4 text-sm font-medium text-white/60">Role</th>
                            <th className="p-4 text-sm font-medium text-white/60">Status</th>
                            <th className="p-4 text-sm font-medium text-white/60">Joined</th>
                            <th className="p-4 text-sm font-medium text-white/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((id) => (
                            <tr key={id} className={`hover:bg-white/5 transition-colors ${selectedUsers.includes(id) ? 'bg-blue-500/5' : ''}`}>
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-white/20 bg-slate-800 text-yellow-500 focus:ring-yellow-500"
                                        checked={selectedUsers.includes(id)}
                                        onChange={() => toggleSelectUser(id)}
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                            <User className="w-4 h-4 text-white/50" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">User Name {id}</p>
                                            <p className="text-white/40 text-xs">user{id}@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                                        <Shield className="w-3 h-3" />
                                        User
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                        Active
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-white/60">
                                    Oct 24, 2023
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
