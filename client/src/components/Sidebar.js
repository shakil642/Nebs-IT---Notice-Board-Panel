"use client";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Receipt,
    CalendarCheck,
    FileInput,
    Briefcase,
    FolderOpen,
    ClipboardList,
    Activity,
    LogOut,
    ChevronDown,
    ChevronRight,
    UserCircle
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isCareerOpen, setIsCareerOpen] = useState(false);

    // Helper to check if a link is active
    const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path));

    return (
        <aside className="w-[280px] bg-white border-r border-gray-100 h-full flex flex-col hidden md:flex font-sans">
            {/* Logo Area */}
            <div className="p-8 flex items-center gap-2">
                <img
                    src="https://www.nebs-it.com/_next/static/media/logo.cd876701.png"
                    alt="Nebs-IT Logo"
                    className="h-8 w-auto object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide py-4">

                <MenuItem icon={LayoutDashboard} label="Dashboard" href="/" isActive={pathname === '/'} />

                {/* Employee Dropdown */}
                <div className="space-y-1">
                    <button
                        onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors group ${isEmployeeOpen ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5" />
                            <span>Employee</span>
                        </div>
                        {isEmployeeOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    {isEmployeeOpen && (
                        <div className="pl-4 space-y-1 animate-fade-in text-gray-500">
                            <SubMenuItem label="Employee Database" />
                            <SubMenuItem label="Add New Employee" />
                            <SubMenuItem label="Performance Report" />
                            <SubMenuItem label="Performance History" />
                        </div>
                    )}
                </div>

                <MenuItem icon={CreditCard} label="Payroll" href="/payroll" isActive={isActive('/payroll')} />
                <MenuItem icon={Receipt} label="Pay Slip" href="/payslip" isActive={isActive('/payslip')} />
                <MenuItem icon={CalendarCheck} label="Attendance" href="/attendance" isActive={isActive('/attendance')} />
                <MenuItem icon={FileInput} label="Request Center" href="/request" isActive={isActive('/request')} />

                {/* Career Dropdown */}
                <div className="space-y-1">
                    <button
                        onClick={() => setIsCareerOpen(!isCareerOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors group ${isCareerOpen ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5" />
                            <span>Career Database</span>
                        </div>
                        {isCareerOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    {isCareerOpen && (
                        <div className="pl-4 space-y-1 animate-fade-in text-gray-500">
                            <SubMenuItem label="Job Postings" />
                            <SubMenuItem label="Applications" />
                        </div>
                    )}
                </div>

                <MenuItem icon={FolderOpen} label="Document manager" href="/documents" isActive={isActive('/documents')} />
                <MenuItem icon={ClipboardList} label="Notice Board" href="/" isActive={pathname === '/' || pathname === '/create'} />
                <MenuItem icon={Activity} label="Activity Log" href="/activity" isActive={isActive('/activity')} />
                <MenuItem icon={LogOut} label="Exit Interview" href="/exit" isActive={isActive('/exit')} />

                <div className="pt-4 mt-4 border-t border-gray-100">
                    <MenuItem icon={UserCircle} label="Profile" href="/profile" isActive={isActive('/profile')} />
                </div>

            </nav>
        </aside>
    );
}

function MenuItem({ icon: Icon, label, href = '#', isActive = false }) {
    return (
        <a href={href} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors group ${isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}>
            <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
            <span>{label}</span>
        </a>
    );
}

function SubMenuItem({ label, active = false }) {
    return (
        <div className="relative">
            {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-md"></div>}
            <a href="#" className={`block px-4 py-2 text-sm ml-8 rounded-lg transition-colors ${active ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
                }`}>
                {label}
            </a>
        </div>
    );
}
