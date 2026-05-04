// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile Menu Toggle
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
if (burger && mainNav) {
  burger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    burger.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
  });
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section h2, .section h3, .card, .gallery figure, .detail-item, .senior-contact-form-wrapper, .senior-map-container').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

// Contact form
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.phone || !data.message) {
      if (msg) {
        msg.textContent = 'Veuillez remplir tous les champs obligatoires.';
        msg.className = 'form-feedback error';
      }
      return;
    }
    if (msg) {
      msg.textContent = 'Merci ' + data.name + ', votre demande a bien été reçue. Nous vous recontactons rapidement.';
      msg.className = 'form-feedback success';
    }
    form.reset();
  });
}

// Google Reviews Slider Logic
const slider = document.getElementById('reviewsSlider');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');

if (slider && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = slider.querySelector('.review-card');
    return card ? card.offsetWidth + 20 : 300;
  };

  nextBtn.addEventListener('click', () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= maxScroll - 5) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (slider.scrollLeft <= 5) {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  });

  slider.addEventListener('scroll', () => {
    prevBtn.style.opacity = '1';
    prevBtn.style.pointerEvents = 'auto';
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
  });
}

// WhatsApp Widget Logic
const whatsappTrigger = document.getElementById('whatsappTrigger');
const whatsappChat = document.getElementById('whatsappChat');
const chatClose = document.getElementById('chatClose');

if (whatsappTrigger && whatsappChat) {
  whatsappTrigger.addEventListener('click', () => {
    whatsappChat.classList.toggle('active');
    if (whatsappChat.classList.contains('active')) {
      whatsappTrigger.style.transform = 'scale(0)';
      setTimeout(() => {
        whatsappTrigger.style.display = 'none';
      }, 300);
    }
  });
}

if (chatClose && whatsappChat && whatsappTrigger) {
  chatClose.addEventListener('click', () => {
    whatsappChat.classList.remove('active');
    whatsappTrigger.style.display = 'flex';
    setTimeout(() => {
      whatsappTrigger.style.transform = 'scale(1)';
    }, 10);
  });
}