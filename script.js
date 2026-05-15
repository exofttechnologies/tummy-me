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
  // Red glassmorphic header for non-home pages on mobile
  if (page === 'home') {
    document.body.classList.remove('page-red-header');
  } else {
    document.body.classList.add('page-red-header');
  }
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
  document.querySelectorAll('.section-title, .section-subtitle, .about-feature, .contact-card, .menu-tab, .testimonial-card, .why-card, .benefit-card, .footer-col, .footer-brand').forEach(el => {
      el.classList.add('reveal');
  });

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
function filterMenu(cat, e) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  if (e && e.target) e.target.classList.add('active');
  
  // Show/hide cards
  document.querySelectorAll('#menuGrid .menu-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
    card.style.setProperty('display', show ? '' : 'none', 'important');
  });
  
  // Show/hide category headers
  document.querySelectorAll('#menuGrid .menu-cat-header').forEach(header => {
    const show = cat === 'all' || header.dataset.cat === cat;
    header.style.setProperty('display', show ? '' : 'none', 'important');
  });

  // Scroll to the first visible category header or the menu grid
  setTimeout(() => {
    let scrollTarget;
    if (cat !== 'all') {
      scrollTarget = document.getElementById('cat-' + cat);
    } else {
      scrollTarget = document.getElementById('menuGrid');
    }
    if (scrollTarget) {
      const offset = 100;
      const y = scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 100);
}

// Form handlers
function handleFranchise(e) {
  e.preventDefault();
  const name = document.getElementById('franchiseName').value.trim();
  const phone = document.getElementById('franchisePhone').value.trim();
  const msg = document.getElementById('franchiseMsg').value.trim();
  const text = `*Franchise Inquiry - Tummy & Me*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Message:* ${encodeURIComponent(msg)}`;
  window.open(`https://wa.me/917012090251?text=${text}`, '_blank');
  e.target.reset();
}
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const msg = document.getElementById('contactMsg').value.trim();
  const text = `*Contact Us - Tummy & Me*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Message:* ${encodeURIComponent(msg)}`;
  window.open(`https://wa.me/917012090251?text=${text}`, '_blank');
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
    const imgHtml = imgSrc
      ? '<div class="card-img-area">' +
          '<img src="' + imgSrc + '" alt="' + imgAlt + '">' +
          '<span class="card-price-badge">' + price + '</span>' +
        '</div>'
      : '<div class="card-img-area" style="aspect-ratio:auto;height:60px;display:flex;align-items:center;justify-content:flex-end;padding-right:20px;background:transparent">' +
          '<span class="card-price-badge">' + price + '</span>' +
        '</div>';

    card.innerHTML =
      '<div class="card-body">' +
        '<h3 class="card-title">' + title + '</h3>' +
        (desc ? '<p class="card-desc">' + desc + '</p>' : '') +
        '<div class="card-dots"><span></span><span></span><span></span></div>' +
      '</div>' +
      imgHtml;
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
  
  // Hero background image — scale up and fade in (desktop)
  gsap.fromTo(".hero-bg-img", 
    { scale: 1.15, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
  );

  // About Us button fade in (desktop)
  gsap.fromTo(".hero-about-btn", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: "power3.out" }
  );

  // Mobile hero content text
  gsap.fromTo(".hero-mobile-content h2", 
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
  );

  // Mobile panda — slides up from bottom
  gsap.fromTo(".hero-panda-mobile", 
    { y: 200, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: "power4.out" }
  );

  // Mobile fries — bounces in from the right
  gsap.fromTo(".hero-fries-mobile", 
    { x: 150, opacity: 0, scale: 0.6 },
    { x: 0, opacity: 1, scale: 1, duration: 1.0, delay: 0.8, ease: "back.out(1.7)" }
  );

  // Mobile features bar
  gsap.fromTo(".hero-mobile-features", 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
  );
}

// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
    initReveals();
  }, 200);
});
