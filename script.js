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
    // 1. HERO POSTER MODE SWITCHER (GACHIAKUTA / SHADES / IRL)
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
        "All systems nominal. 0 lost ticks in mempool. Ready for production deploys.",
        "Arbitrum Nitro full node verified. Microsecond latency maintained.",
        "Reverse proxy handling sessions cleanly. 0 security leaks detected.",
        "48,000 UAH earned on Rust DEX engine... all allocated for premium salmon treats.",
        "Code review completed: zero corporate bloat, pure low-level engineering.",
        "If it compiles in release mode with zero warnings, you have my blessing.",
        "Purr... Nyavochka daemon active: +20% uptime luck on your next deploy."
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
