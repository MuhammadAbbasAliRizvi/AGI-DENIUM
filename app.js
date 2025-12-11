        document.addEventListener('DOMContentLoaded', function() {
            // Page Load Animation Complete
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 1500);

            // Sticky Header with Scroll Effect
            const siteHeader = document.getElementById('main-header');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    siteHeader.classList.add('scrolled');
                } else {
                    siteHeader.classList.remove('scrolled');
                }
            });

            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            }

            // Mobile Navigation Toggle
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const mainNavigation = document.querySelector('.main-navigation');
            const navLinks = document.querySelectorAll('.nav-link');
            
            function toggleMobileMenu() {
                const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
                mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
                mainNavigation.classList.toggle('active');
                
                const icon = mobileMenuToggle.querySelector('i');
                if (mainNavigation.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                    document.body.style.overflow = 'hidden';
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                    document.body.style.overflow = 'auto';
                }
            }
            
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (mainNavigation.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                });
            });
            
            document.addEventListener('click', (event) => {
                if (!event.target.closest('.header-container') && mainNavigation.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });

            // Scroll Animation Trigger
            function initScrollAnimations() {
                const elements = document.querySelectorAll('.slide-up, .fade-up');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.animationPlayState = 'running';
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                elements.forEach(el => {
                    if (el.style.animationPlayState !== 'running') {
                        observer.observe(el);
                    }
                });
            }
            
            initScrollAnimations();

            // Magnetic Button Effect
            const magneticButtons = document.querySelectorAll('.magnetic-btn');
            
            magneticButtons.forEach(button => {
                button.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) / centerX * 10;
                    const deltaY = (y - centerY) / centerY * 10;
                    
                    this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0) scale(1)';
                });
            });

            // Animated Number Counter
            function animateNumber(element, target, duration = 2000) {
                const start = 0;
                const increment = target / (duration / 16);
                
                let current = start;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, 16);
            }
            
            function initNumberAnimation() {
                const factNumbers = document.querySelectorAll('.fact-number[data-count]');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            const target = parseInt(element.getAttribute('data-count'));
                            
                            animateNumber(element, target);
                            observer.unobserve(element);
                        }
                    });
                }, {
                    threshold: 0.5,
                    rootMargin: '0px 0px -100px 0px'
                });
                
                factNumbers.forEach(number => {
                    observer.observe(number);
                });
            }
            
            initNumberAnimation();

            // Update Copyright Year
            const currentYearElement = document.getElementById('current-year');
            if (currentYearElement) {
                currentYearElement.textContent = new Date().getFullYear();
            }

            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href === '#' || href.startsWith('javascript:')) return;
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        
                        const headerHeight = siteHeader.offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Newsletter Form
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('input[type="email"]');
                    const email = emailInput.value.trim();
                    
                    if (email) {
                        const button = this.querySelector('.btn-subscribe');
                        const originalHTML = button.innerHTML;
                        button.innerHTML = '<i class="fas fa-check"></i>';
                        button.style.background = 'var(--color-success)';
                        
                        setTimeout(() => {
                            button.innerHTML = originalHTML;
                            button.style.background = '';
                            emailInput.value = '';
                            alert('Thank you for subscribing to our newsletter!');
                        }, 2000);
                    }
                });
            }

            // Image Loading
            const images = document.querySelectorAll('img.loading-img');
            
            images.forEach(img => {
                if (img.complete) {
                    img.classList.remove('loading-img');
                    img.classList.add('loaded-img');
                } else {
                    img.addEventListener('load', function() {
                        this.classList.remove('loading-img');
                        this.classList.add('loaded-img');
                    });
                }
            });

            // Accessibility Improvements
            document.addEventListener('keyup', function(e) {
                if (e.key === 'Tab') {
                    document.documentElement.classList.add('keyboard-navigation');
                }
            });
            
            document.addEventListener('mousedown', function() {
                document.documentElement.classList.remove('keyboard-navigation');
            });
            
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Enhanced Contact Form Submission
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    this.classList.add('submitting');
                    
                    const formData = new FormData(this);
                    const formValues = Object.fromEntries(formData.entries());
                    
                    const errors = validateForm(formValues);
                    
                    if (Object.keys(errors).length > 0) {
                        showFormErrors(this, errors);
                        this.classList.remove('submitting');
                        return;
                    }
                    
                    // Simulate API call
                    setTimeout(() => {
                        const output = this.querySelector('.wpcf7-response-output');
                        output.textContent = 'Thank you for your message. We will get back to you within 24 hours.';
                        output.className = 'wpcf7-response-output wpcf7-mail-sent-ok';
                        output.style.display = 'block';
                        
                        output.style.animation = 'slideIn 0.5s ease';
                        
                        this.reset();
                        this.classList.remove('submitting');
                        
                        setTimeout(() => {
                            output.style.display = 'none';
                        }, 5000);
                    }, 1500);
                });
                
                // Real-time validation
                contactForm.querySelectorAll('.wpcf7-form-control').forEach(input => {
                    input.addEventListener('blur', function() {
                        validateSingleField(this);
                    });
                    
                    input.addEventListener('input', function() {
                        if (this.classList.contains('wpcf7-not-valid')) {
                            const errorElement = this.parentElement.querySelector('.wpcf7-not-valid-tip');
                            if (errorElement) {
                                errorElement.remove();
                            }
                            this.classList.remove('wpcf7-not-valid');
                        }
                    });
                });
            }
            
            function validateForm(data) {
                const errors = {};
                
                if (!data['your-name']?.trim()) {
                    errors['your-name'] = 'Please enter your name.';
                }
                
                if (!data['your-email']?.trim()) {
                    errors['your-email'] = 'Please enter your email address.';
                } else if (!isValidEmail(data['your-email'])) {
                    errors['your-email'] = 'Please enter a valid email address.';
                }
                
                if (!data['your-message']?.trim()) {
                    errors['your-message'] = 'Please enter your message.';
                }
                
                return errors;
            }
            
            function validateSingleField(field) {
                const fieldName = field.name;
                const value = field.value.trim();
                let error = '';
                
                switch (fieldName) {
                    case 'your-name':
                        if (!value) error = 'Please enter your name.';
                        break;
                    case 'your-email':
                        if (!value) {
                            error = 'Please enter your email address.';
                        } else if (!isValidEmail(value)) {
                            error = 'Please enter a valid email address.';
                        }
                        break;
                    case 'your-message':
                        if (!value) error = 'Please enter your message.';
                        break;
                }
                
                const errorElement = field.parentElement.querySelector('.wpcf7-not-valid-tip');
                if (error) {
                    field.classList.add('wpcf7-not-valid');
                    if (errorElement) {
                        errorElement.textContent = error;
                    } else {
                        const errorSpan = document.createElement('span');
                        errorSpan.className = 'wpcf7-not-valid-tip';
                        errorSpan.textContent = error;
                        field.parentElement.appendChild(errorSpan);
                    }
                } else {
                    field.classList.remove('wpcf7-not-valid');
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            }
            
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
            
            function showFormErrors(form, errors) {
                form.querySelectorAll('.wpcf7-not-valid-tip').forEach(el => el.remove());
                form.querySelectorAll('.wpcf7-form-control').forEach(el => el.classList.remove('wpcf7-not-valid'));
                
                Object.keys(errors).forEach(fieldName => {
                    const field = form.querySelector(`[name="${fieldName}"]`);
                    if (field) {
                        field.classList.add('wpcf7-not-valid');
                        const errorSpan = document.createElement('span');
                        errorSpan.className = 'wpcf7-not-valid-tip';
                        errorSpan.textContent = errors[fieldName];
                        field.parentElement.appendChild(errorSpan);
                    }
                });
                
                const output = form.querySelector('.wpcf7-response-output');
                output.textContent = 'Please correct the errors below and try again.';
                output.className = 'wpcf7-response-output wpcf7-validation-errors';
                output.style.display = 'block';
            }

            // Initialize all animations
            setTimeout(() => {
                document.body.classList.add('page-loaded');
            }, 500);

            // Add parallax effect to hero background
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        });