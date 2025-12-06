"use client";

import NoticeForm from "../../components/NoticeForm";
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for App Router

export default function CreateNoticePage() {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Create a Notice</h1>
            </div>

            {/* Form Container */}
            <NoticeForm />
        </div>
    );
}
