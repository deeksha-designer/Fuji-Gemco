const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 16), { passive: true });

const exploreToggle = document.querySelector('.explore-toggle');
const menuButton = document.querySelector('.abb-menu');
const explorePanel = document.querySelector('.explore-panel');

function setNavigation(open) {
  explorePanel.classList.toggle('open', open);
  explorePanel.setAttribute('aria-hidden', String(!open));
  exploreToggle.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('nav-open', open);
}

[exploreToggle, menuButton].forEach((control) => {
  control.addEventListener('click', () => setNavigation(!explorePanel.classList.contains('open')));
});
explorePanel.addEventListener('click', (event) => {
  if (event.target.closest('a')) setNavigation(false);
});

const heroVideo = document.querySelector('.abb-hero-video');
const videoToggle = document.querySelector('.video-toggle');
videoToggle.addEventListener('click', async () => {
  if (heroVideo.paused) {
    await heroVideo.play();
  } else {
    heroVideo.pause();
  }
  const paused = heroVideo.paused;
  videoToggle.classList.toggle('is-paused', paused);
  videoToggle.setAttribute('aria-pressed', String(paused));
  videoToggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
});

const productCarousel = document.querySelector('.product-carousel');
const productViewport = document.querySelector('.product-carousel-viewport');
const productSlides = [...document.querySelectorAll('.product-slide')];
let productIndex = 0;
let productTimer;

function showProduct(nextIndex, smooth = true) {
  if (!productSlides.length) return;
  productIndex = (nextIndex + productSlides.length) % productSlides.length;
  const slide = productSlides[productIndex];
  productViewport.scrollTo({ left: slide.offsetLeft - document.querySelector('#product-track').offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
}

function startProductAutoplay() {
  window.clearInterval(productTimer);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  productTimer = window.setInterval(() => showProduct(productIndex + 1), 4800);
}

document.querySelector('.product-prev')?.addEventListener('click', () => { showProduct(productIndex - 1); startProductAutoplay(); });
document.querySelector('.product-next')?.addEventListener('click', () => { showProduct(productIndex + 1); startProductAutoplay(); });
productCarousel?.addEventListener('mouseenter', () => window.clearInterval(productTimer));
productCarousel?.addEventListener('mouseleave', startProductAutoplay);
productCarousel?.addEventListener('focusin', () => window.clearInterval(productTimer));
productCarousel?.addEventListener('focusout', startProductAutoplay);
productCarousel?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showProduct(productIndex - 1);
  if (event.key === 'ArrowRight') showProduct(productIndex + 1);
});
window.addEventListener('resize', () => showProduct(productIndex, false), { passive: true });
startProductAutoplay();

const projectTrack = document.querySelector('#project-track');
const projectCards = [...document.querySelectorAll('.project-card')];

function projectStep(direction) {
  const card = projectCards[0];
  if (!card) return;
  projectTrack.scrollBy({ left: direction * (card.getBoundingClientRect().width + 10), behavior: 'smooth' });
}

document.querySelector('.project-next')?.addEventListener('click', () => projectStep(1));
document.querySelector('.project-prev')?.addEventListener('click', () => projectStep(-1));
const industryCarousel = document.querySelector('.industry-card-carousel');
const industryTrack = document.querySelector('.industry-card-track');
const industryCards = [...document.querySelectorAll('.industry-card')];
let industryIndex = 0;
let industryTimer;

function renderIndustry(nextIndex) {
  if (!industryCards.length) return;
  industryIndex = (nextIndex + industryCards.length) % industryCards.length;
  const card = industryCards[industryIndex];
  industryTrack.scrollTo({ left: card.offsetLeft - industryTrack.offsetLeft, behavior: 'smooth' });
}

function startIndustryAutoplay() {
  window.clearInterval(industryTimer);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  industryTimer = window.setInterval(() => renderIndustry(industryIndex + 1), 5200);
}

