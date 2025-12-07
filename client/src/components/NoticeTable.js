"use client";

import { useEffect, useState, useRef } from 'react';
import { fetchNotices, updateNoticeStatus } from '@/lib/api';
import { Eye, Edit, MoreVertical, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function NoticeTable({ onUpdate }) {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // State to track which row's status popover is open
    const [openPopoverId, setOpenPopoverId] = useState(null);
    const popoverRef = useRef(null);

    useEffect(() => {
        loadNotices(page);
    }, [page]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setOpenPopoverId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const loadNotices = async (currentPage) => {
        setLoading(true);
        try {
            const data = await fetchNotices(currentPage);
            setNotices(data.notices || []);
            setTotalPages(data.pages || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        try {
            // Optimistic update
            setNotices(prev => prev.map(n => n._id === id ? { ...n, status: newStatus } : n));
            await updateNoticeStatus(id, newStatus);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to update status', error);
            loadNotices(page); // Revert
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        // Always show at least page 1
        const maxPage = Math.max(totalPages, 1);
        for (let i = 1; i <= maxPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading && notices.length === 0) return <div className="p-12 text-center text-gray-400">Loading records...</div>;

    return (
        <div className="w-full min-h-[300px]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white border-b border-gray-200">
                        <th className="px-6 py-3 w-12">
                            <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-800">Title</th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-800">Notice Type</th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-800">Departments/Individual</th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-800">Published On</th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-800">Status</th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-800 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {notices.map((notice) => (
                        <tr key={notice._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-2">
                                <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                            </td>
                            <td className="px-6 py-2">
                                <p className="text-sm font-medium text-gray-700 truncate max-w-[250px]">{notice.title}</p>
                            </td>
                            <td className="px-6 py-2 text-sm text-gray-500">
                                {notice.type}
                            </td>
                            <td className="px-6 py-2">
                                <div className="flex flex-wrap gap-1">
                                    {(Array.isArray(notice.department) ? notice.department : [notice.department]).map((dept, index, arr) => (
                                        <span key={index} className={`text-sm font-medium ${dept === 'All Department' ? 'text-blue-600' :
                                                dept === 'Finance' ? 'text-green-600' :
                                                    dept === 'Sales Team' ? 'text-orange-500' :
                                                        dept === 'Web Team' ? 'text-blue-500' :
                                                            dept === 'Database Team' ? 'text-gray-700' :
                                                                dept === 'Admin' ? 'text-purple-600' :
                                                                    dept === 'Individual' ? 'text-blue-400' :
                                                                        'text-red-500'
                                            }`}>
                                            {dept}{index < arr.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-2 text-sm text-gray-500">
                                {notice.publishDate ? new Date(notice.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                            </td>
                            <td className="px-6 py-2 relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenPopoverId(openPopoverId === notice._id ? null : notice._id);
                                    }}
                                    className={`px-4 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${notice.status === 'published' ? 'bg-green-100 text-green-600 hover:bg-green-200' :
                                        'bg-orange-100 text-orange-600 hover:bg-orange-200'
                                        }`}
                                >
                                    {notice.status === 'published' ? 'Published' : 'Draft'}
                                </button>

                                {/* Toggle Popover */}
                                {openPopoverId === notice._id && (
                                    <div
                                        ref={popoverRef}
                                        className="absolute left-0 top-full mt-2 z-50 bg-white shadow-xl rounded-lg border border-gray-100 p-3 min-w-[180px] animate-fade-in"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-50">
                                            <span className="text-xs font-bold text-gray-500 uppercase">Change Status</span>
                                            <button onClick={() => setOpenPopoverId(null)} className="text-gray-400 hover:text-red-500">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className={`text-sm font-medium ${notice.status === 'published' ? 'text-green-600' : 'text-gray-600'}`}>
                                                {notice.status === 'published' ? 'Published' : 'Unpublished'}
                                            </span>

                                            <button
                                                onClick={() => handleToggleStatus(notice._id, notice.status)}
                                                className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors duration-300 ${notice.status === 'published' ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
                                                    }`}
                                            >
                                                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-2 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {notices.length === 0 && !loading && (
                        <tr>
                            <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                                No notices found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Dynamic Pagination Footer - Always Visible */}
            <div className="flex justify-center items-center py-4 gap-2 border-t border-gray-100 select-none">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`p-2 rounded-lg transition-colors ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === pageNum
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages && totalPages > 0}
                    className={`p-2 rounded-lg transition-colors ${page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
