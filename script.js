function initializeNavigation() {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  button.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
  });
  links.addEventListener('click', () => {
    links.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'Menu';
  });
}

function initializePageOrder() {
  const main = document.querySelector('#main');
  if (!main) return;
  const sections = [
    document.querySelector('#top'),
    document.querySelector('#work'),
    document.querySelector('#projects'),
    document.querySelector('#skills'),
    document.querySelector('#archive'),
    document.querySelector('#about'),
    document.querySelector('#main > .education'),
    document.querySelector('#recognition'),
    document.querySelector('#contact'),
  ];
  sections.filter(Boolean).forEach((section) => main.appendChild(section));

  if (window.location.hash) {
    const scrollToInitialSection = () => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    };
    window.requestAnimationFrame(scrollToInitialSection);
    window.addEventListener('load', scrollToInitialSection, { once: true });
  }
}

function initializeReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function initializeSkillsSlider() {
  const track = document.querySelector('#skills-track');
  const tabs = [...document.querySelectorAll('[data-skill-slide]')];
  const position = document.querySelector('#skills-position');
  const section = track?.closest('.skills-section');
  if (!track || !tabs.length) return;
  let active = 0;
  let autoTimer = null;
  let sectionVisible = !('IntersectionObserver' in window);
  let pointerInside = false;
  let focusInside = false;
  let touching = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const stopAutoScroll = () => {
    window.clearTimeout(autoTimer);
    autoTimer = null;
  };

  const scheduleAutoScroll = () => {
    stopAutoScroll();
    if (reducedMotion.matches || !sectionVisible || pointerInside || focusInside || touching || document.hidden) return;
    autoTimer = window.setTimeout(() => {
      show(active + 1);
      scheduleAutoScroll();
    }, 5000);
  };

  const show = (index) => {
    active = (index + tabs.length) % tabs.length;
    track.style.transform = `translate3d(-${active * 100}%, 0, 0)`;
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === active;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    position.textContent = `${String(active + 1).padStart(2, '0')} — ${String(tabs.length).padStart(2, '0')}`;
    const tabsContainer = tabs[active].parentElement;
    const centeredLeft = tabs[active].offsetLeft - (tabsContainer.clientWidth - tabs[active].offsetWidth) / 2;
    tabsContainer.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    show(Number(tab.dataset.skillSlide));
    scheduleAutoScroll();
  }));
  document.querySelector('#skills-prev')?.addEventListener('click', () => {
    show(active - 1);
    scheduleAutoScroll();
  });
  document.querySelector('#skills-next')?.addEventListener('click', () => {
    show(active + 1);
    scheduleAutoScroll();
  });

  let touchStart = 0;
  track.addEventListener('touchstart', (event) => {
    touching = true;
    touchStart = event.touches[0].clientX;
    stopAutoScroll();
  }, { passive: true });
  track.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(active + (distance < 0 ? 1 : -1));
    touching = false;
    scheduleAutoScroll();
  }, { passive: true });

  section?.addEventListener('pointerenter', () => {
    pointerInside = true;
    stopAutoScroll();
  });
  section?.addEventListener('pointerleave', () => {
    pointerInside = false;
    scheduleAutoScroll();
  });
  section?.addEventListener('focusin', () => {
    focusInside = true;
    stopAutoScroll();
  });
  section?.addEventListener('focusout', () => {
    window.setTimeout(() => {
      focusInside = section.contains(document.activeElement);
      scheduleAutoScroll();
    }, 0);
  });
  document.addEventListener('visibilitychange', scheduleAutoScroll);

  if ('IntersectionObserver' in window && section) {
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      sectionVisible = entry.isIntersecting;
      scheduleAutoScroll();
    }, { threshold: 0.2 });
    visibilityObserver.observe(section);
  }

  show(0);
  scheduleAutoScroll();
}

function initializeCustomCursor() {
  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reducedMotion.matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor-orbit';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor-ring"></span><span class="cursor-dot"></span>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  const ring = cursor.querySelector('.cursor-ring');
  const dot = cursor.querySelector('.cursor-dot');
  let pointerX = -100;
  let pointerY = -100;
  let ringX = -100;
  let ringY = -100;

  const animate = () => {
    ringX += (pointerX - ringX) * 0.16;
    ringY += (pointerY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
    cursor.classList.add('is-visible');
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a, button, [role="button"]')));
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
  window.addEventListener('blur', () => cursor.classList.remove('is-visible'));

  animate();
}

function initializeProjectRoles() {
  const tabs = [...document.querySelectorAll('[data-project-role]')];
  const panels = [...document.querySelectorAll('[data-role-panel]')];
  const container = document.querySelector('.role-project-groups');
  if (!tabs.length || !panels.length || !container) return;

  const panelFor = (role) => panels.find((panel) => panel.dataset.rolePanel === role);
  tabs.forEach((tab) => {
    const panel = panelFor(tab.dataset.projectRole);
    if (!panel) return;
    panel.id = `role-panel-${tab.dataset.projectRole}`;
    tab.setAttribute('aria-controls', panel.id);
    container.appendChild(panel);
  });

  const showRole = (role) => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.projectRole === role;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.rolePanel === role;
      panel.hidden = !selected;
      if (selected) panel.classList.add('visible');
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showRole(tab.dataset.projectRole));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      next.focus();
      showRole(next.dataset.projectRole);
    });
  });

  showRole(tabs.find((tab) => tab.classList.contains('active'))?.dataset.projectRole || tabs[0].dataset.projectRole);
}

window.addEventListener('DOMContentLoaded', () => {
  initializePageOrder();
  initializeNavigation();
  initializeReveals();
  initializeProjectRoles();
  initializeCustomCursor();
});
