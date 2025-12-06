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
    const textarea = document.querySelector('.form-group textarea');
    const contactForm = document.getElementById('contact-form');


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


    // ======================================================
    // 4. UI/UX IMPROVEMENT: AUTO-RESIZE TEXTAREA
    // ======================================================
    if (textarea) {
        // Function to handle auto-resizing
        const autoResize = (element) => {
             element.style.height = 'auto'; 
             element.style.height = (element.scrollHeight) + 'px'; 
        };

        textarea.addEventListener('input', () => {
            autoResize(textarea);
        });

        // Initial height setting
        autoResize(textarea);
    }


    // ======================================================
    // 5. CONTACT FORM SUBMISSION HANDLING
    // ======================================================
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            const form = event.target;
            const formData = new FormData(form); 
            
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // NOTE: Change this API URL to your actual backend endpoint
            const API_URL = 'http://localhost:5000/api/contact'; 
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();

                if (response.ok) {
                    alert('Thank you for reaching out! I will get back to you soon.');
                    form.reset(); 
                    
                    if (textarea) {
                        textarea.style.height = 'auto'; 
                        // We must call autoResize again to set the minimum height if it was reset
                        const resizeElement = document.querySelector('.form-group textarea');
                        if(resizeElement) autoResize(resizeElement);
                    }
                    
                } else {
                    alert('Failed to send message: ' + result.message);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while sending your message. Please try again later.');
            }
        });
    }

});