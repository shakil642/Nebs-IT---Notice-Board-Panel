"use client";

import { useEffect, useState, useRef } from 'react';
import { fetchNotices, updateNoticeStatus } from '@/lib/api';
import { Eye, Edit, MoreVertical, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function NoticeTable({ filters, onUpdate }) {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 6;

    // State to track which row's status popover is open
    const [openPopoverId, setOpenPopoverId] = useState(null);
    const popoverRef = useRef(null);

    // Refetch when filters change (ignoring page for fetch, handling page locally)
    useEffect(() => {
        loadNotices();
    }, [filters]);

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

    // Load notices (FETCH ALL for client-side pagination)
    const loadNotices = async () => {
        setLoading(true);
        console.log("Loading notices for client-side processing:", filters);
        try {
            // First fetch to get metadata and first batch
            const firstPageData = await fetchNotices(1, filters);
            let allNotices = firstPageData.notices || [];

            // If server indicates more pages (because it ignored our limit=1000 param), fetch them
            const totalServerPages = firstPageData.pages || 1;
            if (totalServerPages > 1) {
                const promises = [];
                for (let i = 2; i <= totalServerPages; i++) {
                    promises.push(fetchNotices(i, filters));
                }
                const remainingPagesData = await Promise.all(promises);
                remainingPagesData.forEach(data => {
                    if (data.notices) {
                        allNotices = [...allNotices, ...data.notices];
                    }
                });
            }

            setNotices(allNotices);
            // Total pages will be calculated locally from filteredNotices
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Client-side filtering logic
    const filteredNotices = notices.filter(notice => {
        // Department Filter
        if (filters.department && filters.department !== 'Departments or individuals' && filters.department !== 'All Department') {
            const depts = Array.isArray(notice.department) ? notice.department : [notice.department];
            if (!depts.includes(filters.department)) return false;
        }
        if (filters.department === 'All Department') {
            const depts = Array.isArray(notice.department) ? notice.department : [notice.department];
            if (!depts.includes('All Department')) return false;
        }

        // Status Filter
        if (filters.status && filters.status !== 'Status' && filters.status.toLowerCase() !== notice.status) {
            return false;
        }

        // Search Filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesTitle = notice.title?.toLowerCase().includes(searchLower);
            const matchesEmpName = notice.employeeName?.toLowerCase().includes(searchLower);
            const matchesEmpId = Array.isArray(notice.employeeId)
                ? notice.employeeId.some(id => id.toLowerCase().includes(searchLower))
                : notice.employeeId?.toLowerCase().includes(searchLower);

            if (!matchesTitle && !matchesEmpName && !matchesEmpId) return false;
        }

        // Date Filter
        if (filters.date) {
            const noticeDate = new Date(notice.publishDate).toDateString();
            const filterDate = new Date(filters.date).toDateString();
            if (noticeDate !== filterDate) return false;
        }

        return true;
    });

    // Calculate total pages based on FILTERED results
    useEffect(() => {
        const calculatedPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE) || 1;
        setTotalPages(calculatedPages);

        // If current page is beyond total pages (e.g. filtered down), reset to 1
        if (page > calculatedPages) {
            setPage(1);
        }
    }, [filteredNotices.length]); // Removed 'page' dependency to avoid loop

    // Get current page data
    const paginatedNotices = filteredNotices.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleToggleStatus = async (id, targetStatus) => {
        let newStatus = targetStatus;

        // Optimization: if already that status, ignore
        const currentNotice = notices.find(n => n._id === id);
        if (currentNotice && currentNotice.status === newStatus) return;

        try {
            // Optimistic update
            setNotices(prev => prev.map(n => n._id === id ? { ...n, status: newStatus } : n));
            await updateNoticeStatus(id, newStatus);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to update status', error);
            loadNotices(); // Revert
        }
    };

    const handlePageChange = (newPage) => {
        console.log('Changing to page:', newPage);
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxPage = Math.max(totalPages, 1);
        for (let i = 1; i <= maxPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading && notices.length === 0) return <div className="p-12 text-center text-gray-400">Loading records...</div>;

    return (
        <div className="w-full min-h-[300px] overflow-x-auto max-w-[calc(100vw-2rem)] md:max-w-full pb-4 scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[900px]">
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
                    {paginatedNotices.map((notice) => (
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
                                        notice.status === 'unpublished' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' :
                                            'bg-orange-100 text-orange-600 hover:bg-orange-200'
                                        }`}
                                >
                                    {notice.status === 'published' ? 'Published' :
                                        notice.status === 'unpublished' ? 'Unpublished' : 'Draft'}
                                </button>

                                {/* Toggle Popover */}
                                {openPopoverId === notice._id && (
                                    <div
                                        ref={popoverRef}
                                        className="absolute left-0 top-full mt-2 z-50 bg-white shadow-xl rounded-lg border border-gray-100 p-3 min-w-[200px] animate-fade-in"
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
                                                onClick={() => handleToggleStatus(notice._id, notice.status === 'published' ? 'unpublished' : 'published')}
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
                    {filteredNotices.length === 0 && !loading && (
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
                    type="button"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`p-2 rounded-lg transition-colors ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map(pageNum => (
                    <button
                        type="button"
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
                    type="button"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`p-2 rounded-lg transition-colors ${page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
