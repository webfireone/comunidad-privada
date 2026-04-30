/**
 * Form Handler - Complete Integration
 * Handles all forms with Firebase and conversion tracking
 */

const FormHandler = (function() {
    'use strict';

    // Track form submissions
    const submissions = new Map();

    // Initialize all forms
    function init() {
        initContactForm();
        initNewsletterForm();
        initDemoForm();
        initSurveyForm();
        trackPageVisit();
    }

    // Contact form in hero section
    function initContactForm() {
        const forms = document.querySelectorAll('.cta-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                const email = emailInput?.value.trim();
                
                if (!email || !isValidEmail(email)) {
                    showError(emailInput, 'Please enter a valid email');
                    return;
                }

                const submitBtn = form.querySelector('button[type="submit"]');
                setLoading(submitBtn, true);

                try {
                    const data = {
                        email,
                        source: 'hero_cta',
                        timestamp: new Date(),
                        status: 'new',
                        type: 'contact'
                    };

                    await saveToFirebase('leads', data);
                    
                    // Track conversion
                    trackConversion('lead_generated', { email, source: 'hero' });
                    
                    showSuccess(form, 'Thank you! We will contact you soon.');
                    emailInput.value = '';
                    
                } catch (error) {
                    showError(form, 'Something went wrong. Please try again.');
                    console.error('Contact form error:', error);
                } finally {
                    setLoading(submitBtn, false);
                }
            });
        });
    }

    // Newsletter subscription
    function initNewsletterForm() {
        const forms = document.querySelectorAll('.newsletter-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                const email = emailInput?.value.trim();
                
                if (!email || !isValidEmail(email)) {
                    showError(emailInput, 'Invalid email');
                    return;
                }

                try {
                    await saveToFirebase('subscribers', {
                        email,
                        timestamp: new Date(),
                        source: 'footer',
                        status: 'active'
                    });

                    trackConversion('newsletter_signup', { email });
                    showSuccess(form, 'Successfully subscribed!');
                    emailInput.value = '';
                    
                } catch (error) {
                    showError(form, 'Subscription failed.');
                }
            });
        });
    }

    // Demo request form
    function initDemoForm() {
        const demoBtns = document.querySelectorAll('a[href="#contact"], .btn-hero');
        
        demoBtns.forEach(btn => {
            if (btn.textContent.toLowerCase().includes('demo')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const email = prompt('Enter your email to get a free demo:');
                    if (!email || !isValidEmail(email)) return;

                    saveToFirebase('demo_requests', {
                        email,
                        timestamp: new Date(),
                        status: 'pending'
                    }).then(() => {
                        alert('Demo request received! We will contact you at ' + email);
                        trackConversion('demo_requested', { email });
                    });
                });
            }
        });
    }

    // Survey form for feedback
    function initSurveyForm() {
        const surveyForm = document.getElementById('surveyForm');
        if (!surveyForm) return;

        surveyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(surveyForm);
            const data = Object.fromEntries(formData);
            data.timestamp = new Date();
            data.type = 'survey';

            try {
                await saveToFirebase('surveys', data);
                showSuccess(surveyForm, 'Thank you for your feedback!');
            } catch (error) {
                showError(surveyForm, 'Failed to submit survey.');
            }
        });
    }

    // Save data to Firebase
    async function saveToFirebase(collection, data) {
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            const db = firebase.firestore();
            
            // Add server timestamp
            data.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
            
            const docRef = await db.collection(collection).add(data);
            console.log(`Saved to ${collection}:`, docRef.id);
            return docRef;
        } else {
            // Fallback - log to console
            console.log(`[Demo Mode] Save to ${collection}:`, data);
            
            // Store in localStorage for demo
            const stored = JSON.parse(localStorage.getItem(collection) || '[]');
            stored.push(data);
            localStorage.setItem(collection, JSON.stringify(stored));
            
            return { id: 'demo_' + Date.now() };
        }
    }

    // Track conversions with analytics
    function trackConversion(eventName, params) {
        if (typeof firebase !== 'undefined' && firebase.analytics) {
            firebase.analytics().logEvent(eventName, params);
        }
        
        // Also track with custom analytics
        const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
        conversions.push({
            event: eventName,
            params,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('conversions', JSON.stringify(conversions));
        
        console.log(`%c[Conversion] ${eventName}`, 'color: #10b981; font-weight: bold;', params);
    }

    // Track page visit
    function trackPageVisit() {
        const visit = {
            page: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        saveToFirebase('page_visits', visit).catch(() => {
            // Silently fail - offline support
            const visits = JSON.parse(localStorage.getItem('page_visits') || '[]');
            visits.push(visit);
            localStorage.setItem('page_visits', JSON.stringify(visits));
        });
    }

    // Utility functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setLoading(button, isLoading) {
        if (!button) return;
        
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Submitting...';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText || button.textContent;
        }
    }

    function showSuccess(form, message) {
        const existing = form.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message success';
        msg.textContent = message;
        form.appendChild(msg);

        setTimeout(() => msg.remove(), 5000);
    }

    function showError(element, message) {
        const form = element.closest('form');
        if (!form) return;

        const existing = form.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message error';
        msg.textContent = message;
        form.appendChild(msg);

        setTimeout(() => msg.remove(), 5000);
    }

    // Public API
    return {
        init,
        saveToFirebase,
        trackConversion,
        isValidEmail
    };
})();

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    FormHandler.init();
});
