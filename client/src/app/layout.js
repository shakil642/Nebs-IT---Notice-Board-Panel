import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/Sidebar'
import TopHeader from '../components/TopHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Notice Dashboard',
    description: 'Manage and view notices',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <div className="flex h-screen bg-gray-50">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <TopHeader />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}
