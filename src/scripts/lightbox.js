// Lightbox component script
export function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const imgEl = modal.querySelector('.lightbox-image');
  const counterEl = modal.querySelector('.lightbox-counter');
  const closeBtn = modal.querySelector('.lightbox-close');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');
  const scrim = modal.querySelector('.lightbox-scrim');

  const triggers = document.querySelectorAll('[data-lightbox-trigger]');
  if (!triggers.length) return;

  const items = Array.from(triggers).map(trig => ({
    src: trig.getAttribute('data-full-src') || trig.getAttribute('href'),
    alt: trig.getAttribute('data-alt') || 'Foto galeri Seminarkit'
  }));

  let currentIndex = 0;
  let lastActiveElement = null;

  function showImage(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;

    imgEl.src = items[currentIndex].src;
    imgEl.alt = items[currentIndex].alt;
    counterEl.textContent = `${currentIndex + 1} / ${items.length}`;
  }

  function openLightbox(index) {
    lastActiveElement = document.activeElement;
    showImage(index);
    modal.classList.add('is-active');
    modal.removeAttribute('inert');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    modal.classList.remove('is-active');
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  triggers.forEach((trig, idx) => {
    trig.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (scrim) scrim.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  // Keyboard navigation & Focus trap
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showImage(currentIndex - 1);
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      showImage(currentIndex + 1);
      return;
    }

    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showImage(currentIndex - 1);
      } else {
        showImage(currentIndex + 1);
      }
    }
  }
}

