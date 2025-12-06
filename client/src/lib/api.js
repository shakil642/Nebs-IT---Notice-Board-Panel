const API_URL = 'http://localhost:5000/api/notices';

export async function fetchNotices(page = 1) {
    const res = await fetch(`${API_URL}?page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch notices');
    return res.json();
}

export async function fetchNoticeStats() {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch notice stats');
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
    if (!res.ok) {
        const errorText = await res.text();
        console.error('Update status failed:', res.status, errorText);
        throw new Error(`Failed to update status: ${res.status} ${errorText}`);
    }
    return res.json();
}
