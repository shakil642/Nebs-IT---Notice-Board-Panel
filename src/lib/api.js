const API_URL = 'http://localhost:5000/api/notices';

export async function fetchNotices(page = 1) {
    const res = await fetch(`${API_URL}?page=${page}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch notices');
    return res.json();
}

export async function createNotice(data) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create notice');
    return res.json();
}

export async function updateNoticeStatus(id, status) {
    const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
}

export async function fetchNoticeStats() {
    const res = await fetch(`${API_URL}/stats`, { cache: 'no-store' });
    if (!res.ok) return { active: 0, draft: 0 }; // Return default on fail
    return res.json();
}
