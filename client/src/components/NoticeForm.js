"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createNotice } from '@/lib/api';
import Popup from './Popup';
import { Calendar, CloudUpload, Paperclip, X } from 'lucide-react';

// Label Helper for red asterisk
const Label = ({ text }) => (
    <label className="block text-sm font-semibold text-gray-700 mb-2">
        <span className="text-red-500 mr-1">*</span>{text}
    </label>
);

export default function NoticeForm() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        department: '',
        employeeId: '',
        employeeName: '',
        position: '',
        publishDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState(null);
    const [attachment, setAttachment] = useState(null);

    const handleSubmit = async (e, status = 'published') => {
        e.preventDefault();
        setLoading(true);

        try {
            const noticeData = {
                ...formData,
                status,
                attachments: attachment ? [attachment.name] : []
            };

            await createNotice(noticeData);
            setPopup({ message: `Notice ${status === 'draft' ? 'Saved as Draft' : 'Published'} Successfully!`, type: 'success' });

            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (error) {
            setPopup({ message: 'Failed to save notice.', type: 'error' });
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/png") {
                setAttachment(file);
            } else {
                setPopup({ message: 'Only JPG and PNG files are allowed.', type: 'error' });
            }
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            {popup && <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} />}

            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                Please fill in the details below
            </h3>

            <form onSubmit={(e) => handleSubmit(e, 'published')} className="space-y-6">

                {/* Department Selection */}
                <div>
                    <Label text="Target Department(s) or Individual" />
                    <div className="relative">
                        <select
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Department</option>
                            <option value="Individual">Individual</option>
                            <option value="All Department">All Department</option>
                            <option value="Finance">Finance</option>
                            <option value="HR">HR</option>
                            <option value="Sales Team">Sales Team</option>
                            <option value="IT">IT</option>
                            <option value="Admin">Admin</option>
                            <option value="Web Team">Web Team</option>
                            <option value="Database Team">Database Team</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <Label text="Notice Title" />
                    <input
                        type="text"
                        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Write the Title of Notice"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                {/* Conditional Employee Fields */}
                {formData.department === 'Individual' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                        <div>
                            <Label text="Select Employee ID" />
                            <div className="relative">
                                <select
                                    className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-600 appearance-none focus:outline-none focus:border-blue-500"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                >
                                    <option value="" disabled>Select employee</option>
                                    <option value="EMP-001">EMP-001 (Shakil)</option>
                                    <option value="EMP-002">EMP-002 (Asif)</option>
                                    <option value="EMP-003">EMP-003 (Nabil)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label text="Employee Name" />
                            <input
                                type="text"
                                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                placeholder="Enter employee full name"
                                value={formData.employeeName}
                                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label text="Position" />
                            <input
                                type="text"
                                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                placeholder="Select employee department"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notice Type */}
                    <div>
                        <Label text="Notice Type" />
                        <div className="relative">
                            <select
                                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-600 appearance-none focus:outline-none focus:border-blue-500"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select Notice Type</option>
                                <option value="Warning / Disciplinary">Warning / Disciplinary</option>
                                <option value="Performance Improvement">Performance Improvement</option>
                                <option value="Appreciation / Recognition">Appreciation / Recognition</option>
                                <option value="Attendance / Leave Issue">Attendance / Leave Issue</option>
                                <option value="Payroll / Compensation">Payroll / Compensation</option>
                                <option value="Contract / Role Update">Contract / Role Update</option>
                                <option value="Advisory / Personal Reminder">Advisory / Personal Reminder</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Publish Date */}
                    <div>
                        <Label text="Publish Date" />
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                value={formData.publishDate}
                                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <Calendar className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Notice Body</label>
                    <textarea
                        className="w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 min-h-[120px] resize-y"
                        placeholder="Write the details about notice"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                {/* File Upload (Dynamic) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Attachments (optional)</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                    />

                    {!attachment ? (
                        <div
                            className="bg-green-50 border-2 border-dashed border-green-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <CloudUpload className="w-10 h-10 text-green-500 mb-3" />
                            <p className="text-sm font-medium text-gray-700">
                                <span className="text-green-600 font-bold">Upload</span> nominee profile image or drag and drop.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Accepted File Type: jpg, png</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 w-max">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <Paperclip className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">{attachment.name}</span>
                                <span className="text-xs text-gray-400">{(attachment.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <button type="button" onClick={() => setAttachment(null)} className="text-gray-400 hover:text-red-500 ml-2">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-8 mt-8 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full md:w-auto px-8 py-3 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'draft')}
                            className="flex-1 md:flex-none px-8 py-3 rounded-full border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 md:flex-none px-8 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 shadow-md transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Publish Notice
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
