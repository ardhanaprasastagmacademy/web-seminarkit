// Mobile Drawer Menu Navigation
export function initMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const scrim = document.getElementById('drawer-scrim');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!menuBtn || !drawer || !scrim) return;

  function openMenu() {
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    scrim.classList.add('is-visible');
    drawer.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    
    // Focus close button
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  function closeMenu() {
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-visible');
    drawer.setAttribute('inert', '');
    document.body.style.overflow = '';
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  scrim.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Keyboard navigation & Focus Trap
  document.addEventListener('keydown', (e) => {
    if (menuBtn.getAttribute('aria-expanded') !== 'true') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusableEls = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

