// Page Navigation
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateMobileMenuActive(page);
  initReveals();
}

// Mobile Menu
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  const navbar = document.getElementById('navbar');
  
  menu.classList.toggle('open');
  if (menu.classList.contains('open')) {
    overlay.style.display = 'block';
    if (window.innerWidth <= 968) {
        navbar.style.display = 'none';
    }
    document.body.style.overflow = 'hidden';
  } else {
    overlay.style.display = 'none';
    navbar.style.display = '';
    document.body.style.overflow = '';
  }
}

// Update active state in floating menu
function updateMobileMenuActive(page) {
  document.querySelectorAll('.menu-links li').forEach(li => {
    const link = li.querySelector('a');
    const linkPage = link.getAttribute('onclick') || '';
    if (linkPage.includes("'" + page + "'")) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
function initReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// Menu filter
function filterMenu(cat) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('#menuGrid .menu-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
  });
}

// Form handlers
function handleFranchise(e) {
  e.preventDefault();
  alert('Thank you for your franchise inquiry! We will contact you within 24 hours.');
  e.target.reset();
}
function handleContact(e) {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  e.target.reset();
}

// Card background palette (warm brand tones)
const cardBgPalette = ['#EFE0D0','#E8D5C4','#DDD0C8','#F0E0CC','#E5D8CB','#EDE0D5','#E0D5CE','#EAD8C8','#F2E8DD','#E6DDD4','#ECDDD0','#EAD5C0'];

// Build cards — dark card style (reference design)
function buildCards() {
  let idx = 0;
  document.querySelectorAll('.menu-card').forEach(card => {
    const titleEl = card.querySelector('.menu-card-title');
    const descEl  = card.querySelector('.menu-card-desc');
    const imgEl   = card.querySelector('.menu-card-img-container img');
    const pills   = card.querySelectorAll('.stat-pill span');
    if (!titleEl || !pills.length) return;

    const title  = titleEl.textContent.trim();
    const desc   = descEl ? descEl.textContent.trim() : '';
    const price  = pills[0].textContent.trim();
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const imgAlt = imgEl ? imgEl.getAttribute('alt') : title;
    idx++;

    // Rebuild card — dark card design
    card.innerHTML =
      '<div class="card-body">' +
        '<h3 class="card-title">' + title + '</h3>' +
        (desc ? '<p class="card-desc">' + desc + '</p>' : '') +
        '<div class="card-dots"><span></span><span></span><span></span></div>' +
      '</div>' +
      '<div class="card-img-area">' +
        '<img src="' + imgSrc + '" alt="' + imgAlt + '">' +
        '<span class="card-price-badge">' + price + '</span>' +
      '</div>' +
      '<a class="card-arrow-link" onclick="showPage(\'menu\')">↗</a>';
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  buildCards();
  initReveals();
  initHeroGSAP();
});

// GSAP Hero Animation
function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;
  
  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  // STEP 1 - Text enters from outside
  gsap.fromTo(".hero-bg-text-1", 
    { x: "-100vw", opacity: 0 },
    { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
  );
  gsap.fromTo(".hero-bg-text-2", 
    { x: "100vw", opacity: 0 },
    { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
  );

  // STEP 2 - Panda appears from bottom outside
  gsap.fromTo(".hero-panda-center", 
    { scale: 0.75, opacity: 0, y: 400 },
    { scale: 1, opacity: 1, y: 0, duration: 1.4, delay: 0.5, ease: "power4.out" }
  );

  // Removed panda parallax scroll and hover animations as requested
  
  // Glow fade in
  gsap.fromTo(".panda-glow", 
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 1.6, delay: 1.1 }
  );
}

// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initReveals();
  }, 1200);
});
