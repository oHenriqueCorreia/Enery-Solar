const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('site-navbar');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

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

const statNumbers = document.querySelectorAll('.stat-number');
const stats = Array.from(statNumbers).map((el) => {
  const target = parseInt(el.getAttribute('data-value'), 10) || 0;
  const suffix = el.textContent.includes('+') ? '+' : '';
  return {
    el,
    target,
    suffix
  };
});

const animateStats = () => {
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
};

window.addEventListener('load', animateStats);

/* Ajusta o iframe do hero para sempre cobrir toda a secao (comportamento cover) */
function fitHeroVideo() {
  const wrapper = document.querySelector('.hero-video-embed');
  const iframe = wrapper ? wrapper.querySelector('iframe') : null;
  const hero = document.querySelector('.hero');
  if (!wrapper || !iframe || !hero) return;

  const rect = hero.getBoundingClientRect();
  const containerW = rect.width;
  const containerH = rect.height;
  const videoAR = 16 / 9;

  // Calcular dimensoes para cobrir completamente o container
  const neededWidth = Math.max(containerW, containerH * videoAR);
  const neededHeight = Math.max(containerH, containerW / videoAR);

  iframe.style.width = `${Math.ceil(neededWidth)}px`;
  iframe.style.height = `${Math.ceil(neededHeight)}px`;
  iframe.style.position = 'absolute';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.transform = 'translate(-50%, -50%)';

  // Marcar full-hd quando a viewport permitir
  if (window.innerWidth >= 1920 || window.innerHeight >= 1080) {
    wrapper.classList.add('full-hd');
  } else {
    wrapper.classList.remove('full-hd');
  }
}

window.addEventListener('load', fitHeroVideo);
window.addEventListener('resize', fitHeroVideo);
window.addEventListener('orientationchange', fitHeroVideo);
