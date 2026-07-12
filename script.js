(function () {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2800);
    }

    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('cursorDot');
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    if (cursor && dot) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
        });

        function animateCursor() {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverTargets = document.querySelectorAll('a, button, .project-card-3d, .skill-card-3d, .cert-flip-card, .service-card-3d, .social-card-3d, .form-input, .form-textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.4s ease';
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s ease';
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const splitTexts = document.querySelectorAll('.split-text[data-animate="true"]');
    const splitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                splitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    splitTexts.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.15) + 's';
        splitObserver.observe(el);
    });

    const animate3dElements = document.querySelectorAll('.animate-3d');
    const anim3dObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                anim3dObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    animate3dElements.forEach(el => anim3dObserver.observe(el));

    const timelineItems = document.querySelectorAll('.timeline-item.animate-3d');
    timelineItems.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.15) + 's';
    });

    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const typedText = document.getElementById('typedText');
    if (typedText) {
        const phrases = [
            'Full-Stack Software Engineer',
            'Desktop App Developer',
            'Database Architect',
            'UI/UX Enthusiast',
            'Problem Solver'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typedText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typedText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 3000);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (target) {
                    let start = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    const update = () => {
                        start += increment;
                        if (start < target) {
                            entry.target.textContent = Math.floor(start);
                            requestAnimationFrame(update);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    update();
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));

    const terminalElement = document.getElementById('typewriter-terminal');
    if (terminalElement) {
        const terminalCode = `class Developer {
  constructor() {
    this.name = "Yash Kumar";
    this.role = "Software Developer";
    this.languages = [
      "Python", "Java",
      "JavaScript", "C++"
    ];
  }

  sayHello() {
    return "Let's build something!";
  }
}`;

        const keywords = ['class', 'constructor', 'return'];
        let terminalTyped = false;

        function typeTerminal() {
            if (terminalTyped) return;
            let i = 0;
            let currentHTML = '';

            function addChar() {
                if (i < terminalCode.length) {
                    const char = terminalCode[i];
                    if (char === '\n') {
                        currentHTML += '<br>';
                    } else {
                        let matched = false;
                        if (terminalCode.substring(i, i + 5) === 'this.') {
                            currentHTML += '<span class="code-this">this</span>.';
                            i += 4;
                            matched = true;
                        }
                        if (!matched) {
                            for (const kw of keywords) {
                                if (terminalCode.substring(i, i + kw.length) === kw &&
                                    (i === 0 || /\s/.test(terminalCode[i - 1]))) {
                                    currentHTML += '<span class="code-keyword">' + kw + '</span>';
                                    i += kw.length - 1;
                                    matched = true;
                                    break;
                                }
                            }
                        }
                        if (!matched && terminalCode.substring(i, i + 9) === 'Developer') {
                            currentHTML += '<span class="code-class">Developer</span>';
                            i += 8;
                            matched = true;
                        }
                        if (!matched && terminalCode.substring(i, i + 8) === 'sayHello') {
                            currentHTML += '<span class="code-function">sayHello</span>';
                            i += 7;
                            matched = true;
                        }
                        if (!matched && char === '"') {
                            let endQuote = terminalCode.indexOf('"', i + 1);
                            if (endQuote !== -1) {
                                currentHTML += '<span class="code-string">' + terminalCode.substring(i, endQuote + 1) + '</span>';
                                i = endQuote;
                                matched = true;
                            }
                        }
                        if (!matched) {
                            currentHTML += char;
                        }
                    }
                    terminalElement.innerHTML = currentHTML;
                    i++;
                    setTimeout(addChar, 20 + Math.random() * 20);
                } else {
                    terminalTyped = true;
                }
            }
            addChar();
        }

        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            const termObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !terminalTyped) {
                        setTimeout(typeTerminal, 500);
                        termObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            termObserver.observe(aboutSection);
        }
    }

    document.querySelectorAll('.project-card-3d, .service-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    document.querySelectorAll('.project-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (y - 0.5) * 8;
            const tiltY = (x - 0.5) * -8;
            card.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.form-submit');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10"></circle></svg><span class="btn-text">Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span class="btn-text">Message Sent!</span>';
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    const profilePhoto = document.getElementById('profilePhoto');
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function () {
            this.style.display = 'none';
            const container = this.parentElement;
            const placeholder = document.createElement('div');
            placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;font-weight:900;background:linear-gradient(135deg, hsl(250,85%,65%), hsl(290,90%,60%));color:white;border-radius:50%;';
            placeholder.textContent = 'YK';
            container.appendChild(placeholder);
        });
    }
})();
