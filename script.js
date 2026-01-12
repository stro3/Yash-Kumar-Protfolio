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
