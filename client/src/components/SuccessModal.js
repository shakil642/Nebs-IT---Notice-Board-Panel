"use client";
import { Check } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose, onViewNotice, onCreateAnother, noticeTitle }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all scale-100 border border-gray-100">

                {/* Success Icon */}
                <div className="w-24 h-24 bg-[#00C27C] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                    <Check className="w-12 h-12 text-white stroke-[4]" />
                </div>

                <h2 className="text-[28px] font-bold text-gray-900 mb-3 tracking-tight">Notice Published Successfully</h2>

                <p className="text-gray-500 mb-10 text-base leading-relaxed max-w-sm mx-auto">
                    Your notice <span className="font-bold text-gray-900">“{noticeTitle}”</span> has been published and is now visible to all selected departments.
                </p>

                {/* Buttons Row */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={onViewNotice}
                        className="min-w-[120px] px-6 py-3 rounded-full border-2 border-[#4B8EF5] text-[#4B8EF5] font-bold text-sm hover:bg-blue-50 transition-colors"
                    >
                        View Notice
                    </button>

                    <button
                        onClick={onCreateAnother}
                        className="min-w-[140px] px-6 py-3 rounded-full border-2 border-[#FE7E43] text-[#FE7E43] font-bold text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <span>+</span> Create Another
                    </button>

                    <button
                        onClick={onClose}
                        className="min-w-[100px] px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
