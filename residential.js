document.addEventListener('DOMContentLoaded', () => {
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
    menuToggle.addEventListener('touchend', toggleMenu, { passive: false });
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu(e);
      }
    });
  }

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

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 80);
  });

  // Generate Background Particles
  const galaxyBg = document.querySelector('.galaxy-bg');
  if (galaxyBg) {
    const particleCount = window.innerWidth <= 768 ? 4 : 8;
    const sections = ['bedroom', 'bathroom', 'hall', 'kitchen'];
    sections.forEach(section => {
      const sectionEl = document.querySelector(`[data-section="${section}"]`);
      if (sectionEl) {
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          const size = Math.random() * 2 + 2;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          const tx = (Math.random() - 0.5) * 60;
          const ty = (Math.random() - 0.5) * 60;
          const duration = Math.random() * 3 + 3;
          particle.style.setProperty('--tx', `${tx}px`);
          particle.style.setProperty('--ty', `${ty}px`);
          particle.style.animationDuration = `${duration}s`;
          particle.style.animationDelay = `${Math.random() * 1.5}s`;
          particle.style.background = {
            bedroom: 'rgba(100, 149, 237, 0.7)',
            bathroom: 'rgba(64, 224, 208, 0.7)',
            hall: 'rgba(255, 215, 0, 0.7)',
            kitchen: 'rgba(255, 99, 71, 0.7)'
          }[section];
          sectionEl.appendChild(particle);
        }
      }
    });
  }

  // Optimized 3D Galaxy Background
  const canvas = document.getElementById('galaxy-canvas');
  if (canvas) {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      camera.position.z = 25;

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = window.innerWidth <= 768 ? 500 : 1000;
      const posArray = new Float32Array(particlesCount * 3);
      const colorsArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 100;
        const color = new THREE.Color(`hsl(${Math.random() * 60 + 30}, 80%, 60%)`);
        colorsArray[i] = color.r;
        colorsArray[i + 1] = color.g;
        colorsArray[i + 2] = color.b;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: window.innerWidth <= 768 ? 0.15 : 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
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
        particles.rotation.y += window.innerWidth <= 768 ? 0.0008 : 0.0005;
        particles.rotation.x += window.innerWidth <= 768 ? 0.0004 : 0.0002;
        camera.position.x += (mouseX * 10 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 10 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }

      animateGalaxy();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      });
    } catch (e) {
      console.warn('Three.js failed to initialize:', e);
    }
  } else {
    console.warn('Canvas element not found for galaxy background.');
  }

  // Particle Burst on Card Click
  document.querySelectorAll('.design-card').forEach(card => {
    const section = card.closest('[data-section]').getAttribute('data-section');
    const colors = {
      bedroom: '#6495ED',
      bathroom: '#40E0D0',
      hall: '#FFD700',
      kitchen: '#FF6347'
    };
    const handleInteraction = (e, x, y) => {
      e.preventDefault();
      const burstCount = window.innerWidth <= 768 ? 3 : 6;
      for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-burst';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = colors[section];
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (window.innerWidth <= 768 ? 20 : 30) + 15;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 500);
      }
    };

    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      handleInteraction(e, x, y);
    });

    card.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      handleInteraction(e, x, y);
    }, { passive: false });

    card.addEventListener('touchend', (e) => {
      e.preventDefault();
      const x = e.changedTouches[0].clientX;
      const y = e.changedTouches[0].clientY;
      handleInteraction(e, x, y);
    }, { passive: false });
  });

  // Scroll Reveal Animation with Parallax
  const revealElements = document.querySelectorAll('.zigzag-item');
  const revealObserverOptions = {
    threshold: window.innerWidth <= 768 ? 0.1 : 0.2
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

  // Parallax Effect
  window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
      if (el.classList.contains('visible') && window.innerWidth > 768) {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * 0.05;
        const card = el.querySelector('.design-card');
        card.style.transform = `translateY(${offset}px)`;
      }
    });
  });
});