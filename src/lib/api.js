const API_BASE_URL = 'http://localhost:5000/api';

export const fetchNotices = async (page = 1) => {
    const res = await fetch(`${API_BASE_URL}/notices?page=${page}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch notices');
    return res.json();
};

export const createNotice = async (data) => {
    const res = await fetch(`${API_BASE_URL}/notices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create notice');
    return res.json();
};

export const updateNoticeStatus = async (id, status) => {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
};
