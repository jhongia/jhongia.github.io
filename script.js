const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeButton() {
  if (!themeToggle) return;
  const dark = root.dataset.theme !== 'light';
  themeToggle.textContent = dark ? '☼' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
updateThemeButton();
themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', root.dataset.theme);
  updateThemeButton();
});

const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
function onScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const filters = document.querySelectorAll('.filter');
const skills = document.querySelectorAll('#skillCloud span');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    skills.forEach((skill) => {
      skill.classList.toggle('hidden', selected !== 'all' && skill.dataset.category !== selected);
    });
  });
});

const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }, { passive: true });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
