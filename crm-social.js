/**
 * CRM Social - Social Media Integration
 * Simulates connections to Instagram, Facebook, Twitter, LinkedIn
 */

const CRMSocial = (function() {
    'use strict';

    // Mock social media data
    const socialData = {
        instagram: {
            connected: true,
            username: '@growith_official',
            followers: 24500,
            engagement: '4.2%',
            posts: 342,
            recentMessages: [
                { id:1, user:'@creator1', text:'Love your AI design tools!', time:'5m ago' },
                { id:2, user:'@designer_x', text:'How do I integrate the CRM?', time:'1h ago' },
                { id:3, user:'@marketer_pro', text:'Interested in enterprise plan', time:'3h ago' }
            ]
        },
        facebook: {
            connected: true,
            pageName: 'Growith Agency',
            likes: 18300,
            reach: '12.4K',
            messages: 28
        },
        twitter: {
            connected: false,
            username: '@growith_ai',
            followers: 0,
            tweets: 0
        },
        linkedin: {
            connected: true,
            companyName: 'Growith',
            followers: 8750,
            posts: 156
        }
    };

    // Initialize CRM connections
    function init() {
        renderSocialStats();
        setupSocialListeners();
        simulateRealTimeUpdates();
    }

    // Render social stats in admin panel
    function renderSocialStats() {
        const container = document.getElementById('crmSocialStats');
        if (!container) return;

        container.innerHTML = '';
        
        Object.keys(socialData).forEach(platform => {
            const data = socialData[platform];
            const card = document.createElement('div');
            card.className = 'social-card ' + platform;
            card.innerHTML = `
                <div class="social-header">
                    <span class="social-icon ${platform}">${getPlatformIcon(platform)}</span>
                    <div class="social-info">
                        <strong>${getPlatformName(platform)}</strong>
                        <span class="connection-status ${data.connected ? 'connected' : 'disconnected'}">
                            ${data.connected ? 'Connected' : 'Not Connected'}
                        </span>
                    </div>
                    <button class="btn-sm ${data.connected ? 'btn-outline' : 'btn-primary'}" 
                            onclick="CRMSocial.${data.connected ? 'disconnect' : 'connect'}('${platform}')">
                        ${data.connected ? 'Disconnect' : 'Connect'}
                    </button>
                </div>
                ${data.connected ? renderPlatformStats(platform, data) : ''}
            `;
            container.appendChild(card);
        });
    }

    function renderPlatformStats(platform, data) {
        let stats = '';
        switch(platform) {
            case 'instagram':
                stats = `
                    <div class="social-stats">
                        <div class="social-stat"><span>Followers</span><strong>${formatNumber(data.followers)}</strong></div>
                        <div class="social-stat"><span>Engagement</span><strong>${data.engagement}</strong></div>
                        <div class="social-stat"><span>Posts</span><strong>${data.posts}</strong></div>
                    </div>
                    <div class="recent-messages">
                        <h4>Recent Messages</h4>
                        ${data.recentMessages.map(m => `
                            <div class="message-preview">
                                <strong>${m.user}</strong>
                                <p>${m.text}</p>
                                <span>${m.time}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
            case 'facebook':
                stats = `
                    <div class="social-stats">
                        <div class="social-stat"><span>Likes</span><strong>${formatNumber(data.likes)}</strong></div>
                        <div class="social-stat"><span>Reach</span><strong>${data.reach}</strong></div>
                        <div class="social-stat"><span>Messages</span><strong>${data.messages}</strong></div>
                    </div>
                `;
                break;
            case 'twitter':
                stats = `<p class="connect-prompt">Connect your Twitter account to see stats</p>`;
                break;
            case 'linkedin':
                stats = `
                    <div class="social-stats">
                        <div class="social-stat"><span>Followers</span><strong>${formatNumber(data.followers)}</strong></div>
                        <div class="social-stat"><span>Posts</span><strong>${data.posts}</strong></div>
                    </div>
                `;
                break;
        }
        return stats;
    }

    function getPlatformIcon(platform) {
        const icons = {
            instagram: '📸',
            facebook: '👥',
            twitter: '🐦',
            linkedin: '💼'
        };
        return icons[platform] || '●';
    }

    function getPlatformName(platform) {
        const names = {
            instagram: 'Instagram',
            facebook: 'Facebook',
            twitter: 'Twitter',
            linkedin: 'LinkedIn'
        };
        return names[platform] || platform;
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Connect to social platform (simulated)
    function connect(platform) {
        alert(`Connecting to ${getPlatformName(platform)}...\n\nIn production, this would use OAuth flow.`);
        
        socialData[platform].connected = true;
        if (platform === 'twitter') {
            socialData[platform].followers = 5200;
            socialData[platform].tweets = 234;
        }
        
        renderSocialStats();
        
        // Log activity to Firebase
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            firebase.firestore().collection('activity').add({
                type: 'green',
                message: `Connected ${getPlatformName(platform)} account`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }

    // Disconnect from platform
    function disconnect(platform) {
        if (confirm(`Disconnect from ${getPlatformName(platform)}?`)) {
            socialData[platform].connected = false;
            renderSocialStats();
        }
    }

    // Setup event listeners
    function setupSocialListeners() {
        // Refresh button
        const refreshBtn = document.getElementById('refreshSocial');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                simulateRealTimeUpdates();
                alert('Social data refreshed!');
            });
        }
    }

    // Simulate real-time updates
    function simulateRealTimeUpdates() {
        setInterval(() => {
            if (socialData.instagram.connected) {
                socialData.instagram.followers += Math.floor(Math.random() * 10);
                socialData.instagram.engagement = (3.5 + Math.random() * 2).toFixed(1) + '%';
                updateStatDisplay('instagram');
            }
        }, 10000); // Update every 10 seconds
    }

    function updateStatDisplay(platform) {
        const data = socialData[platform];
        const followerElements = document.querySelectorAll(`.social-card.${platform} .social-stat strong`);
        if (followerElements.length > 0) {
            followerElements[0].textContent = formatNumber(data.followers);
        }
    }

    // Public API
    return {
        init,
        connect,
        disconnect,
        getData: () => socialData
    };
})();

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('crmSocialStats')) {
        CRMSocial.init();
    }
});
