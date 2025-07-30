document.addEventListener('DOMContentLoaded', () => {
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

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .section-transition');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(element => observer.observe(element));

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 80);
    });

    // Particle Background for Hero Section
    const particleCanvas = document.getElementById('particle-canvas');
    const particleCtx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;

            if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
        }

        draw() {
            particleCtx.fillStyle = 'rgba(251, 191, 36, 0.7)';
            particleCtx.beginPath();
            particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            particleCtx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
                particlesArray.push(new Particle());
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });

    // Constellation Animation for Our Journey Section
    const constellationCanvas = document.getElementById('constellation-canvas');
    const constellationCtx = constellationCanvas.getContext('2d');
    constellationCanvas.width = constellationCanvas.offsetWidth;
    constellationCanvas.height = constellationCanvas.offsetHeight;

    const points = document.querySelectorAll('.constellation-point');
    const coordinates = Array.from(points).map(point => {
        const rect = point.getBoundingClientRect();
        const canvasRect = constellationCanvas.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - canvasRect.left,
            y: rect.top + rect.height / 2 - canvasRect.top
        };
    });

    function drawConstellation() {
        constellationCtx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
        constellationCtx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
        constellationCtx.lineWidth = 2;
        constellationCtx.setLineDash([5, 5]);

        for (let i = 0; i < coordinates.length - 1; i++) {
            constellationCtx.beginPath();
            constellationCtx.moveTo(coordinates[i].x, coordinates[i].y);
            constellationCtx.lineTo(coordinates[i + 1].x, coordinates[i + 1].y);
            constellationCtx.stroke();
        }

        requestAnimationFrame(drawConstellation);
    }

    drawConstellation();

    window.addEventListener('resize', () => {
        constellationCanvas.width = constellationCanvas.offsetWidth;
        constellationCanvas.height = constellationCanvas.offsetHeight;
        coordinates.forEach((coord, index) => {
            const rect = points[index].getBoundingClientRect();
            const canvasRect = constellationCanvas.getBoundingClientRect();
            coord.x = rect.left + rect.width / 2 - canvasRect.left;
            coord.y = rect.top + rect.height / 2 - canvasRect.top;
        });
    });

    // Background Glow Animation for Why Choose Section
    const glowCanvas = document.getElementById('background-glow');
    const glowCtx = glowCanvas.getContext('2d');
    glowCanvas.width = window.innerWidth;
    glowCanvas.height = glowCanvas.offsetHeight;

    const glowParticles = [];
    const numberOfGlowParticles = 30;

    class GlowParticle {
        constructor() {
            this.x = Math.random() * glowCanvas.width;
            this.y = Math.random() * glowCanvas.height;
            this.size = Math.random() * 20 + 10;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += (Math.random() * 0.02 - 0.01);

            if (this.opacity < 0.2) this.opacity = 0.2;
            if (this.opacity > 0.7) this.opacity = 0.7;

            if (this.x < 0 || this.x > glowCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > glowCanvas.height) this.speedY *= -1;
        }

        draw() {
            glowCtx.fillStyle = `rgba(251, 191, 36, ${this.opacity})`;
            glowCtx.beginPath();
            glowCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            glowCtx.fill();
        }
    }

    function initGlowParticles() {
        for (let i = 0; i < numberOfGlowParticles; i++) {
            glowParticles.push(new GlowParticle());
        }
    }

    function animateGlow() {
        glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
        for (let i = 0; i < glowParticles.length; i++) {
            glowParticles[i].update();
            glowParticles[i].draw();
        }
        requestAnimationFrame(animateGlow);
    }

    initGlowParticles();
    animateGlow();

    window.addEventListener('resize', () => {
        glowCanvas.width = window.innerWidth;
        glowCanvas.height = glowCanvas.offsetHeight;
    });
});