const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('site-navbar');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

if (navbar) {
  const updateNavbar = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

const billRange = document.getElementById('billRange');
const billValue = document.getElementById('billValue');
const monthlySavings = document.getElementById('monthlySavings');
const paybackYears = document.getElementById('paybackYears');
const twentyYearSavings = document.getElementById('twentyYearSavings');

const nfInt = (v) => Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
const nfFixed = (v, digits = 1) => Number(v).toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const updateCalculator = (value) => {
  const rawMonthly = value * 0.95;
  const monthly = Math.round(rawMonthly / 50) * 50;
  const yearly = monthly * 12;
  const payback = value > 10000 ? 3.5 : 4.2;
  const twenty = yearly * 20;

  // Formatacao consistente: inteiros sem casas, payback com 1 casa
  billValue.textContent = nfInt(value);
  monthlySavings.textContent = nfInt(monthly);
  paybackYears.textContent = nfFixed(payback, 1);
  twentyYearSavings.textContent = nfInt(twenty);
};

if (billRange) {
  updateCalculator(Number(billRange.value));
  billRange.addEventListener('input', (event) => {
    updateCalculator(Number(event.target.value));
  });
}

const stats = Array.from(document.querySelectorAll('.stat-number')).map((el) => ({
  el,
  target: parseInt(el.getAttribute('data-value'), 10) || 0,
  suffix: el.textContent.includes('+') ? '+' : ''
}));

stats.forEach((stat) => {
  let start = 0;
  const increment = Math.max(1, Math.ceil(stat.target / 40));
  const interval = setInterval(() => {
    start += increment;
    if (start >= stat.target) {
      stat.el.textContent = `${stat.target}${stat.suffix}`;
      clearInterval(interval);
    } else {
      stat.el.textContent = `${start}${stat.suffix}`;
    }
  }, 35);
});

/* Ajusta o iframe do hero para sempre cobrir toda a secao (comportamento cover) */
const hero = document.querySelector('.hero');
const heroIframe = document.querySelector('.hero-video-embed iframe');

if (hero && heroIframe) {
  const videoAR = 16 / 9;
  let frame = 0;

  const fitHeroVideo = () => {
    frame = 0;
    const { width, height } = hero.getBoundingClientRect();
    heroIframe.style.width = `${Math.ceil(Math.max(width, height * videoAR))}px`;
    heroIframe.style.height = `${Math.ceil(Math.max(height, width / videoAR))}px`;
  };

  const scheduleFit = () => {
    if (!frame) frame = requestAnimationFrame(fitHeroVideo);
  };

  fitHeroVideo();
  window.addEventListener('resize', scheduleFit, { passive: true });
  window.addEventListener('orientationchange', scheduleFit);

  /* Mantem a capa visivel ate o YouTube avisar que o video esta tocando */
  const heroEmbed = heroIframe.parentElement;
  const showVideo = () => heroEmbed.classList.add('is-playing');
  const fallback = setTimeout(showVideo, 4000);

  window.addEventListener('message', (event) => {
    if (event.source !== heroIframe.contentWindow) return;
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data && data.info && data.info.playerState === 1) {
        clearTimeout(fallback);
        showVideo();
      }
    } catch (e) { /* mensagem que nao e do player */ }
  });

  const listenToPlayer = () => {
    heroIframe.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 'hero', channel: 'widget' }), '*');
  };
  listenToPlayer();
  heroIframe.addEventListener('load', listenToPlayer);
}
