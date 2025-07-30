document.addEventListener('DOMContentLoaded', () => {
  // Generate Background Particles
  const galaxyBg = document.querySelector('.galaxy-bg');
  if (galaxyBg) {
    const particleCount = window.innerWidth <= 768 ? 8 : 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      const tx = (Math.random() - 0.5) * 80;
      const ty = (Math.random() - 0.5) * 80;
      const duration = Math.random() * 4 + 4;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      galaxyBg.appendChild(particle);
    }
  }

  // Hamburger Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const body = document.body;

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = body.classList.toggle('nav-open');
    mobileNav.classList.toggle('hidden', !isOpen);
    mobileNav.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
    menuToggle.setAttribute('aria-expanded', isOpen);
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchstart', toggleMenu, { passive: false });
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu(e);
      }
    });
  } else {
    console.error('Menu toggle button not found');
  }

  // Navigation Link Handling
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const href = item.getAttribute('href');
      if (href && href !== '#') {
        if (window.innerWidth <= 768) {
          body.classList.remove('nav-open');
          mobileNav.classList.add('hidden');
          mobileNav.style.transform = 'translateX(100%)';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        setTimeout(() => window.location.href = href, 300);
      }
    });
    item.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const href = item.getAttribute('href');
      if (href && href !== '#') {
        if (window.innerWidth <= 768) {
          body.classList.remove('nav-open');
          mobileNav.classList.add('hidden');
          mobileNav.style.transform = 'translateX(100%)';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        setTimeout(() => window.location.href = href, 300);
      }
    }, { passive: false });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '#') {
          if (window.innerWidth <= 768) {
            body.classList.remove('nav-open');
            mobileNav.classList.add('hidden');
            mobileNav.style.transform = 'translateX(100%)';
            menuToggle.setAttribute('aria-expanded', 'false');
          }
          document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
          item.classList.add('active');
          window.location.href = href;
        }
      }
    });
  });

  // Close Menu on Outside Click
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && body.classList.contains('nav-open')) {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        body.classList.remove('nav-open');
        mobileNav.classList.add('hidden');
        mobileNav.style.transform = 'translateX(100%)';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  document.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 768 && body.classList.contains('nav-open')) {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        body.classList.remove('nav-open');
        mobileNav.classList.add('hidden');
        mobileNav.style.transform = 'translateX(100%)';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  }, { passive: false });

  // Resize Handler
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      body.classList.remove('nav-open');
      mobileNav.classList.add('hidden');
      mobileNav.style.transform = 'translateX(100%)';
      document.getElementById('nav-menu').style.display = 'flex';
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.style.transform = body.classList.contains('nav-open') ? 'translateX(0)' : 'translateX(100%)';
      mobileNav.classList.toggle('hidden', !body.classList.contains('nav-open'));
    }
  });

  // Update Active Nav Item on Scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '-80px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        document.querySelectorAll('.nav-item').forEach(nav => {
          nav.classList.remove('active');
          if (nav.getAttribute('href') === 'projects.html' && id === '#projects') {
            nav.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 80);
  });

  // 3D Galaxy Background
  const canvas = document.getElementById('galaxy-canvas');
  if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth <= 768 ? 1500 : 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 150;
      posArray[i + 1] = (Math.random() - 0.5) * 150;
      posArray[i + 2] = (Math.random() - 0.5) * 150;
      const color = new THREE.Color(`hsl(${Math.random() * 60 + 60}, 100%, 70%)`);
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: window.innerWidth <= 768 ? 0.2 : 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    }, { passive: true });

    function animateGalaxy() {
      requestAnimationFrame(animateGalaxy);
      particles.rotation.y += window.innerWidth <= 768 ? 0.001 : 0.0008;
      particles.rotation.x += window.innerWidth <= 768 ? 0.0005 : 0.0003;
      camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 15 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    animateGalaxy();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  } else {
    console.error('Galaxy canvas not found');
  }

  // Particle Burst on Card Click with Redirect
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const rect = card.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const burstCount = window.innerWidth <= 768 ? 5 : 10;
      for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-burst';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (window.innerWidth <= 768 ? 30 : 50) + 30;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
      }
      const href = card.getAttribute('href');
      if (href && href !== '#') {
        setTimeout(() => window.location.href = href, 600);
      }
    });
    card.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = card.getBoundingClientRect();
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const burstCount = window.innerWidth <= 768 ? 5 : 10;
      for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-burst';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (window.innerWidth <= 768 ? 30 : 50) + 30;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
      }
      const href = card.getAttribute('href');
      if (href && href !== '#') {
        setTimeout(() => window.location.href = href, 600);
      }
    }, { passive: false });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.section-title, .project-card');
  const revealObserverOptions = {
    threshold: window.innerWidth <= 768 ? 0.1 : 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => revealObserver.observe(element));
});