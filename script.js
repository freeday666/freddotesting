const API_BASE = '/api';

async function fetchBlacklist() {
    try {
        const res = await fetch(`${API_BASE}/blacklist`);
        const users = await res.json();
        const list = document.getElementById('blacklist');
        list.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.tag || user.id} <button onclick="removeUser('${user.id}')">Remove</button>`;
            list.appendChild(li);
        });
    } catch (err) {
        console.error('Error fetching blacklist:', err);
    }
}

document.getElementById('blacklistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const guildId = document.getElementById('guildId').value;
    const userId = document.getElementById('userId').value;
    await fetch(`${API_BASE}/blacklist`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({guildId, userId})
    });
    fetchBlacklist();
});

document.getElementById('unblacklistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const guildId = document.getElementById('guildId2').value;
    const userId = document.getElementById('userId2').value;
    await fetch(`${API_BASE}/unblacklist`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({guildId, userId})
    });
    fetchBlacklist();
});

document.getElementById('refresh').addEventListener('click', fetchBlacklist);

function removeUser(userId) {
    // Prompt for guildId or use default
    const guildId = prompt('Guild ID:');
    if (guildId) {
        fetch(`${API_BASE}/unblacklist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({guildId, userId})
        }).then(fetchBlacklist);
    }
}

// Initial load
fetchBlacklist();
