/* ==========================================================================
   EXECUTIVE CV JAVASCRIPT
   Interactivity, Theme Control, Copying, Skills Filtering & Scroll-To-Top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopyButtons();
  initSkillsFilter();
  initScrollToTop();
  initPhotoGallery();
});

/**
 * Theme Switcher (Dark / Light Mode)
 * Strictly black, white, and grayscale across both themes
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('executive_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('executive_theme', newTheme);
    });
  }
}

/**
 * Copy to Clipboard with Toast Notification
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Скопировано: ${textToCopy}`);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Скопировано: ${textToCopy}`);
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/**
 * Executive Photo Gallery & Lightbox Modal
 */
function initPhotoGallery() {
  const mainImg = document.getElementById('main-profile-img');
  const switchBtns = document.querySelectorAll('.photo-switch-btn');
  const photoContainer = document.getElementById('profile-photo-container');
  const zoomBtn = document.getElementById('btn-photo-zoom');
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('photo-modal-img');
  const modalCaption = document.getElementById('photo-modal-caption');
  const modalClose = document.getElementById('photo-modal-close');
  const modalBackdrop = document.getElementById('photo-modal-backdrop');

  if (!mainImg || switchBtns.length === 0) return;

  const photoTitles = {
    '1': 'Медетбеков Джафар Дабырович — Официальный портрет (Портрет 1)',
    '2': 'Медетбеков Джафар Дабырович — Официальный портрет (Портрет 2)'
  };

  // Switch photo
  switchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetSrc = btn.getAttribute('data-img');
      const targetIndex = btn.getAttribute('data-index') || '1';
      if (!targetSrc) return;

      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = targetSrc;
        mainImg.style.opacity = '1';
      }, 120);
    });
  });

  // Open modal lightbox
  function openLightbox() {
    if (!modal || !modalImg) return;
    const currentSrc = mainImg.src;
    modalImg.src = currentSrc;
    const activeBtn = document.querySelector('.photo-switch-btn.active');
    const idx = activeBtn ? activeBtn.getAttribute('data-index') : '1';
    if (modalCaption) {
      modalCaption.textContent = photoTitles[idx] || 'Медетбеков Джафар Дабырович';
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (photoContainer) {
    photoContainer.addEventListener('click', openLightbox);
  }

  if (zoomBtn) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox();
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeLightbox);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Interactive Real-Time Skills Filter
 */
function initSkillsFilter() {
  const filterInput = document.getElementById('skills-filter');
  const skillsContainer = document.getElementById('skills-container');
  const skillsCount = document.getElementById('skills-count');
  
  if (!filterInput || !skillsContainer) return;

  const skillTags = skillsContainer.querySelectorAll('.skill-tag');
  const totalSkills = skillTags.length;

  if (skillsCount) {
    skillsCount.textContent = `(${totalSkills} навыков)`;
  }

  filterInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    let visibleCount = 0;

    skillTags.forEach(tag => {
      const text = tag.textContent.toLowerCase();
      if (text.includes(query)) {
        tag.classList.remove('hidden');
        if (query.length > 0) {
          tag.classList.add('highlighted');
        } else {
          tag.classList.remove('highlighted');
        }
        visibleCount++;
      } else {
        tag.classList.add('hidden');
        tag.classList.remove('highlighted');
      }
    });

    if (skillsCount) {
      if (query.length > 0) {
        skillsCount.textContent = `(${visibleCount} из ${totalSkills})`;
      } else {
        skillsCount.textContent = `(${totalSkills} навыков)`;
      }
    }
  });
}

/**
 * Floating Scroll-To-Top Button
 */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 280) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
