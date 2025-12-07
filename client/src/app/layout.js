import { Inter } from 'next/font/google'
import './globals.css'
import MainLayout from '../components/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Notice Dashboard',
    description: 'Manage and view notices',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning={true}>
                <MainLayout>
                    {children}
                </MainLayout>
            </body>
        </html>
    )
}
