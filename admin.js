/**
 * Growith Admin Panel - Full Firebase Integration
 * Real-time data, authentication, CRM, Analytics
 */

(function() {
    'use strict';

    // ==========================================
    // Firebase References
    // ==========================================
    let auth, db, storage;
    let currentUser = null;

    function initFirebase() {
        if (typeof firebase !== 'undefined' && firebase.apps.length) {
            auth = firebase.auth();
            db = firebase.firestore();
            storage = firebase.storage();
            return true;
        }
        return false;
    }

    // ==========================================
    // Authentication State Listener
    // ==========================================
    function checkAuth() {
        if (initFirebase()) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    currentUser = user;
                    console.log('Logged in:', user.email);
                    loadDashboardData();
                } else {
                    currentUser = null;
                    console.log('Not logged in');
                    // Redirect to login or show login UI
                    showLoginScreen();
                }
            });
        } else {
            // Demo mode - simulate login
            console.log('Running in demo mode (Firebase not loaded)');
            setTimeout(() => loadDashboardData(), 500);
        }
    }

    function showLoginScreen() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="login-screen">
                    <div class="login-card">
                        <div class="logo">
                            <span class="logo-icon">◆</span>
                            <span class="logo-text">Growith</span>
                        </div>
                        <h2>Login to Admin Panel</h2>
                        <form id="loginForm" class="login-form">
                            <input type="email" id="loginEmail" placeholder="Email" class="form-input" required>
                            <input type="password" id="loginPassword" placeholder="Password" class="form-input" required>
                            <button type="submit" class="btn-primary" style="width:100%">Login</button>
                        </form>
                        <button id="googleLogin" class="btn-outline" style="width:100%;margin-top:1rem;">
                            <img src="https://www.google.com/favicon.ico" width="16" alt=""> Continue with Google
                        </button>
                        <p class="hint">Demo: admin@growith.com / password123</p>
                    </div>
                </div>
            `;

            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', handleEmailLogin);
            }

            const googleBtn = document.getElementById('googleLogin');
            if (googleBtn) {
                googleBtn.addEventListener('click', handleGoogleLogin);
            }
        }
    }

    async function handleEmailLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            if (initFirebase()) {
                await auth.signInWithEmailAndPassword(email, password);
                location.reload();
            } else {
                // Demo mode
                if (email === 'admin@growith.com' && password === 'password123') {
                    location.reload();
                } else {
                    alert('Invalid credentials. Use admin@growith.com / password123');
                }
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    }

    async function handleGoogleLogin() {
        try {
            if (initFirebase()) {
                const provider = new firebase.auth.GoogleAuthProvider();
                await auth.signInWithPopup(provider);
                location.reload();
            }
        } catch (error) {
            alert('Google login failed: ' + error.message);
        }
    }

    // ==========================================
    // Logout Handler
    // ==========================================
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (initFirebase() && auth) {
                await auth.signOut();
            }
            window.location.href = 'index.html';
        });
    }

    // ==========================================
    // Sidebar Navigation
    // ==========================================
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const adminSections = document.querySelectorAll('.admin-section');
    const pageTitle = document.getElementById('pageTitle');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            adminSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });

            if (pageTitle && this.querySelector('span')) {
                pageTitle.textContent = this.querySelector('span').textContent;
            }

            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('active');
            }

            initSection(targetSection);
        });
    });

    // ==========================================
    // Mobile Menu
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && 
            !sidebar.contains(e.target) && 
            mobileMenuToggle && 
            !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // ==========================================
    // Load Dashboard Data from Firebase
    // ==========================================
    async function loadDashboardData() {
        if (!initFirebase() || !db) {
            // Use mock data
            initCounters();
            initCharts();
            return;
        }

        try {
            // Load stats from Firestore
            const statsDoc = await db.collection('stats').doc('dashboard').get();
            if (statsDoc.exists) {
                const data = statsDoc.data();
                updateStatCard('totalUsers', data.totalUsers || 2847);
                updateStatCard('activeCampaigns', data.activeCampaigns || 156);
                updateStatCard('conversions', data.conversions || 3241);
            }

            // Load recent activity
            const activitySnapshot = await db.collection('activity')
                .orderBy('timestamp', 'desc')
                .limit(10)
                .get();
            
            if (!activitySnapshot.empty) {
                updateActivityList(activitySnapshot.docs);
            }

            // Load campaigns
            loadCampaigns();

            // Load CRM messages
            loadCRMMessages();

        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }

        initCounters();
        initCharts();
    }

    function updateStatCard(id, value) {
        const element = document.querySelector(`[data-stat="${id}"]`);
        if (element) {
            element.textContent = value.toLocaleString();
        }
    }

    // ==========================================
    // Counter Animation
    // ==========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-value[data-count]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';
            animateCounter(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // ==========================================
    // Charts
    // ==========================================
    function initCharts() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            const height = bar.style.getPropertyValue('--height');
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = height;
            }, index * 100);
        });

        const platformFills = document.querySelectorAll('.platform-fill');
        platformFills.forEach((fill, index) => {
            const width = fill.style.getPropertyValue('--width');
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, index * 150 + 300);
        });
    }

    // ==========================================
    // Activity List
    // ==========================================
    function updateActivityList(docs) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        activityList.innerHTML = '';
        docs.forEach(doc => {
            const data = doc.data();
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-dot ${data.type || 'blue'}"></div>
                <div class="activity-content">
                    <p>${data.message || 'New activity'}</p>
                    <span class="activity-time">${formatTime(data.timestamp)}</span>
                </div>
            `;
            activityList.appendChild(item);
        });
    }

    function formatTime(timestamp) {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) return `${diffMins} minutes ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${Math.floor(diffHours / 24)} days ago`;
    }

    // ==========================================
    // Campaigns
    // ==========================================
    async function loadCampaigns() {
        if (!initFirebase() || !db) return;

        try {
            const snapshot = await db.collection('campaigns')
                .orderBy('createdAt', 'desc')
                .get();

            if (!snapshot.empty) {
                updateCampaignsTable(snapshot.docs);
            }
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
    }

    function updateCampaignsTable(docs) {
        const tbody = document.querySelector('#campaigns tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        docs.forEach(doc => {
            const data = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${data.name || 'Unnamed'}</strong></td>
                <td><span class="badge ${data.status || 'draft'}">${data.status || 'Draft'}</span></td>
                <td>${data.users || 0}</td>
                <td>${data.conversion || '0%'}</td>
                <td>$${data.revenue || 0}</td>
                <td><button class="btn-sm" onclick="editCampaign('${doc.id}')">Edit</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    window.editCampaign = function(campaignId) {
        alert(`Edit campaign: ${campaignId}\n\nIn production, this would open an edit modal.`);
    };

    // ==========================================
    // CRM Messages
    // ==========================================
    async function loadCRMMessages() {
        if (!initFirebase() || !db) return;

        try {
            const snapshot = await db.collection('messages')
                .orderBy('timestamp', 'desc')
                .limit(20)
                .get();

            if (!snapshot.empty) {
                updateMessageList(snapshot.docs);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    function updateMessageList(docs) {
        const messageList = document.querySelector('#crm .message-list');
        if (!messageList) return;

        messageList.innerHTML = '';
        docs.forEach(doc => {
            const data = doc.data();
            const initials = (data.name || '??').split(' ').map(n => n[0]).join('').toUpperCase();
            const item = document.createElement('div');
            item.className = 'message-item';
            item.innerHTML = `
                <div class="message-avatar">${initials}</div>
                <div class="message-content">
                    <strong>${data.name || 'Unknown'}</strong>
                    <p>${data.message || 'No message'}</p>
                    <span>${formatTime(data.timestamp)}</span>
                </div>
            `;
            item.addEventListener('click', () => {
                alert(`Open conversation with: ${data.name}\n\nMessage: ${data.message}`);
            });
            messageList.appendChild(item);
        });
    }

    // ==========================================
    // Section Initializer
    // ==========================================
    function initSection(sectionId) {
        switch(sectionId) {
            case 'dashboard':
                loadDashboardData();
                break;
            case 'campaigns':
                loadCampaigns();
                break;
            case 'crm':
                loadCRMMessages();
                break;
            case 'analytics':
                initCharts();
                break;
        }
    }

    // ==========================================
    // Settings Form
    // ==========================================
    const settingsForm = document.querySelector('#settings .btn-primary');
    if (settingsForm) {
        settingsForm.addEventListener('click', async function() {
            const name = document.querySelector('#settings input[type="text"]')?.value;
            
            if (initFirebase() && db && currentUser) {
                try {
                    await db.collection('users').doc(currentUser.uid).set({
                        displayName: name,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                    
                    alert('Settings saved to Firebase!');
                } catch (error) {
                    alert('Error saving settings: ' + error.message);
                }
            } else {
                alert('Settings saved! (Demo mode)');
            }
        });
    }

    // ==========================================
    // New Campaign Button
    // ==========================================
    document.querySelectorAll('button.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Campaign')) {
            btn.addEventListener('click', () => {
                alert('Create New Campaign\n\nIn production, this would open a campaign wizard.');
            });
        }
    });

    // ==========================================
    // Initialize
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        checkAuth();
    });

    window.addEventListener('resize', () => {
        if (sidebar && window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });

    console.log('%cGrowith Admin Panel', 'font-size: 20px; font-weight: bold; color: #0a3d2f;');
    console.log('%cStatus: ' + (initFirebase() ? 'Firebase Connected ✅' : 'Demo Mode 📝'), 
        initFirebase() ? 'color: #10b981;' : 'color: #f59e0b;');

})();
