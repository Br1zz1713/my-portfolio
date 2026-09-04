// =========================================================================
// YEVHEN BEREZANSKYI // 0xCLEANER - CANVAS TOWN INTERACTION ENGINE
// Clean Vanilla JS • Web Audio Synthesis • High Performance • Zero Bloat
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------------------
    // 0. WEB AUDIO API SYNTHESIZER: SPRAY CAN HISS & CLICK
    // ---------------------------------------------------------------------
    function playSpraySound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const bufferSize = ctx.sampleRate * 0.12; // 120ms burst
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 3400;
            filter.Q.value = 1.4;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch (e) {
            // AudioContext autoplay restrictions or disabled
        }
    }

    // ---------------------------------------------------------------------
    // 1. THEME TOGGLE (DARK / LIGHT MODE)
    // ---------------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            playSpraySound();
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // ---------------------------------------------------------------------
    // 2. HERO POSTER MODE SWITCHER (GACHIAKUTA / SHADES / IRL)
    // ---------------------------------------------------------------------
    const posterImg = document.getElementById('hero-poster-img');
    const posterTag = document.getElementById('hero-poster-tag');
    const modeBtns = document.querySelectorAll('.poster-mode-switcher .mode-btn');

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetImg = btn.getAttribute('data-img');
            const targetTag = btn.getAttribute('data-tag');

            playSpraySound();

            if (posterImg && targetImg) {
                posterImg.style.opacity = '0.2';
                posterImg.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    posterImg.src = targetImg;
                    posterImg.style.opacity = '1';
                    posterImg.style.transform = 'scale(1)';
                }, 130);
            }

            if (posterTag && targetTag) {
                const textSpan = posterTag.querySelector('.sticker-text');
                if (textSpan) {
                    textSpan.textContent = targetTag;
                }
            }
        });
    });

    // ---------------------------------------------------------------------
    // 3. PROJECT CATEGORY FILTERING
    // ---------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            playSpraySound();

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---------------------------------------------------------------------
    // 4. STICKY HEADER ON SCROLL
    // ---------------------------------------------------------------------
    const header = document.querySelector('.main-header');

    function handleScroll() {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---------------------------------------------------------------------
    // 5. MOBILE HAMBURGER NAVIGATION
    // ---------------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navMenu.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------------------------------------------------------------------
    // 6. NYAVOCHKA SENTINEL EASTER EGG (CHIEF CODE REVIEWER)
    // ---------------------------------------------------------------------
    const catTrigger = document.getElementById('cat-avatar-trigger');
    const catBubble = document.getElementById('cat-speech-bubble');
    const catQuote = document.getElementById('cat-quote-text');
    const catCounter = document.getElementById('cat-quote-counter');

    const catQuotes = [
        "Meow! I'm Nyavochka — Chief Code Reviewer. No push to production without chin scratches.",
        "If this 0xDEV box fits into stack memory, there are zero leaks. Purr...",
        "48,000 UAH earned on Rust DEX engine? Yevhen already converted it to premium salmon treats.",
        "Arbitrum Nitro node synced. 0 lost ticks in mempool, 0 uncaught flies in Canvas Town.",
        "Server shipping box is my personal Jinki weapon. Don't even think about taking it.",
        "Reverse proxy inspected: unauthorized cats cannot hijack our enterprise sessions.",
        "Purr... You unlocked the Nyavochka Buff: +20% zero-downtime luck on Friday deploys!"
    ];

    let currentQuoteIndex = 0;

    function triggerCatPurr() {
        if (!catTrigger || !catQuote) return;
        
        playSpraySound();
        currentQuoteIndex = (currentQuoteIndex + 1) % catQuotes.length;
        
        // Visual purr / bounce animation
        catTrigger.classList.add('purring');
        setTimeout(() => catTrigger.classList.remove('purring'), 600);

        // Text fade transition
        catQuote.style.opacity = '0';
        setTimeout(() => {
            catQuote.textContent = `"${catQuotes[currentQuoteIndex]}"`;
            if (catCounter) {
                catCounter.textContent = `[0${currentQuoteIndex + 1}/0${catQuotes.length}]`;
            }
            catQuote.style.opacity = '1';
        }, 140);
    }

    if (catTrigger) {
        catTrigger.addEventListener('click', triggerCatPurr);
    }
    if (catBubble) {
        catBubble.addEventListener('click', triggerCatPurr);
    }
});
