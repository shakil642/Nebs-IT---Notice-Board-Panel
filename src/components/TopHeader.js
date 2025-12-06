"use client";

import { Bell, Search, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const MOCK_NOTIFICATIONS = [
    { id: 1, text: 'New policy "Code of Conduct" published', type: 'info', time: '2 mins ago' },
    { id: 2, text: 'System maintenance scheduled for Friday', type: 'warning', time: '1 hour ago' },
    { id: 3, text: 'Your request #2024 has been approved', type: 'success', time: '3 hours ago' },
];

export default function TopHeader() {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 relative z-20">
            <div>
                <h2 className="text-lg font-bold text-gray-800">Good Afternoon Shakil</h2>
                <p className="text-sm text-gray-500">13 June, 2026</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <button
                        className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell className="w-6 h-6" />
                        {/* Red Dot style as requested */}
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                            <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">Notifications</h3>
                                <span className="text-xs text-orange-500 cursor-pointer">Mark all read</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {MOCK_NOTIFICATIONS.map(notif => (
                                    <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 flex gap-3 cursor-pointer border-b border-gray-50 last:border-0">
                                        <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${notif.type === 'success' ? 'bg-green-500' :
                                                notif.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                                            }`} />
                                        <div>
                                            <p className="text-sm text-gray-700 leading-snug">{notif.text}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100 text-center">
                                <span className="text-xs font-medium text-blue-500 cursor-pointer hover:text-blue-600">View All Activity</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-800 leading-none">Shakil Ahmed</p>
                        <p className="text-xs text-gray-500">Hr</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 overflow-hidden border border-gray-200">
                        {/* Placeholder Avatar */}
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shakil" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
}
