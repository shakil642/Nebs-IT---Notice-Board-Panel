import Link from 'next/link';
import NoticeTable from '@/components/NoticeTable';

export default function Home() {
    return (
        <main className="container">
            <div className="flex justify-between items-center mb-8">
                <h1 className="title">Notice Dashboard</h1>
                <Link href="/create" className="btn btn-primary">
                    + Create Notice
                </Link>
            </div>

            <NoticeTable />
        </main>
    );
}
