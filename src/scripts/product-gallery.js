// Product Image Switcher
export function initProductGallery() {
  const mainImg = document.getElementById('product-main-image');
  const thumbs = document.querySelectorAll('.product-thumb-btn');

  if (!mainImg || !thumbs.length) return;

  thumbs.forEach((thumb) => {
    function activate() {
      const targetSrc = thumb.getAttribute('data-full-src');
      const targetAlt = thumb.getAttribute('data-alt');

      if (targetSrc && mainImg) {
        mainImg.setAttribute('src', targetSrc);
        if (targetAlt) {
          mainImg.setAttribute('alt', targetAlt);
        }
      }

      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    }

    thumb.addEventListener('click', activate);
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });
}

