import NoticeForm from '@/components/NoticeForm';

export default function CreatePage() {
    return (
        <main className="container">
            <div className="mb-8">
                <h1 className="title">Create New Notice</h1>
                <p className="text-muted">Fill in the details below to publish a new notice.</p>
            </div>

            <NoticeForm />
        </main>
    );
}
