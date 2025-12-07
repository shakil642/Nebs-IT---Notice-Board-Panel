"use client";

import { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import NoticeTable from "@/components/NoticeTable";
import { fetchNoticeStats } from '@/lib/api';
import { Plus } from "lucide-react";
import Link from 'next/link';

export default function NoticesPage() {
    const [stats, setStats] = useState({ active: 0, draft: 0 });
    const [updateTrigger, setUpdateTrigger] = useState(0);

    // Fetch stats on load and when updateTrigger changes
    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchNoticeStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load stats", error);
            }
        };
        getStats();
    }, [updateTrigger]);

    // Function to trigger a refresh of stats
    const refreshStats = () => {
        setUpdateTrigger(prev => prev + 1);
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
                    {/* User requested "only notice management" - keeping stats as they are helpful context, but Title is specific */}
                </div>

                <div className="flex gap-3">
                    <Link href="/create">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors">
                            <Plus className="w-4 h-4" />
                            Create Notice
                        </button>
                    </Link>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar />

            {/* Notice Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <NoticeTable onUpdate={refreshStats} key={updateTrigger} />
            </div>

        </div>
    );
}
