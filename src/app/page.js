"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import NoticeTable from '../components/NoticeTable';
import FilterBar from '../components/FilterBar';
import { Plus, Edit3 } from 'lucide-react';
import { fetchNoticeStats } from '@/lib/api';

export default function Home() {
    const [stats, setStats] = useState({ active: 0, draft: 0 });
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const refreshStats = () => {
        setUpdateTrigger(prev => prev + 1);
    };

    useEffect(() => {
        fetchNoticeStats().then(setStats).catch(console.error);
    }, [updateTrigger]);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notice Management</h1>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="text-green-600 font-medium">Active Notices: {stats.active}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-orange-500 font-medium">Draft Notice: {stats.draft.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* CREATE NOTICE BUTTON (Swapped Position: Now First) */}
                    <Link
                        href="/create"
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Notice</span>
                    </Link>

                    {/* DRAFT NOTICE BUTTON (Swapped Position: Now Second) */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-orange-200 text-orange-500 rounded-md font-medium hover:bg-orange-50 transition-colors">
                        <Edit3 className="w-4 h-4" />
                        <span>All Draft Notice</span>
                    </button>
                </div>
            </div>

            <FilterBar />

            <NoticeTable onUpdate={refreshStats} />
        </>
    );
}