document.querySelector('.industry-prev')?.addEventListener('click', () => {
  renderIndustry(industryIndex - 1);
  startIndustryAutoplay();
});
document.querySelector('.industry-next')?.addEventListener('click', () => {
  renderIndustry(industryIndex + 1);
  startIndustryAutoplay();
});
industryCarousel?.addEventListener('mouseenter', () => window.clearInterval(industryTimer));
industryCarousel?.addEventListener('mouseleave', startIndustryAutoplay);
industryCarousel?.addEventListener('focusin', () => window.clearInterval(industryTimer));
industryCarousel?.addEventListener('focusout', startIndustryAutoplay);
industryCarousel?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') renderIndustry(industryIndex - 1);
  if (event.key === 'ArrowRight') renderIndustry(industryIndex + 1);
});
document.addEventListener('visibilitychange', () => document.hidden ? window.clearInterval(industryTimer) : startIndustryAutoplay());
startIndustryAutoplay();

const searchModal = document.querySelector('.search-modal');
function closeSearch() {
  searchModal.classList.remove('open');
  searchModal.setAttribute('aria-hidden', 'true');
}
document.querySelector('.search-open').addEventListener('click', () => {
  searchModal.classList.add('open');
  searchModal.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => document.querySelector('#site-search').focus(), 80);
});
document.querySelector('.search-close').addEventListener('click', closeSearch);
searchModal.addEventListener('click', (event) => {
  if (event.target === searchModal) closeSearch();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSearch();
    setNavigation(false);
  }
});

const revealGroups = [
  '.about-abb-panel', '.product-heading', '.product-slide',
  '.trust-stats > div', '.industry-head', '.industry-card-carousel', '.why-showcase-head', '.why-strengths article',
  '.project-intro', '.project-card', '.clients-heading', '.resources-title',
  '.insight-feature', '.insight-list > a', '.contact-panel', '.footer-links > div'
];

const clientLogoTrack = document.querySelector('#client-logo-track');
const clientLogos = [
  'AC.webp','ALMS.webp','Amba-1.webp','Amit-1.webp','Ankur-1.webp','Arkan-1.webp','Arti.webp','Axiom.webp','Bhaskar.webp','BHEL-1.webp','Dadiji.webp','Devki-1.webp','Electrotherm-1.webp','gailant-1.webp','gaj-kesari-1.webp','Guardian.webp','HMB.webp','Icon-Steel-1.webp','Isteel.webp','jai-bharat-1.webp','jai-laxmi.webp','Jai-Shakti-1.webp','JSW-1.webp','Kamdhenu-1.webp','mahamaya.webp','Metaroll-1.webp','mono-1.webp','Pushpit-1.webp','quantum-1.webp','R-group.webp','Radhe-1.webp','Rarusaria.webp','Rathi-1.webp','Sail-1.webp','Sangam-1.webp','Satarwire.webp','SBF.webp','Shakambhari-1.webp','Shreeyam-1.webp','Shri-bajrang.webp','SJSPL-1.webp','Star-tmt.webp','Sunvik-1.webp','Watania-1.webp','Wed.webp'
];

if (clientLogoTrack) {
  [...clientLogos, ...clientLogos].forEach((file, index) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const clientName = file.replace(/-1|\.webp/gi, '').replace(/-/g, ' ');
    image.src = `assets/clients-all/${file}`;
    image.alt = index < clientLogos.length ? `${clientName} client logo` : '';
    image.loading = 'lazy';
    if (index >= clientLogos.length) figure.setAttribute('aria-hidden', 'true');
    figure.appendChild(image);
    clientLogoTrack.appendChild(figure);
  });
}

const statisticNumbers = [...document.querySelectorAll('.trust-stats b[data-count]')];

function animateStatistic(number) {
  if (number.dataset.animated === 'true') return;
  number.dataset.animated = 'true';
  const target = Number(number.dataset.count);
  const suffix = number.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    number.textContent = `${Math.round(target * eased).toLocaleString('en-IN')}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  statisticNumbers.forEach((number) => {
    number.textContent = `${Number(number.dataset.count).toLocaleString('en-IN')}${number.dataset.suffix || ''}`;
  });
} else if ('IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      statisticNumbers.forEach(animateStatistic);
      observer.unobserve(entry.target);
    });
  }, { threshold: .45 });
  const statsBand = document.querySelector('.trust-stats');
  if (statsBand) statsObserver.observe(statsBand);
} else {
  statisticNumbers.forEach(animateStatistic);
}

const revealItems = [...document.querySelectorAll(revealGroups.join(','))];
revealItems.forEach((item, index) => {
  item.dataset.reveal = '';
  item.dataset.revealDelay = String(index % 4);
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -45px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

