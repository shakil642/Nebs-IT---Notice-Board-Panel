"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNotice } from '@/lib/api';
import Popup from './Popup';

export default function NoticeForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'General',
    });
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createNotice(formData);
            setPopup({ message: 'Notice Published Successfully!', type: 'success' });
            // Clear form
            setFormData({ title: '', description: '', type: 'General' });
            // Redirect after short delay or stay? Requirement says "Display popup". User might want to create multiple.
            // I'll keep them here but maybe offer a link back.
        } catch (error) {
            setPopup({ message: 'Failed to publish notice.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card max-w-2xl mx-auto">
            {popup && <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} />}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Category</label>
                    <select
                        className="select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        required
                    >
                        <option value="General">General</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Holiday">Holiday</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="input-group">
                    <label className="label">Notice Title</label>
                    <input
                        type="text"
                        className="input"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter notice title"
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="label">Description</label>
                    <textarea
                        className="textarea"
                        rows="5"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter full details..."
                        required
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text)' }}
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish Notice'}
                    </button>
                </div>
            </form>
        </div>
    );
}
