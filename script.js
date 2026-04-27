// Page Navigation
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initReveals();
}

// Mobile Menu
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
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
    if (show) { card.classList.remove('visible'); setTimeout(() => card.classList.add('visible'), 50); }
  });
  
  // Reset carousel to first visible item
  activeIndex = 0;
  updateCarousel();
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
const cardBgPalette = ['#EFE0D0','#E8D5C4','#DDD0C8','#F0E0CC','#E5D8CB','#EDE0D5','#E0D5CE','#EAD8C8'];

// Transform cards to new clean reference-style design
function transformCards() {
  let idx = 0;
  document.querySelectorAll('.menu-card').forEach(card => {
    const titleEl  = card.querySelector('.menu-card-title');
    const descEl   = card.querySelector('.menu-card-desc');
    const imgEl    = card.querySelector('.menu-card-img-container img');
    const pills    = card.querySelectorAll('.stat-pill span');
    if (!titleEl || !pills.length) return;

    const title  = titleEl.textContent.trim();
    const desc   = descEl ? descEl.textContent.trim() : '';
    const price  = pills[0].textContent.trim();
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const imgAlt = imgEl ? imgEl.getAttribute('alt') : title;
    const bg     = cardBgPalette[idx % cardBgPalette.length];
    idx++;

    const tags = [];
    card.querySelectorAll('.menu-card-tags span').forEach(t => {
      const txt = t.textContent.trim();
      tags.push(txt === 'Popular' ? 'Bestseller' : txt);
    });

    // Rebuild entire card inner HTML
    card.innerHTML =
      '<div class="menu-card-img-area" style="background:' + bg + '">' +
        '<span class="menu-card-price-badge">' + price + '</span>' +
        '<img src="' + imgSrc + '" alt="' + imgAlt + '">' +
      '</div>' +
      '<div class="menu-card-content">' +
        '<div class="menu-card-name-row">' +
          '<h3 class="menu-card-title">' + title + '</h3>' +
          '<button class="menu-card-order-link" onclick="showPage(\'menu\')">Order Now</button>' +
        '</div>' +
        '<div class="menu-card-tags">' +
          tags.map(t => '<span>' + t + '</span>').join('') +
        '</div>' +
      '</div>';
      
    // Carousel click listener
    card.addEventListener('click', () => {
        const visibleCards = Array.from(document.querySelectorAll('.menu-card')).filter(c => c.style.display !== 'none');
        const idx = visibleCards.indexOf(card);
        if(idx !== -1 && activeIndex !== idx) {
            activeIndex = idx;
            updateCarousel();
        }
    });
  });
  
  // Init carousel
  setTimeout(() => {
    updateCarousel();
    
    // Add arrows if not present
    if (!document.querySelector('.carousel-arrows')) {
        const arrowHtml = '<div class="carousel-arrows mobile-only"><button id="btnPrev">&#8592;</button><button id="btnNext">&#8594;</button></div>';
        document.querySelector('.menu-grid').insertAdjacentHTML('afterend', arrowHtml);
        
        document.getElementById('btnPrev').addEventListener('click', () => {
            activeIndex = Math.max(0, activeIndex - 1);
            updateCarousel();
        });
        
        document.getElementById('btnNext').addEventListener('click', () => {
            const maxIdx = Array.from(document.querySelectorAll('.menu-card')).filter(c => c.style.display !== 'none').length - 1;
            activeIndex = Math.min(maxIdx, activeIndex + 1);
            updateCarousel();
        });
    }
  }, 100);
}

let activeIndex = 1;
function updateCarousel() {
    const cards = Array.from(document.querySelectorAll('.menu-card')).filter(c => c.style.display !== 'none');
    if (activeIndex >= cards.length) activeIndex = Math.max(0, cards.length - 1);
    
    cards.forEach((card, index) => {
        const offset = index - activeIndex;
        
        if (offset === 0) {
            // Center / Active Card
            card.style.transform = `translateX(0) scale(1)`;
            card.style.filter = `blur(0px)`;
            card.style.opacity = `1`;
            card.style.zIndex = `10`;
        } else {
            // Inactive Cards (Left or Right)
            const direction = offset > 0 ? 1 : -1;
            const distance = 240 * direction + (offset * 20); 
            
            card.style.transform = `translateX(${distance}px) scale(0.85)`;
            card.style.filter = `blur(6px)`;
            card.style.opacity = `0.7`;
            card.style.zIndex = `5`;
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  transformCards();
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
