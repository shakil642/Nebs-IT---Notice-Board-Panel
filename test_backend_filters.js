const BASE_URL = 'http://localhost:5000/api/notices';

// Helper to log results
async function testFilter(filterName, params) {
    try {
        const query = new URLSearchParams(params).toString();
        const url = `${BASE_URL}?${query}`;
        console.log(`\nTesting ${filterName}: ${url}`);

        const res = await fetch(url);
        const data = await res.json();

        if (data.notices) {
            console.log(`Count: ${data.notices.length}`);
            if (data.notices.length > 0) {
                console.log('Sample Notices:');
                data.notices.forEach(n => {
                    console.log(`- Title: "${n.title}", Depts: [${n.department}]`);
                });
            }
            if (data.debugQuery) {
                console.log('Backend Executed Query:', JSON.stringify(data.debugQuery, null, 2));
            }
        } else {
            console.log('No notices array in response:', data);
        }
    } catch (e) {
        console.error(`Failed to test ${filterName}:`, e.message);
    }
}

async function run() {
    console.log('--- Starting Backend Filter Tests ---');

    // 1. No Filter (Should show all, page 1)
    await testFilter('No Filter', {});

    // 2. Filter by "All Department"
    await testFilter('Department="All Department"', { department: 'All Department' });

    // 3. Filter by "IT" (Assuming IT exists)
    await testFilter('Department="IT"', { department: 'IT' });

    // 4. Filter by "Sales Team"
    await testFilter('Department="Sales Team"', { department: 'Sales Team' });

    // 5. Filter by "Status=Published"
    await testFilter('Status="Published"', { status: 'Published' });
}

run();
