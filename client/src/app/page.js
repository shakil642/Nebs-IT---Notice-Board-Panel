"use client";

import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import NoticeTable from "../components/NoticeTable";
import { fetchNoticeStats } from '@/lib/api';
import { Plus } from "lucide-react";
import Link from 'next/link';

export default function Home() {
    const [stats, setStats] = useState({ active: 0, draft: 0 });
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [filters, setFilters] = useState({
        search: '',
        department: 'Departments or individuals',
        status: 'Status',
        date: ''
    });

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

    const handleResetFilters = () => {
        setFilters({
            search: '',
            department: 'Departments or individuals',
            status: 'Status',
            date: ''
        });
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notice Management</h1>
                    <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-green-600 font-medium">Active Notices: {stats.active}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-orange-500 font-medium">Draft Notice: {stats.draft}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link href="/create">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors">
                            <Plus className="w-4 h-4" />
                            Create Notice
                        </button>
                    </Link>

                    <button className="text-orange-500 border border-orange-200 bg-white hover:bg-orange-50 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        All Draft Notice
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
            />

            {/* Notice Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <NoticeTable filters={filters} onUpdate={refreshStats} />
            </div>

        </div>
    );
}
