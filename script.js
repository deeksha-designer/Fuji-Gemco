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
const productCurrent = document.querySelector('#product-current');
let productIndex = 0;
let productTimer;

function showProduct(nextIndex, smooth = true) {
  if (!productSlides.length) return;
  productIndex = (nextIndex + productSlides.length) % productSlides.length;
  const slide = productSlides[productIndex];
  productViewport.scrollTo({ left: slide.offsetLeft - document.querySelector('#product-track').offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
  productCurrent.textContent = String(productIndex + 1).padStart(2, '0');
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
const projectCurrent = document.querySelector('#project-current');

function projectStep(direction) {
  const card = projectCards[0];
  if (!card) return;
  projectTrack.scrollBy({ left: direction * (card.getBoundingClientRect().width + 10), behavior: 'smooth' });
}

document.querySelector('.project-next')?.addEventListener('click', () => projectStep(1));
document.querySelector('.project-prev')?.addEventListener('click', () => projectStep(-1));
projectTrack?.addEventListener('scroll', () => {
  const card = projectCards[0];
  if (!card) return;
  const introWidth = document.querySelector('.project-intro').getBoundingClientRect().width + 10;
  const index = Math.max(0, Math.min(projectCards.length - 1, Math.round((projectTrack.scrollLeft - introWidth) / (card.getBoundingClientRect().width + 10))));
  projectCurrent.textContent = String(index + 1).padStart(2, '0');
}, { passive: true });

const industryImage = document.querySelector('#industry-image');
const industryName = document.querySelector('#industry-name');
const industryCopy = document.querySelector('#industry-copy');
const industryCount = document.querySelector('#industry-count');
const industryCarousel = document.querySelector('.industry-carousel');
const industrySlide = document.querySelector('.industry-slide');
const industryProgress = [...document.querySelectorAll('.industry-progress i')];
const industryData = [
  { image: 'assets/industry-hot.webp', name: 'Hot Rolling Mills', alt: 'Hot rolling mill', copy: 'Speed synchronization, tension control and process visibility for demanding long-product mills.' },
  { image: 'assets/industry-cold.webp', name: 'Cold Rolling Mills', alt: 'Cold rolling mill', copy: 'Accurate strip control and coordinated automation for quality-focused cold rolling operations.' },
  { image: 'assets/industry-strip.webp', name: 'Hot Strip Mills', alt: 'Hot strip mill', copy: 'Responsive control architecture for high-throughput, tightly synchronized strip processing.' },
  { image: 'assets/industry-sugar.webp', name: 'Sugar Mills', alt: 'Sugar processing mill', copy: 'Reliable drive and process control for continuous, seasonal and energy-intensive operations.' },
  { image: 'assets/industry-paper.webp', name: 'Paper Mills', alt: 'Paper production mill', copy: 'Coordinated sectional drives and automation for consistent web handling and quality.' },
  { image: 'assets/industry-power.webp', name: 'Power Distribution', alt: 'Industrial low-voltage power distribution panels', copy: 'MCC and PCC systems for safe, intelligent industrial power management.' },
  { image: 'assets/industry-print.webp', name: 'Printing & Packaging', alt: 'Industrial printing and packaging line', copy: 'Precise speed, tension and motion control for high-output converting lines.' }
];
let industryIndex = 0;
let industryTimer;
let industrySwapTimer;

industryData.forEach(({ image }) => { const preload = new Image(); preload.src = image; });

function renderIndustry(nextIndex) {
  industryIndex = (nextIndex + industryData.length) % industryData.length;
  const industry = industryData[industryIndex];
  window.clearTimeout(industrySwapTimer);
  industrySlide.classList.add('is-changing');
  industrySwapTimer = window.setTimeout(() => {
    industryImage.src = industry.image;
    industryImage.alt = industry.alt;
    industryName.textContent = industry.name;
    industryCopy.textContent = industry.copy;
    industryCount.textContent = `${String(industryIndex + 1).padStart(2, '0')} / ${String(industryData.length).padStart(2, '0')}`;
    industryProgress.forEach((dot, index) => dot.classList.toggle('active', index === industryIndex));
    industrySlide.classList.remove('is-changing');
  }, 220);
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
  '.industry-head', '.industry-carousel', '.why-showcase-head', '.why-strengths article',
  '.project-intro', '.project-card', '.clients-heading', '.resources-title',
  '.insight-feature', '.insight-list > a', '.contact-panel', '.footer-links > div'
];

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

