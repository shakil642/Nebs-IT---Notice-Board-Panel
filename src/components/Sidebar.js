"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    DollarSign,
    FileText,
    Clock,
    Send,
    Briefcase,
    FolderOpen,
    ClipboardList,
    Activity,
    LogOut,
    User
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    {
        name: 'Employee',
        icon: Users,
        href: '#',
        subItems: [
            { name: 'Employee Database', href: '/employee/database' },
            { name: 'Add New Employee', href: '/employee/add' },
            { name: 'Performance Report', href: '/employee/performance' },
            { name: 'Performance History', href: '/employee/history' },
        ]
    },
    { name: 'Payroll', icon: DollarSign, href: '/payroll' },
    { name: 'Pay Slip', icon: FileText, href: '/payslip' },
    { name: 'Attendance', icon: Clock, href: '/attendance' },
    { name: 'Request Center', icon: Send, href: '/requests' },
    { name: 'Career Database', icon: Briefcase, href: '/career' },
    { name: 'Document manager', icon: FolderOpen, href: '/documents' },
    { name: 'Notice Board', icon: ClipboardList, href: '/', active: true },
    { name: 'Activity Log', icon: Activity, href: '/activity' },
    { name: 'Exit Interview', icon: LogOut, href: '/exit' },
    { name: 'Profile', icon: User, href: '/profile' },
];

export default function Sidebar() {
    const [isEmployeeOpen, setEmployeeOpen] = useState(true);

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-10">
            <div className="p-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    {/* Logo placeholder */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                    </svg>
                    <span>Nebs-IT</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 pb-4 space-y-1">
                {menuItems.map((item) => (
                    <div key={item.name}>
                        {item.subItems ? (
                            <>
                                <button
                                    onClick={() => setEmployeeOpen(!isEmployeeOpen)}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-900`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-gray-400" />
                                        {item.name}
                                    </div>
                                    <svg className={`w-4 h-4 transition-transform ${isEmployeeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isEmployeeOpen && (
                                    <div className="pl-12 space-y-1 mt-1">
                                        {item.subItems.map(sub => (
                                            <Link key={sub.name} href={sub.href} className="block py-2 text-sm text-gray-500 hover:text-gray-900">
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${item.active
                                    ? 'bg-orange-50 text-orange-600'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${item.active ? 'text-orange-500' : 'text-gray-400'}`} />
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
