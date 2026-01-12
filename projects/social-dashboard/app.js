let followersChart = null;
let statsData = {
    facebook: { followers: 12500, change: 8.2 },
    twitter: { followers: 8900, change: 5.4 },
    instagram: { followers: 24300, change: 12.1 },
    youtube: { followers: 5200, change: -2.3 }
};

const postsData = [
    { platform: 'instagram', title: 'New Product Launch Announcement', date: '2 hours ago', likes: '2.4K', comments: '186 comments' },
    { platform: 'twitter', title: 'Weekly Tech Tips Thread', date: '5 hours ago', likes: '892', comments: '45 retweets' },
    { platform: 'facebook', title: 'Behind the Scenes Video', date: '1 day ago', likes: '1.2K', comments: '78 shares' },
    { platform: 'youtube', title: 'Tutorial: Web Development Basics', date: '3 days ago', likes: '3.8K views', comments: '256 likes' }
];

function init() {
    updateDate();
    setupNavigation();
    setupSearch();
    setupStatCards();
    setupQuickActions();
    setupModal();
    setupNotifications();
    renderPosts();
    createFollowersChart();
    createEngagementChart();
    setupPeriodChange();
    animateStats();
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.dataset.section;
            navigateToSection(section);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showNotification(`Searching for: ${query}`);
                this.value = '';
            }
        }
    });
}

function setupStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function () {
            const platform = this.classList[1];
            const data = statsData[platform];
            if (data) {
                showNotification(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${formatNumber(data.followers)} followers (${data.change > 0 ? '+' : ''}${data.change}%)`);
            }
        });
    });
}

function navigateToSection(sectionName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.dataset.section === sectionName) {
            nav.classList.add('active');
        }
    });

    const titles = {
        dashboard: 'Dashboard Overview',
        audience: 'Audience Insights',
        analytics: 'Analytics Overview',
        content: 'Content Management',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';

    const sections = ['dashboard', 'audience', 'analytics', 'content', 'settings'];
    sections.forEach(s => {
        const el = document.getElementById(s + 'Section');
        if (el) {
            if (s === sectionName) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });

    showNotification(`Switched to ${titles[sectionName]}`);
}

function setupQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function () {
            const action = this.dataset.action;
            switch (action) {
                case 'schedule':
                    document.getElementById('postModal').classList.add('active');
                    break;
                case 'analytics':
                    navigateToSection('analytics');
                    break;
                case 'audience':
                    navigateToSection('audience');
                    break;
                case 'export':
                    showNotification('Generating PDF report...');
                    setTimeout(() => {
                        const blob = new Blob(['Social Media Dashboard Report\n\nGenerated: ' + new Date().toLocaleString()], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'social_report.txt';
                        a.click();
                        showNotification('Report downloaded!');
                    }, 1000);
                    break;
            }
        });
    });
}

function setupModal() {
    const modal = document.getElementById('postModal');
    const newPostBtn = document.getElementById('newPostBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelPost = document.getElementById('cancelPost');
    const submitPost = document.getElementById('submitPost');
    const postContent = document.getElementById('postContent');
    const charCount = document.getElementById('charCount');
    const scheduleRadios = document.querySelectorAll('input[name="schedule"]');
    const scheduleTime = document.getElementById('scheduleTime');

    newPostBtn.addEventListener('click', () => modal.classList.add('active'));
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
    cancelPost.addEventListener('click', () => modal.classList.remove('active'));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    postContent.addEventListener('input', function () {
        charCount.textContent = this.value.length;
        if (this.value.length > 280) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '';
        }
    });

    scheduleRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'later') {
                scheduleTime.classList.remove('hidden');
            } else {
                scheduleTime.classList.add('hidden');
            }
        });
    });

    submitPost.addEventListener('click', function () {
        const platforms = document.querySelectorAll('input[name="platform"]:checked');
        const content = postContent.value.trim();

        if (platforms.length === 0) {
            showNotification('Please select at least one platform');
            return;
        }

        if (!content) {
            showNotification('Please enter post content');
            return;
        }

        const schedule = document.querySelector('input[name="schedule"]:checked').value;

        if (schedule === 'now') {
            showNotification('Post published successfully!');
        } else {
            const time = scheduleTime.value;
            if (time) {
                addScheduledPost(content, platforms);
                showNotification('Post scheduled successfully!');
            } else {
                showNotification('Please select a date and time');
                return;
            }
        }

        modal.classList.remove('active');
        postContent.value = '';
        charCount.textContent = '0';
        platforms.forEach(p => p.checked = false);
    });
}

function addScheduledPost(content, platforms) {
    const scheduledList = document.getElementById('scheduledList');
    const platform = platforms[0].value;
    const title = content.substring(0, 30) + (content.length > 30 ? '...' : '');

    const item = document.createElement('div');
    item.className = 'scheduled-item';
    item.innerHTML = `
        <div class="scheduled-platform ${platform}"></div>
        <div class="scheduled-info">
            <p>${title}</p>
            <span>Scheduled</span>
        </div>
    `;
    scheduledList.appendChild(item);
}

function setupNotifications() {
    const notifBtn = document.getElementById('notifBtn');
    notifBtn.addEventListener('click', function () {
        showNotification('You have 3 new notifications');
        const badge = this.querySelector('.notif-badge');
        if (badge) badge.style.display = 'none';
    });
}

function renderPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = postsData.map(post => `
        <div class="post-item" data-title="${post.title}">
            <div class="post-platform ${post.platform}"></div>
            <div class="post-info">
                <p class="post-title">${post.title}</p>
                <span class="post-date">${post.date}</span>
            </div>
            <div class="post-stats">
                <span>${post.likes} likes</span>
                <span>${post.comments}</span>
            </div>
        </div>
    `).join('');

    postsList.querySelectorAll('.post-item').forEach(item => {
        item.addEventListener('click', function () {
            showNotification(`Viewing: ${this.dataset.title}`);
        });
    });
}

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(el => {
        const finalText = el.textContent;
        const finalNum = parseFloat(finalText.replace('K', '')) * 1000;
        let current = 0;
        const duration = 1500;
        const step = finalNum / (duration / 16);

        const animate = () => {
            current += step;
            if (current < finalNum) {
                el.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(animate);
            } else {
                el.textContent = finalText;
            }
        };
        animate();
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function setupPeriodChange() {
    document.getElementById('chartPeriod').addEventListener('change', function () {
        const period = this.value;
        updateChartData(period);
        showNotification(`Chart updated to: ${this.options[this.selectedIndex].text}`);
    });
}

function updateChartData(period) {
    if (!followersChart) return;

    const datasets = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [
                [1200, 1350, 1280, 1420, 1380, 1520, 1680],
                [2100, 2250, 2180, 2420, 2580, 2720, 2890],
                [800, 920, 880, 1050, 1120, 1080, 1250]
            ]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [
                [8500, 9200, 10100, 12500],
                [18500, 20100, 22400, 24300],
                [6800, 7500, 8200, 8900]
            ]
        },
        year: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [
                [5000, 6500, 8000, 9500, 11000, 12500],
                [10000, 13000, 16000, 19000, 22000, 24300],
                [3000, 4500, 5500, 6800, 8000, 8900]
            ]
        }
    };

    const selected = datasets[period];
    followersChart.data.labels = selected.labels;
    followersChart.data.datasets[0].data = selected.data[0];
    followersChart.data.datasets[1].data = selected.data[1];
    followersChart.data.datasets[2].data = selected.data[2];
    followersChart.update();
}

function createFollowersChart() {
    const ctx = document.getElementById('followersChart').getContext('2d');

    followersChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Facebook',
                    data: [1200, 1350, 1280, 1420, 1380, 1520, 1680],
                    borderColor: '#1877f2',
                    backgroundColor: 'rgba(24, 119, 242, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Instagram',
                    data: [2100, 2250, 2180, 2420, 2580, 2720, 2890],
                    borderColor: '#e4405f',
                    backgroundColor: 'rgba(228, 64, 95, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Twitter',
                    data: [800, 920, 880, 1050, 1120, 1080, 1250],
                    borderColor: '#1da1f2',
                    backgroundColor: 'rgba(29, 161, 242, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#a0aec0' }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#a0aec0' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function createEngagementChart() {
    const ctx = document.getElementById('engagementChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Likes', 'Comments', 'Shares', 'Saves'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#667eea', '#e4405f', '#1da1f2', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#a0aec0', padding: 20 }
                }
            },
            cutout: '70%'
        }
    });
}

function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

document.addEventListener('DOMContentLoaded', init);
