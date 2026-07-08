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
  const monthly = Math.round(value * 0.95);
  const yearly = monthly * 12;
  const payback = value > 10000 ? 3.5 : 4.2;
  const twenty = yearly * 20;

  // Formatação consistente: inteiros sem casas, payback com 1 casa
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
const stats = Array.from(statNumbers).map((el, index) => ({
  el,
  target: index === 0 ? 780 : 2018,
  suffix: index === 0 ? '+' : ''
}));

const animateStats = () => {
  stats.forEach((stat, index) => {
    let start = index === 1 ? 2000 : 0;
    const increment = Math.ceil((stat.target - start) / 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= stat.target) {
        stat.el.textContent = `${stat.target}${stat.suffix}`;
        clearInterval(interval);
      } else {
        stat.el.textContent = `${start}${stat.suffix}`;
      }
    }, 33);
  });
};

window.addEventListener('load', animateStats);
