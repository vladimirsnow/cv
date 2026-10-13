/* ==========================================================================
   EXECUTIVE CV JAVASCRIPT
   Interactivity, Theme Control, Copying, Skills Filtering & Scroll-To-Top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopyButtons();
  initSkillsFilter();
  initScrollToTop();
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
 * Interactive Real-Time Skills Filter
 */
function initSkillsFilter() {
  const filterInput = document.getElementById('skills-filter');
  const skillsContainer = document.getElementById('skills-container');
  const skillsCount = document.getElementById('skills-count');
  
  if (!filterInput || !skillsContainer) return;

  const skillTags = skillsContainer.querySelectorAll('.skill-tag');
  const totalSkills = skillTags.length;

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
