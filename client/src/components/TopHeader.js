"use client";

import { Bell, Menu } from 'lucide-react';

export default function TopHeader({ onMenuClick }) {
    return (
        <header className="bg-white py-4 px-4 md:py-5 md:px-8 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Left: Greeting */}
                <div>
                    <h2 suppressHydrationWarning className="text-xl font-bold text-gray-800">
                        {new Date().getHours() < 12 ? 'Good Morning' : 'Good Afternoon'} Shakil
                    </h2>
                    <p suppressHydrationWarning className="text-sm text-gray-500 mt-0.5">
                        {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-6">

                {/* Notification Bell */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200"></div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-900">Shakil Ahmed</p>
                        <p className="text-xs text-gray-500 font-medium">Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-white shadow-sm overflow-hidden relative">
                        {/* Placeholder Avatar till user uploads real one */}
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Asif"
                            alt="Asif Riaj"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
