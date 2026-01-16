// script.js

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // 0. GLOBAL ELEMENT SELECTION
    // ======================================================
    const animatedElements = document.querySelectorAll('.js-animate');
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const header = document.querySelector('.main-header');
    const heroSection = document.getElementById('hero-section');

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // ======================================================
    // 0.1 THEME TOGGLE LOGIC
    // ======================================================
    if (themeToggle) {
        // Check for saved user preference, if any, on load of the website
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');

            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }


    // ======================================================
    // 0.2 PROJECT FILTERING
    // ======================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    // Simple fade in effect
                    item.style.opacity = '0';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });


    // ======================================================
    // 1. SCROLL ANIMATION: Intersection Observer API
    // ======================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });


    // ======================================================
    // 2. DYNAMIC HEADER BACKGROUND ON SCROLL
    // ======================================================
    if (header && heroSection) {
        // Определяем точку, когда хедер должен измениться (за 100px до конца hero-секции)
        const scrollTrigger = heroSection.offsetHeight - 100;

        window.addEventListener('scroll', () => {
            if (window.scrollY >= scrollTrigger) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Initial check in case page loads already scrolled
        window.dispatchEvent(new Event('scroll'));
    }


    // ======================================================
    // 3. HAMBURGER MENU FUNCTIONALITY
    // ======================================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Только на мобильных/планшетах закрываем
                if (window.innerWidth < 768) {
                    hamburger.classList.remove('is-active');
                    navMenu.classList.remove('is-active');
                }
            });
        });
    }







});