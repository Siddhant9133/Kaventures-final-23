document.addEventListener('DOMContentLoaded', () => {
    // Particle.js Configuration
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 1000 } },
            color: { value: '#FBBF24' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 120, color: '#FBBF24', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
        },
        retina_detect: true
    });

    // Landing Page Transition
    document.getElementById('explore-btn').addEventListener('click', () => {
        const landing = document.getElementById('landing');
        landing.style.opacity = '0';
        setTimeout(() => {
            landing.classList.add('hidden');
            const mainContent = document.getElementById('main-content');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
            const projectsSection = document.getElementById('projects');
            window.scrollTo({
                top: projectsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }, 700);
    });

    // Hamburger Menu Toggle (only on mobile)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth <= 768) {
            body.classList.toggle('nav-open');
        }
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                body.classList.remove('nav-open');
            }
            // Removed smooth scrolling logic to allow external navigation
        });
    });

    // Ensure nav menu visibility on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            body.classList.remove('nav-open');
            navMenu.style.display = 'flex';
        } else {
            if (!body.classList.contains('nav-open')) {
                navMenu.style.display = 'none';
            }
        }
    });

    // Slideshow Functionality
    let slideIndex = 1;
    let isTransitioning = false;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
        if (!isTransitioning) {
            showSlides(slideIndex += n);
        }
    };

    window.currentSlide = function(n) {
        if (!isTransitioning) {
            showSlides(slideIndex = n);
        }
    };

    function showSlides(n) {
        isTransitioning = true;
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("fade");
            slides[i].querySelector('.slide-text').style.opacity = '0';
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].classList.add("fade");
        slides[slideIndex - 1].querySelector('.slide-text').style.opacity = '1';
        dots[slideIndex - 1].className += " active";
        setTimeout(() => { isTransitioning = false; }, 800);
    }

    // Auto Slideshow
    let autoSlideInterval = setInterval(() => {
        plusSlides(1);
    }, 7000);

    // Touch Swipe Support for Slider
    let touchStartX = 0;
    let touchEndX = 0;
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    });

    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            plusSlides(1); // Swipe left, next slide
        } else if (touchEndX - touchStartX > 50) {
            plusSlides(-1); // Swipe right, previous slide
        }
        setTimeout(() => {
            autoSlideInterval = setInterval(() => {
                plusSlides(1);
            }, 7000);
        }, 2000);
    });

    // Form Submission
    window.submitForm = function() {
        const name = document.querySelector('input[placeholder="Your Name"]').value;
        const email = document.querySelector('input[placeholder="Your Email"]').value;
        const message = document.querySelector('textarea[placeholder="Your Message"]').value;
        if (name && email && message) {
            alert('Thank you for your message! We’ll respond within 24 hours.');
            document.querySelectorAll('input, textarea').forEach(field => field.value = '');
        } else {
            alert('Please complete all fields to send your message.');
        }
    };

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 80);
    });
});