// ============================================
// script.js
// HTML = Structure | CSS = Style | JS = Behavior
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ─────────────────────────────────────────
    // 1. LOADER
    // ─────────────────────────────────────────

    const loader = document.getElementById('loader');

    if (loader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 1500);
        });
    }

    // ─────────────────────────────────────────
    // 2. CUSTOM CURSOR
    // ─────────────────────────────────────────

    const cursorDot     = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    // Only run cursor logic if not a touch device
    if (cursorDot && cursorOutline && window.matchMedia('(hover: hover)').matches) {

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });

        // Outline follows with smooth lag
        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top  = outlineY + 'px';

            requestAnimationFrame(animateOutline);
        }

        animateOutline();

        // Grow cursor on hover of clickable elements
        const clickableElements = document.querySelectorAll(
            'a, button, .skill-tab, .filter-btn, .project-card, .offer-card'
        );

        clickableElements.forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                cursorOutline.classList.add('hovered');
            });
            element.addEventListener('mouseleave', function () {
                cursorOutline.classList.remove('hovered');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', function () {
            cursorDot.style.opacity     = '0';
            cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', function () {
            cursorDot.style.opacity     = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // ─────────────────────────────────────────
    // 3. NAVBAR SCROLL EFFECT
    // ─────────────────────────────────────────

    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNavLink();
        });
    }

    // ─────────────────────────────────────────
    // 4. HAMBURGER MENU (Mobile)
    // ─────────────────────────────────────────

    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function closeMobileMenu() {
        if (hamburger)  hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger && mobileMenu) {

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');

            document.body.style.overflow =
                mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close when link clicked
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // FIX: Close when clicking outside the menu
        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }

    // ─────────────────────────────────────────
    // 5. TYPING ANIMATION
    // ─────────────────────────────────────────

    const typedTextElement = document.getElementById('typedText');

    if (typedTextElement) {

        const wordsToType = [
            'Stand Out',
            'Convert Visitors',
            'Grow Your Business',
            'Impress Clients',
            'Drive Results'
        ];

        let wordIndex  = 0;
        let charIndex  = 0;
        let isDeleting = false;
        let typeTimer  = null;

        function typeWriter() {
            const currentWord = wordsToType[wordIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 60 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed  = 2000;
                isDeleting = true;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex  = (wordIndex + 1) % wordsToType.length;
                typeSpeed  = 400;
            }

            typeTimer = setTimeout(typeWriter, typeSpeed);
        }

        typeWriter();
    }

    // ─────────────────────────────────────────
    // 6. PARTICLE BACKGROUND
    // ─────────────────────────────────────────

    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {

        // Fewer particles on mobile to save battery
        const isMobile        = window.innerWidth < 768;
        const particleCount   = isMobile ? 10 : 30;
        const particleInterval = isMobile ? 6000 : 3000;

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const randomX        = Math.random() * 100;
            const randomSize     = Math.random() * 3 + 1;
            const randomDuration = Math.random() * 15 + 10;

            particle.style.left              = randomX + '%';
            particle.style.width             = randomSize + 'px';
            particle.style.height            = randomSize + 'px';
            particle.style.animationDuration = randomDuration + 's';
            particle.style.animationDelay    = Math.random() * 5 + 's';

            particlesContainer.appendChild(particle);

            setTimeout(function () {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, (randomDuration + 5) * 1000);
        }

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        setInterval(createParticle, particleInterval);
    }

    // ─────────────────────────────────────────
    // 7. COUNTER ANIMATION
    // ─────────────────────────────────────────

    function animateCounter(element, target) {
        let current     = 0;
        const duration  = 2000; // 2 seconds
        const stepTime  = 30;
        const steps     = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(function () {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            element.textContent = Math.floor(current);
        }, stepTime);
    }

    // ─────────────────────────────────────────
    // 8. INTERSECTION OBSERVER
    // ─────────────────────────────────────────

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                // Animate skill bars
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(function (fill) {
                    const targetWidth = fill.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(function () {
                            fill.style.width = targetWidth + '%';
                        }, 200);
                    }
                });

                // Animate stat counters
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(function (counter) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (target && !counter.dataset.animated) {
                        counter.dataset.animated = 'true';
                        animateCounter(counter, target);
                    }
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold:  0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Watch all animated elements
    document.querySelectorAll(
        '[data-animate], .skill-card, .hero-stats, ' +
        '.service-card, .project-card, .offer-card'
    ).forEach(function (el) {
        observer.observe(el);
    });

    // ─────────────────────────────────────────
    // 9. SKILL TABS
    // ─────────────────────────────────────────

    const skillTabs   = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.skill-panel');

    skillTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {

            skillTabs.forEach(t   => t.classList.remove('active'));
            skillPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');

            const targetPanelId = tab.getAttribute('data-tab');
            const targetPanel   = document.getElementById(targetPanelId);

            if (targetPanel) {
                targetPanel.classList.add('active');

                // Re-animate skill bars in new panel
                targetPanel.querySelectorAll('.skill-fill').forEach(function (fill) {
                    fill.style.width = '0%';
                    setTimeout(function () {
                        fill.style.width = fill.getAttribute('data-width') + '%';
                    }, 150);
                });

                // Re-observe new skill cards for animation
                targetPanel.querySelectorAll('.skill-card').forEach(function (card) {
                    card.classList.add('visible');
                });
            }
        });
    });

    // ─────────────────────────────────────────
    // 10. PROJECT FILTER
    // ─────────────────────────────────────────

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards  = document.querySelectorAll('.project-card');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedFilter = button.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const cardCategory = card.getAttribute('data-category');
                const shouldShow   = selectedFilter === 'all' || cardCategory === selectedFilter;

                if (shouldShow) {
                    card.classList.remove('hide');
                    card.style.opacity   = '0';
                    card.style.transform = 'translateY(20px)';

                    // Trigger reflow before animating
                    card.offsetHeight;

                    setTimeout(function () {
                        card.style.opacity   = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);

                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ─────────────────────────────────────────
    // 11. TESTIMONIAL SLIDER
    // ─────────────────────────────────────────

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots       = document.querySelectorAll('.slider-dots .slider-dot');
    const prevBtn          = document.getElementById('prevBtn');
    const nextBtn          = document.getElementById('nextBtn');

    let currentSlide   = 0;
    let autoSlideTimer = null;

    // Only run slider if testimonial cards exist
    if (testimonialCards.length > 0) {

        function showSlide(index) {
            if (index >= testimonialCards.length) index = 0;
            if (index < 0) index = testimonialCards.length - 1;

            currentSlide = index;

            testimonialCards.forEach(card => card.classList.remove('active'));
            sliderDots.forEach(dot   => dot.classList.remove('active'));

            testimonialCards[currentSlide].classList.add('active');

            if (sliderDots[currentSlide]) {
                sliderDots[currentSlide].classList.add('active');
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                showSlide(currentSlide + 1);
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                showSlide(currentSlide - 1);
                resetAutoSlide();
            });
        }

        sliderDots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                showSlide(index);
                resetAutoSlide();
            });
        });

        function startAutoSlide() {
            autoSlideTimer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideTimer);
            startAutoSlide();
        }

        startAutoSlide();

    } else {
        // No testimonial cards — slider buttons not needed
        // They are hidden in the new honest section
        console.log('Testimonials: showing value proposition section');
    }

    // ─────────────────────────────────────────
    // 12. CONTACT FORM WITH FORMSPREE
    // ─────────────────────────────────────────

    const contactForm     = document.getElementById('contactForm');
    const submitBtn       = document.getElementById('submitBtn');
    const formSuccess     = document.getElementById('formSuccess');
    const charCountEl     = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');

    // Character counter
    if (messageTextarea && charCountEl) {
        messageTextarea.addEventListener('input', function () {
            const currentLength = this.value.length;
            const maxLength     = 500;

            charCountEl.textContent = currentLength + ' / ' + maxLength;

            if (currentLength > maxLength * 0.9) {
                charCountEl.style.color = '#f59e0b';
            } else {
                charCountEl.style.color = '#555555';
            }

            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
            }
        });

        messageTextarea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 300) + 'px';
        });
    }

    // Email validation on blur
    const emailInput = document.getElementById('email');

    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = document.getElementById('emailError');

            if (this.value && !emailRegex.test(this.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.style.borderColor = 'var(--error)';
            } else {
                if (emailError) emailError.textContent = '';
                emailInput.style.borderColor = '';
            }
        });
    }

    // Form submission
    if (contactForm && submitBtn) {

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name     = (formData.get('name')    || '').trim();
            const email    = (formData.get('email')   || '').trim();
            const message  = (formData.get('message') || '').trim();

            // Clear all previous errors
            document.querySelectorAll('.form-error').forEach(function (error) {
                error.textContent = '';
            });

            // Reset field borders
            document.querySelectorAll('.form-group input, .form-group textarea')
                .forEach(function (field) {
                    field.style.borderColor = '';
                });

            // Validate
            let hasError = false;

            if (!name || name.length < 2) {
                const nameError = document.getElementById('nameError');
                const nameInput = document.getElementById('name');
                if (nameError) nameError.textContent = 'Please enter your full name (min 2 characters)';
                if (nameInput) nameInput.style.borderColor = 'var(--error)';
                hasError = true;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                if (emailInput) emailInput.style.borderColor = 'var(--error)';
                hasError = true;
            }

            if (!message || message.length < 10) {
                const messageError = document.getElementById('messageError');
                const msgInput     = document.getElementById('message');
                if (messageError) messageError.textContent = 'Please describe your project (min 10 characters)';
                if (msgInput)     msgInput.style.borderColor = 'var(--error)';
                hasError = true;
            }

            if (hasError) {
                // Scroll to first error
                const firstError = document.querySelector('.form-error:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled   = true;
            submitBtn.classList.add('loading');

            try {
                const response = await fetch(contactForm.action, {
                    method:  'POST',
                    body:    formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {

                    // Success
                    if (formSuccess) {
                        formSuccess.style.display = 'block';
                        formSuccess.classList.add('show');
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }

                    contactForm.reset();

                    if (charCountEl) charCountEl.textContent = '0 / 500';

                    showToast('✅ Message sent! I\'ll reply within 2 hours.');

                    // Hide success after 10 seconds
                    setTimeout(function () {
                        if (formSuccess) {
                            formSuccess.style.display = 'none';
                            formSuccess.classList.remove('show');
                        }
                    }, 10000);

                } else {
                    throw new Error('Server error: ' + response.status);
                }

            } catch (error) {
                console.error('Form submission error:', error);

                showToast('❌ Failed to send. Please email me directly.', 'error');

                // Show fallback contact options
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = `
                    background:    rgba(255, 71, 87, 0.1);
                    border:        1px solid rgba(255, 71, 87, 0.3);
                    border-radius: 8px;
                    padding:       16px;
                    margin-top:    16px;
                    font-size:     14px;
                    color:         #ff4757;
                `;
                errorDiv.innerHTML = `
                    <strong>Message not sent.</strong> Please contact me directly:<br><br>
                    📧 <a href="mailto:rajatsharma8087@gmail.com" 
                          style="color: #667eea;">
                           rajatsharma8087@gmail.com
                       </a><br>
                    🐦 <a href="https://twitter.com/Rajatsharma_87" 
                          target="_blank"
                          style="color: #667eea;">
                           @Rajatsharma_87
                       </a>
                `;

                submitBtn.parentNode.insertBefore(errorDiv, submitBtn.nextSibling);

                setTimeout(function () {
                    if (errorDiv.parentNode) errorDiv.remove();
                }, 15000);

            } finally {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled  = false;
                submitBtn.classList.remove('loading');
            }
        });
    }

    // ─────────────────────────────────────────
    // 13. ACTIVE NAV LINK ON SCROLL
    // ─────────────────────────────────────────

    function updateActiveNavLink() {
        const sections       = document.querySelectorAll('section[id]');
        const navLinks       = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(function (section) {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    // ─────────────────────────────────────────
    // 14. SMOOTH SCROLL
    // FIX: Account for mobile menu height difference
    // ─────────────────────────────────────────

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href   = link.getAttribute('href');
            const target = document.querySelector(href);

            if (target && href !== '#') {
                e.preventDefault();

                const navHeight = navbar ? navbar.offsetHeight : 80;

                window.scrollTo({
                    top:      target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─────────────────────────────────────────
    // 15. SCROLL PROGRESS BAR
    // ─────────────────────────────────────────

    const progressBar = document.createElement('div');
    progressBar.id    = 'scrollProgress';
    progressBar.style.cssText = `
        position:   fixed;
        top:        0;
        left:       0;
        height:     3px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        z-index:    99999;
        width:      0%;
        transition: width 0.1s linear;
        pointer-events: none;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const scrolled     = window.scrollY;
        const totalHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const percent      = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
        progressBar.style.width = percent + '%';
    }, { passive: true });

    // ─────────────────────────────────────────
    // 16. TOAST NOTIFICATION
    // ─────────────────────────────────────────

    let activeToast = null;

    function showToast(message, type = 'success') {

        // Remove existing toast
        if (activeToast && activeToast.parentNode) {
            activeToast.remove();
        }

        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position:      fixed;
            bottom:        30px;
            right:         30px;
            background:    ${type === 'success' ? '#00ff87' : '#ff4757'};
            color:         ${type === 'success' ? '#000000' : '#ffffff'};
            padding:       14px 24px;
            border-radius: 8px;
            font-weight:   600;
            font-size:     14px;
            z-index:       999999;
            box-shadow:    0 10px 30px rgba(0, 0, 0, 0.3);
            max-width:     300px;
            line-height:   1.5;
            opacity:       0;
            transform:     translateY(20px);
            transition:    opacity 0.3s ease, transform 0.3s ease;
        `;

        document.body.appendChild(toast);
        activeToast = toast;

        // Animate in
        requestAnimationFrame(function () {
            toast.style.opacity   = '1';
            toast.style.transform = 'translateY(0)';
        });

        // Animate out after 3.5 seconds
        setTimeout(function () {
            toast.style.opacity   = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(function () {
                if (toast.parentNode) toast.remove();
                if (activeToast === toast) activeToast = null;
            }, 300);
        }, 3500);
    }

    // Welcome toast after loader hides
    setTimeout(function () {
        showToast('👋 Welcome! Open for freelance work.');
    }, 2500);

    // ─────────────────────────────────────────
    // 17. KEYBOARD NAVIGATION
    // ─────────────────────────────────────────

    document.addEventListener('keydown', function (e) {
        const isTyping = document.activeElement.tagName === 'INPUT' ||
                         document.activeElement.tagName === 'TEXTAREA' ||
                         document.activeElement.tagName === 'SELECT';

        if (!isTyping) {
            if (e.key === 'ArrowRight' && testimonialCards.length > 0) {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
            }
            if (e.key === 'ArrowLeft' && testimonialCards.length > 0) {
                currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            }
        }

        // Escape always closes mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // ─────────────────────────────────────────
    // 18. IMAGE FADE-IN ON LOAD
    // ─────────────────────────────────────────

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Set initial state
                img.style.opacity    = '0';
                img.style.transition = 'opacity 0.6s ease';

                if (img.complete) {
                    // Image already loaded (from cache)
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', function () {
                        img.style.opacity = '1';
                    });

                    // Fallback if load event doesn't fire
                    img.addEventListener('error', function () {
                        img.style.opacity = '0.3';
                        img.alt = 'Image failed to load';
                    });
                }

                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    lazyImages.forEach(function (img) {
        imageObserver.observe(img);
    });

    // ─────────────────────────────────────────
    // 19. TIME-BASED PAGE TITLE
    // ─────────────────────────────────────────

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5  && hour < 12) return '🌅 Good Morning!';
        if (hour >= 12 && hour < 17) return '☀️ Good Afternoon!';
        if (hour >= 17 && hour < 21) return '🌆 Good Evening!';
        return '🌙 Good Night!';
    }

    document.title = getGreeting() + ' | Rajat Sharma';

    setTimeout(function () {
        document.title = 'Rajat Sharma | Frontend Developer';
    }, 5000);

    // ─────────────────────────────────────────
    // 20. TAB VISIBILITY — Pause animations
    // ─────────────────────────────────────────

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            document.title = '👋 Come back soon! | Rajat Sharma';
        } else {
            document.title = 'Rajat Sharma | Frontend Developer';
        }
    });

    // ─────────────────────────────────────────
    // 21. OFFER CARDS HOVER EFFECT
    // ─────────────────────────────────────────

    document.querySelectorAll('.offer-card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // ─────────────────────────────────────────
    // 22. BACK TO TOP BUTTON
    // ─────────────────────────────────────────

    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity    = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity    = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        }, { passive: true });

        // Set initial state
        backToTopBtn.style.opacity    = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }

    // ─────────────────────────────────────────
    // DONE — Portfolio fully loaded! 🚀
    // ─────────────────────────────────────────

    console.log(
        '%c 🚀 Portfolio Loaded!',
        'color: #667eea; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%c Built with HTML, CSS & JavaScript | Rajat Sharma',
        'color: #888; font-size: 14px;'
    );
    console.log(
        '%c Open for freelance work → rajatsharma8087@gmail.com',
        'color: #00ff87; font-size: 13px;'
    );

}); // End DOMContentLoaded