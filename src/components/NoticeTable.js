"use client";

import { useState, useEffect } from 'react';
import { fetchNotices, updateNoticeStatus } from '@/lib/api';

export default function NoticeTable() {
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
        } catch (error) {
            // Revert if failed
            setNotices(notices.map(n => n._id === id ? { ...n, status: currentStatus } : n));
        }
    };

    if (loading) return <div className="text-center py-10">Loading notices...</div>;

    return (
        <div className="card">
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice._id}>
                                <td>
                                    <div className="font-semibold">{notice.title}</div>
                                    <div className="text-xs text-muted truncate max-w-[200px] opacity-70">{notice.description}</div>
                                </td>
                                <td>
                                    <span className="badge" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                                        {notice.type}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${notice.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                                        {notice.status}
                                    </span>
                                </td>
                                <td className="text-sm opacity-80">
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleToggleStatus(notice._id, notice.status)}
                                        className="text-sm underline opacity-80 hover:opacity-100"
                                    >
                                        {notice.status === 'published' ? 'Unpublish' : 'Publish'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {notices.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-muted">No notices found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
                <button
                    className="btn py-1 px-3 text-sm"
                    style={{ backgroundColor: 'var(--surface)' }}
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <span className="text-sm opacity-70">Page {page} of {totalPages}</span>
                <button
                    className="btn py-1 px-3 text-sm"
                    style={{ backgroundColor: 'var(--surface)' }}
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
