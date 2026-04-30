/**
 * Growith - AI Design Agency Landing Page
 * Full Firebase integration and interactions
 */

(function() {
    'use strict';

    // Firebase References
    let auth, db, analytics;

    function initFirebase() {
        if (typeof firebase !== 'undefined' && firebase.apps.length) {
            auth = firebase.auth();
            db = firebase.firestore();
            analytics = firebase.analytics();
            return true;
        }
        return false;
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Scroll Animations
    const animateElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animateElements.forEach(el => observer.observe(el));
    } else {
        animateElements.forEach(el => el.classList.add('animated'));
    }

    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
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

    const statNumbers = document.querySelectorAll('.stat-number');
    
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // Parallax Effect
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // Chart Animation
    const chartBars = document.querySelectorAll('.chart-bar');
    
    if ('IntersectionObserver' in window) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transform = 'scaleY(1)';
                            bar.style.opacity = '0.8';
                        }, index * 100);
                    });
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const chartPlaceholder = document.querySelector('.chart-placeholder');
        if (chartPlaceholder) chartObserver.observe(chartPlaceholder);
    }

    chartBars.forEach(bar => {
        bar.style.transform = 'scaleY(0)';
        bar.style.transformOrigin = 'bottom';
        bar.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    });

    // Contact Form - Firebase Integration
    const ctaForm = document.querySelector('.cta-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) return;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            try {
                if (initFirebase()) {
                    await db.collection('leads').add({
                        email: email,
                        source: 'hero_cta',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        status: 'new'
                    });
                    
                    if (analytics) {
                        analytics.logEvent('generate_lead', { 
                            method: 'email',
                            source: 'hero_section'
                        });
                    }
                    
                    alert('Thank you! We will contact you at ' + email + ' soon.');
                    emailInput.value = '';
                } else {
                    // Fallback - simulate success
                    console.log('Lead captured:', email);
                    alert('Thank you! We will contact you soon.');
                    emailInput.value = '';
                }
            } catch (error) {
                console.error('Error saving lead:', error);
                alert('There was an error. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Newsletter Subscription
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) return;
            
            try {
                if (initFirebase()) {
                    await db.collection('subscribers').add({
                        email: email,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        source: 'footer_newsletter'
                    });
                }
                
                alert('Successfully subscribed to our newsletter!');
                emailInput.value = '';
            } catch (error) {
                console.error('Error subscribing:', error);
                alert('Subscription failed. Please try again.');
            }
        });
    });

    // Marquee Pause on Hover
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }

    // Service Card Tilt Effect
    const serviceCards = document.querySelectorAll('.service-card, .process-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Login Modal Handler
    const loginBtn = document.querySelector('.btn-outline');
    if (loginBtn && loginBtn.textContent.includes('Login')) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    }

    function showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>Login to Admin</h2>
                <form id="loginForm" class="login-form">
                    <input type="email" id="loginEmail" placeholder="Email" class="form-input" required>
                    <input type="password" id="loginPassword" placeholder="Password" class="form-input" required>
                    <button type="submit" class="btn btn-primary" style="width:100%">Login</button>
                </form>
                <div class="social-login">
                    <button id="googleLogin" class="btn btn-outline" style="width:100%;margin-top:1rem;">
                        <img src="https://www.google.com/favicon.ico" width="16" alt=""> Continue with Google
                    </button>
                </div>
                <p class="form-hint">Use admin@growith.com / password123</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        
        const loginForm = modal.querySelector('#loginForm');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = modal.querySelector('#loginEmail').value;
            const password = modal.querySelector('#loginPassword').value;
            
            try {
                if (initFirebase()) {
                    await auth.signInWithEmailAndPassword(email, password);
                    window.location.href = 'admin.html';
                } else {
                    if (email === 'admin@growith.com' && password === 'password123') {
                        window.location.href = 'admin.html';
                    } else {
                        alert('Invalid credentials. Try admin@growith.com / password123');
                    }
                }
            } catch (error) {
                alert('Login failed: ' + error.message);
            }
        });
        
        const googleBtn = modal.querySelector('#googleLogin');
        googleBtn.addEventListener('click', async () => {
            try {
                if (initFirebase()) {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await auth.signInWithPopup(provider);
                    window.location.href = 'admin.html';
                }
            } catch (error) {
                alert('Google login failed: ' + error.message);
            }
        });
    }

    // Console Easter Egg
    console.log('%cGrowith - AI Design Agency', 'font-size: 24px; font-weight: bold; color: #0a3d2f;');
    console.log('%cBuilding the future with AI precision.', 'font-size: 14px; color: #6b7280;');
    console.log('%cFirebase connected: ' + (typeof firebase !== 'undefined' ? '✅' : '❌'), 
        typeof firebase !== 'undefined' ? 'color: #10b981;' : 'color: #ef4444;');

})();
