"use client";

import { useEffect, useState } from 'react';

export default function Popup({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible || !message) return null;

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'} animate-fade-in z-50`}>
            <div className="flex items-center gap-2">
                <span>{type === 'success' ? '✅' : '⚠️'}</span>
                <p className="font-semibold">{message}</p>
            </div>
        </div>
    );
}
