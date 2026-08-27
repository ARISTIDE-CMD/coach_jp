        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navOverlay = document.querySelector('.nav-overlay');
        const backToTop = document.querySelector('.back-to-top');
        const whatsappFloat = document.querySelector('.whatsapp-float');
        const testimonialsRow = document.querySelector('.testimonials-row');
        const testimonialPrev = document.querySelector('.carousel-btn.prev');
        const testimonialNext = document.querySelector('.carousel-btn.next');

        const openMenu = () => {
            navLinks.classList.add('is-open');
            navOverlay.classList.add('is-open');
            menuToggle.classList.add('is-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Fermer le menu');
        };

        const closeMenu = () => {
            navLinks.classList.remove('is-open');
            navOverlay.classList.remove('is-open');
            menuToggle.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
        };

        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (navLinks.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                closeMenu();
            }
        });

        navOverlay.addEventListener('click', closeMenu);

        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('is-open') && !event.target.closest('nav')) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        const toggleBackToTop = () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('is-visible');
                whatsappFloat.classList.add('is-hidden');
            } else {
                backToTop.classList.remove('is-visible');
                whatsappFloat.classList.remove('is-hidden');
            }
        };

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();

        if (testimonialsRow && testimonialPrev && testimonialNext) {
            const getStep = () => {
                const card = testimonialsRow.querySelector('.testimonial-card');
                if (!card) return 300;
                const gap = parseFloat(getComputedStyle(testimonialsRow).gap || 0);
                return card.getBoundingClientRect().width + gap;
            };

            const scrollByStep = (direction) => {
                testimonialsRow.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
            };

            testimonialPrev.addEventListener('click', () => scrollByStep(-1));
            testimonialNext.addEventListener('click', () => scrollByStep(1));

            let autoScroll = setInterval(() => {
                const maxScroll = testimonialsRow.scrollWidth - testimonialsRow.clientWidth;
                if (testimonialsRow.scrollLeft >= maxScroll - 5) {
                    testimonialsRow.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollByStep(1);
                }
            }, 4500);

            const pauseAuto = () => clearInterval(autoScroll);
            const resumeAuto = () => {
                clearInterval(autoScroll);
                autoScroll = setInterval(() => {
                    const maxScroll = testimonialsRow.scrollWidth - testimonialsRow.clientWidth;
                    if (testimonialsRow.scrollLeft >= maxScroll - 5) {
                        testimonialsRow.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollByStep(1);
                    }
                }, 4500);
            };

            testimonialsRow.addEventListener('mouseenter', pauseAuto);
            testimonialsRow.addEventListener('mouseleave', resumeAuto);
            testimonialPrev.addEventListener('mouseenter', pauseAuto);
            testimonialNext.addEventListener('mouseenter', pauseAuto);
            testimonialPrev.addEventListener('mouseleave', resumeAuto);
            testimonialNext.addEventListener('mouseleave', resumeAuto);
        }

        const revealSections = document.querySelectorAll('section');
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18 }
        );

        revealSections.forEach((section) => {
            section.classList.add('reveal');
            revealObserver.observe(section);
        });

        /* Compteur anime pour les chiffres cles (95%, 200+, 5+) */
        const statEls = document.querySelectorAll('.stat-item strong');
        const statObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const raw = el.textContent.trim();
                    const match = raw.match(/^(\d+)(.*)$/);
                    if (match) {
                        const target = parseInt(match[1], 10);
                        const suffix = match[2];
                        const duration = 1200;
                        const start = performance.now();
                        const step = (now) => {
                            const progress = Math.min((now - start) / duration, 1);
                            const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
                            el.textContent = value + suffix;
                            if (progress < 1) requestAnimationFrame(step);
                            else el.textContent = raw;
                        };
                        requestAnimationFrame(step);
                    }
                    observer.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );
        statEls.forEach((el) => statObserver.observe(el));

        /* Accordeon du parcours (3 etapes) */
        const journeyTriggers = document.querySelectorAll('.journey-trigger');
        journeyTriggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                const isAlreadyOpen = trigger.classList.contains('is-active');

                journeyTriggers.forEach((t) => {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-expanded', 'false');
                });
                document.querySelectorAll('.journey-content').forEach((panel) => {
                    panel.classList.remove('is-open');
                });

                if (!isAlreadyOpen) {
                    trigger.classList.add('is-active');
                    trigger.setAttribute('aria-expanded', 'true');
                    if (targetPanel) targetPanel.classList.add('is-open');
                }
            });
        });
