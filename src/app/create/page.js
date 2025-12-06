import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import NoticeForm from '@/components/NoticeForm';

export default function CreatePage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-8">
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-2"
                >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">Create a Notice</span>
                </Link>
            </div>

            <NoticeForm />
        </main>
    );
}
