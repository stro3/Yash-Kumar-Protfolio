const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat-card, .contact-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

const projectsContainer = document.getElementById('projectsContainer');

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/yourusername/repos?sort=updated&per_page=6');
        if (!response.ok) return;

        const repos = await response.json();
        const existingCards = projectsContainer.querySelectorAll('.project-card');

        repos.slice(0, 3).forEach((repo, index) => {
            if (existingCards[index]) {
                const card = existingCards[index];
                const titleElement = card.querySelector('.project-title');
                const descElement = card.querySelector('.project-description');
                const linkElement = card.querySelector('.project-link[href*="github"]');

                if (titleElement) titleElement.textContent = repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                if (descElement && repo.description) descElement.textContent = repo.description;
                if (linkElement) linkElement.href = repo.html_url;

                if (repo.topics && repo.topics.length > 0) {
                    const techContainer = card.querySelector('.project-tech');
                    if (techContainer) {
                        techContainer.innerHTML = repo.topics.slice(0, 4).map(topic =>
                            `<span class="tech-tag">${topic}</span>`
                        ).join('');
                    }
                }
            }
        });
    } catch (error) {
        console.error('GitHub API fetch failed:', error);
    }
}

window.addEventListener('load', fetchGitHubProjects);

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Sending...
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Message Sent!
            `;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

const certificateCards = document.querySelectorAll('.certificate-card');
certificateCards.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const skillGroups = document.querySelectorAll('.skill-group');
skillGroups.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

// Reveal section titles on scroll
const revealElements = document.querySelectorAll('.reveal-text');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.3 });

revealElements.forEach(el => revealObserver.observe(el));

// Staggered animation for cards
const animatedCards = document.querySelectorAll('.project-card, .certificate-card, .skill-category, .skill-card-modern');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

animatedCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
    cardObserver.observe(card);
});

// Parallax effect on mouse move (hero section)
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (hero && heroVisual) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        heroVisual.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        heroVisual.style.transform = 'translateX(0) translateY(0)';
        heroVisual.style.transition = 'transform 0.5s ease';
    });
}

// Code window typing effect
const codeElement = document.getElementById('typewriter-code');
if (codeElement) {
    const codeLines = [
        { text: 'const ', class: 'keyword' },
        { text: 'developer', class: 'variable' },
        { text: ' = {\n', class: '' },
        { text: '  name', class: 'property' },
        { text: ': ', class: '' },
        { text: "'Yash Kumar'", class: 'string' },
        { text: ',\n', class: '' },
        { text: '  role', class: 'property' },
        { text: ': ', class: '' },
        { text: "'Full-Stack Engineer'", class: 'string' },
        { text: ',\n', class: '' },
        { text: '  skills', class: 'property' },
        { text: ': [', class: '' },
        { text: "'React'", class: 'string' },
        { text: ', ', class: '' },
        { text: "'JavaScript'", class: 'string' },
        { text: ', ', class: '' },
        { text: "'CSS'", class: 'string' },
        { text: ', ', class: '' },
        { text: "'HTML'", class: 'string' },
        { text: ', ', class: '' },
        { text: "'Python'", class: 'string' },
        { text: '],\n', class: '' },
        { text: '  passion', class: 'property' },
        { text: ': ', class: '' },
        { text: "'Building great products'", class: 'string' },
        { text: '\n};', class: '' }
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeCode() {
        if (lineIndex < codeLines.length) {
            const currentPart = codeLines[lineIndex];

            if (charIndex < currentPart.text.length) {
                const char = currentPart.text.charAt(charIndex);

                if (charIndex === 0 && currentPart.class) {
                    codeElement.innerHTML += `<span class="${currentPart.class}">`;
                }

                if (char === '\n') {
                    if (currentPart.class && charIndex === currentPart.text.length - 1) {
                        codeElement.innerHTML += '</span>';
                    }
                    codeElement.innerHTML += '<br>';
                } else {
                    codeElement.innerHTML = codeElement.innerHTML.replace(/<\/span>$/, '');
                    const spans = codeElement.querySelectorAll('span');
                    const lastSpan = spans[spans.length - 1];

                    if (currentPart.class && lastSpan && lastSpan.className === currentPart.class) {
                        lastSpan.textContent += char;
                    } else if (currentPart.class) {
                        codeElement.innerHTML += `<span class="${currentPart.class}">${char}</span>`;
                    } else {
                        codeElement.innerHTML += char;
                    }
                }

                charIndex++;
                setTimeout(typeCode, 30 + Math.random() * 30);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeCode, 50);
            }
        }
    }

    // Start typing after a short delay
    setTimeout(typeCode, 1000);
}

// Terminal typing effect for About section (developer.js)
const terminalElement = document.getElementById('typewriter-terminal');
const terminalCursor = document.querySelector('.terminal-cursor');

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

    // Syntax highlighting map
    const keywords = ['class', 'constructor', 'return'];
    const thisKeyword = 'this';

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
                    // Check for keywords at current position
                    let matched = false;

                    // Check for 'this.'
                    if (terminalCode.substring(i, i + 5) === 'this.') {
                        currentHTML += '<span class="code-this">this</span>.';
                        i += 4;
                        matched = true;
                    }

                    // Check for keywords
                    if (!matched) {
                        for (const kw of keywords) {
                            if (terminalCode.substring(i, i + kw.length) === kw &&
                                (i === 0 || /\s/.test(terminalCode[i - 1]))) {
                                currentHTML += `<span class="code-keyword">${kw}</span>`;
                                i += kw.length - 1;
                                matched = true;
                                break;
                            }
                        }
                    }

                    // Check for class name (Developer)
                    if (!matched && terminalCode.substring(i, i + 9) === 'Developer') {
                        currentHTML += '<span class="code-class">Developer</span>';
                        i += 8;
                        matched = true;
                    }

                    // Check for function name (sayHello)
                    if (!matched && terminalCode.substring(i, i + 8) === 'sayHello') {
                        currentHTML += '<span class="code-function">sayHello</span>';
                        i += 7;
                        matched = true;
                    }

                    // Check for strings
                    if (!matched && char === '"') {
                        let endQuote = terminalCode.indexOf('"', i + 1);
                        if (endQuote !== -1) {
                            const str = terminalCode.substring(i, endQuote + 1);
                            currentHTML += `<span class="code-string">${str}</span>`;
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
                setTimeout(addChar, 25 + Math.random() * 25);
            } else {
                terminalTyped = true;
            }
        }

        addChar();
    }

    // Start typing when the about section is visible
    const aboutSection = document.querySelector('.about');
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !terminalTyped) {
                setTimeout(typeTerminal, 500);
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) {
        terminalObserver.observe(aboutSection);
    }
}

// Counter animation for any stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Observe stat elements
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (target) {
                animateCounter(entry.target, target);
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// Smooth reveal for about section paragraphs
const aboutParagraphs = document.querySelectorAll('.about-paragraph');
aboutParagraphs.forEach((p, index) => {
    p.style.opacity = '0';
    p.style.transform = 'translateX(-30px)';
    p.style.transition = `all 0.6s ease ${index * 0.2}s`;
});

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const paragraphs = entry.target.querySelectorAll('.about-paragraph');
            paragraphs.forEach(p => {
                p.style.opacity = '1';
                p.style.transform = 'translateX(0)';
            });
        }
    });
}, { threshold: 0.3 });

const aboutSection = document.querySelector('.about-text');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add tilt effect to project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

console.log('🚀 Portfolio animations loaded!');
