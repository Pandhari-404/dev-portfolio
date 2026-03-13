/* Year */
document.getElementById('yr').textContent = new Date().getFullYear();

/* Navbar scroll */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50));

/* Navbar links */
const sections = document.querySelectorAll('section');
const linkObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (e.isIntersecting) {
      document.querySelector(`.nav-link[href="#${e.target.id}"]`).classList.add('active');
    }
  });
}, { rootMargin: '-38% 0px -55% 0px' });
sections.forEach(s => linkObs.observe(s));

/* Reveal on scroll */
const reveals = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => revObs.observe(r));

/* Skill bars */
const fills = document.querySelectorAll('.skill-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(f => barObs.observe(f));

/* Back to top */
const btn = document.getElementById('backTop');
window.addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 400));
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Mobile nav: close on link click */
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  const collapse = document.getElementById('navContent');
  if (collapse.classList.contains('show'))
    bootstrap.Collapse.getInstance(collapse)?.hide();
}));

/* Form submission */
var form = document.getElementById("my-form");
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your message! I'll get back to you soon.";
      form.reset();
    } else {
      status.innerHTML = "Oops! There was a problem sending your message.";
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem sending your message.";
  });
}
form.addEventListener("submit", handleSubmit);