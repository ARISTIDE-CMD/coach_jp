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

        /* Illustrations décoratives des 4 services. Elles restent derrière le contenu
           et donnent une histoire visuelle propre à chaque prestation. */
        const serviceIllustrations = [
            'assets/service-formation.svg',
            'assets/service-dossier.svg',
            'assets/service-visa.svg',
            'assets/service-installation.svg'
        ];

        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            if (!serviceIllustrations[index]) return;

            card.classList.add('has-service-illustration');
            const illustration = document.createElement('img');
            illustration.className = 'service-illustration';
            illustration.src = serviceIllustrations[index];
            illustration.alt = '';
            illustration.setAttribute('aria-hidden', 'true');
            illustration.loading = 'lazy';
            card.appendChild(illustration);
        });

        const serviceIllustrationStyle = document.createElement('style');
        serviceIllustrationStyle.textContent = `
            .service-card.has-service-illustration {
                position: relative;
                overflow: hidden;
                isolation: isolate;
            }
            .service-card.has-service-illustration::before {
                content: '';
                position: absolute;
                width: 170px;
                height: 170px;
                right: -55px;
                bottom: -65px;
                border-radius: 50%;
                background: #fff5ee;
                z-index: -2;
            }
            .service-card.has-service-illustration::after {
                content: '';
                position: absolute;
                width: 8px;
                height: 55px;
                left: 0;
                bottom: 18px;
                border-radius: 0 8px 8px 0;
                background: #f26b3e;
                opacity: .18;
            }
            .service-card .service-icon,
            .service-card h3,
            .service-card p {
                position: relative;
                z-index: 2;
            }
            .service-card .service-illustration {
                position: absolute;
                width: 145px;
                height: 100px;
                object-fit: contain;
                right: -10px;
                bottom: -3px;
                opacity: .24;
                z-index: 0;
                pointer-events: none;
                transform: rotate(-2deg);
                transition: opacity .25s ease, transform .25s ease;
            }
            .service-card:hover .service-illustration {
                opacity: .38;
                transform: translateY(-4px) rotate(-2deg) scale(1.04);
            }
            @media (max-width: 640px) {
                .service-card .service-illustration {
                    width: 120px;
                    height: 82px;
                    right: -12px;
                    bottom: -2px;
                    opacity: .2;
                }
                .service-card.has-service-illustration::before {
                    width: 140px;
                    height: 140px;
                    right: -50px;
                    bottom: -55px;
                }
            }
        `;
        document.head.appendChild(serviceIllustrationStyle);
