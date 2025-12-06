"use client";

import { useState, useEffect } from 'react';
import { fetchNotices, updateNoticeStatus } from '@/lib/api';
import { Eye, Edit, MoreVertical, ToggleRight, ToggleLeft } from 'lucide-react';

export default function NoticeTable({ onUpdate }) {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const loadNotices = async (p) => {
        setLoading(true);
        try {
            const data = await fetchNotices(p);
            setNotices(data.notices);
            setTotalPages(data.pages);
            setPage(data.page);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotices(page);
    }, [page]);

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        // Optimistic update
        setNotices(notices.map(n => n._id === id ? { ...n, status: newStatus } : n));
        try {
            await updateNoticeStatus(id, newStatus);
            if (onUpdate) onUpdate(); // Trigger parent refresh
        } catch (error) {
            setNotices(notices.map(n => n._id === id ? { ...n, status: currentStatus } : n));
        }
    };

    if (loading) return <div className="text-center py-10 text-gray-500">Loading notices...</div>;

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-4 px-6 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Title</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Notice Type</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Departments/Individual</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Published On</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Status</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {notices.map((notice) => (
                            <tr key={notice._id} className="hover:bg-gray-50 group transition-colors">
                                <td className="py-4 px-6"><input type="checkbox" className="rounded border-gray-300" /></td>
                                <td className="py-4 px-4 font-medium text-gray-900 max-w-xs truncate" title={notice.title}>
                                    {notice.title}
                                </td>
                                <td className="py-4 px-4 text-gray-600">
                                    {notice.type}
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium 
                                        ${notice.department === 'Finance' ? 'text-green-600 bg-green-50' :
                                            notice.department === 'HR' ? 'text-red-500 bg-red-50' :
                                                notice.department === 'Sales Team' ? 'text-orange-500 bg-orange-50' :
                                                    'text-blue-600 bg-blue-50'}`}>
                                        {notice.department || 'All Department'}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-gray-500 font-mono text-xs">
                                    {new Date(notice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${notice.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {notice.status === 'published' ? 'Published' : 'Draft'}
                                        </span>
                                        {/* Toggle Switch Simulation */}
                                        <button onClick={() => handleToggleStatus(notice._id, notice.status)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            {notice.status === 'published' ? <ToggleRight className="w-8 h-8 text-green-500" /> : <ToggleLeft className="w-8 h-8 text-gray-300" />}
                                        </button>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <button className="hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                                        <button className="hover:text-amber-600"><Edit className="w-4 h-4" /></button>
                                        <button className="hover:text-gray-800"><MoreVertical className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center p-4 border-t border-gray-200 gap-2">
                <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50 text-gray-500">
                    &larr;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${page === i + 1 ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50 text-gray-500">
                    &rarr;
                </button>
            </div>
        </div>
    );
}
