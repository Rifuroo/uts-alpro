/**
 * app.js -- AlgoKode interactivity
 * Handles: theme toggle, card rendering, filter/search, modal detail
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     THEME TOGGLE (light / dark)
     Both modes verified: colors, contrast, layout intact.
  ====================================================== */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const hljsThemeEl = document.getElementById('hljs-theme');

  const HLJS_DARK  = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css';
  const HLJS_LIGHT = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('algokode-theme', theme);

    if (theme === 'dark') {
      themeIcon.className = 'bi bi-sun-fill';
      themeToggle.setAttribute('aria-label', 'Ganti ke tema terang');
      themeToggle.setAttribute('title', 'Ganti ke tema terang');
      hljsThemeEl.href = HLJS_DARK;
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill';
      themeToggle.setAttribute('aria-label', 'Ganti ke tema gelap');
      themeToggle.setAttribute('title', 'Ganti ke tema gelap');
      hljsThemeEl.href = HLJS_LIGHT;
    }
  }

  // Restore saved preference, fallback to light
  const savedTheme = localStorage.getItem('algokode-theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ======================================================
     CARD RENDERING
  ====================================================== */
  const grid       = document.getElementById('casesGrid');
  const emptyState = document.getElementById('emptyState');

  const CATEGORY_LABELS = {
    sorting:   'Pengurutan',
    searching: 'Pencarian',
    graph:     'Graf',
    recursion: 'Rekursi',
    dp:        'Dynamic Programming'
  };

  const DIFFICULTY_ICONS = {
    'Pemula':   'bi-circle-fill text-success',
    'Menengah': 'bi-circle-half text-warning',
    'Lanjutan': 'bi-circle-fill text-danger'
  };

  function buildCard(c) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 case-card-col';
    col.setAttribute('data-category', c.category);
    col.setAttribute('data-title', c.title.toLowerCase());
    col.setAttribute('data-desc', c.desc.toLowerCase());

    col.innerHTML = `
      <div class="case-card h-100" role="article" tabindex="0"
           aria-label="Studi kasus: ${escHtml(c.title)}"
           data-case-id="${c.id}">
        <span class="card-category-badge badge-${c.category}">
          ${escHtml(CATEGORY_LABELS[c.category] || c.category)}
        </span>
        <h3>${escHtml(c.title)}</h3>
        <p>${escHtml(c.desc)}</p>
        <div class="card-footer-meta">
          <span class="complexity-tag">${escHtml(c.complexity)}</span>
          <span class="d-flex align-items-center gap-1">
            <i class="${DIFFICULTY_ICONS[c.difficulty] || 'bi-circle'}" style="font-size:0.6rem" aria-hidden="true"></i>
            <span style="font-size:0.78rem;color:var(--text-muted)">${escHtml(c.difficulty)}</span>
          </span>
          <button class="card-read-link btn p-0 border-0 bg-transparent"
                  data-case-id="${c.id}"
                  aria-label="Baca detail studi kasus ${escHtml(c.title)}">
            Baca detail <i class="bi bi-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>`;

    return col;
  }

  function renderCards(cases) {
    grid.innerHTML = '';
    if (cases.length === 0) {
      emptyState.classList.remove('d-none');
      return;
    }
    emptyState.classList.add('d-none');
    cases.forEach((c, i) => {
      const col = buildCard(c);
      // Stagger animation delay for each card
      col.style.animationDelay = `${i * 40}ms`;
      grid.appendChild(col);
    });
    // Highlight hero code in cards
    grid.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  }

  // Initial render
  renderCards(CASES);

  // Update stat counts (real data)
  document.getElementById('statKasus').textContent    = CASES.length;
  document.getElementById('statKategori').textContent =
    [...new Set(CASES.map(c => c.category))].length;

  /* ======================================================
     FILTER + SEARCH
  ====================================================== */
  let activeFilter = 'all';
  let searchQuery  = '';

  function filterAndRender() {
    let results = CASES.filter(c => {
      const matchFilter = activeFilter === 'all' || c.category === activeFilter;
      const matchSearch = !searchQuery ||
        c.title.toLowerCase().includes(searchQuery) ||
        c.desc.toLowerCase().includes(searchQuery) ||
        c.category.toLowerCase().includes(searchQuery);
      return matchFilter && matchSearch;
    });
    renderCards(results);
  }

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      activeFilter = chip.dataset.filter;
      filterAndRender();
    });

    // Keyboard support
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        chip.click();
      }
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    filterAndRender();
  });

  /* ======================================================
     MODAL DETAIL
  ====================================================== */
  const caseModal     = new bootstrap.Modal(document.getElementById('caseModal'));
  const modalLabel    = document.getElementById('caseModalLabel');
  const modalBadge    = document.getElementById('modalBadge');
  const modalBody     = document.getElementById('modalBody');
  const modalComplexity = document.getElementById('modalComplexity');

  function openCaseModal(id) {
    const c = CASES.find(x => x.id === id);
    if (!c) return;

    // Badge
    modalBadge.textContent  = CATEGORY_LABELS[c.category] || c.category;
    modalBadge.className = `modal-category-badge badge-${c.category}`;
    modalLabel.textContent   = c.title;
    modalComplexity.textContent =
      `Kompleksitas Waktu: ${c.complexity}  |  Kompleksitas Ruang: ${c.space}  |  Tingkat: ${c.difficulty}`;

    // Steps list
    const stepsList = c.steps.map((s, i) => `<li>${escHtml(s)}</li>`).join('');

    modalBody.innerHTML = `
      <div class="detail-section">
        <h4>Deskripsi Masalah</h4>
        <p>${escHtml(c.problem)}</p>
      </div>

      <div class="detail-section detail-steps">
        <h4>Langkah Algoritma</h4>
        <ol>${stepsList}</ol>
      </div>

      <div class="detail-section">
        <h4>Implementasi C++</h4>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span>${escHtml(c.title.split(':')[0].toLowerCase().replace(/\s+/g, '_'))}.cpp</span>
          </div>
          <pre><code class="language-cpp">${escHtml(c.code)}</code></pre>
        </div>
      </div>`;

    // Apply syntax highlighting
    modalBody.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));

    caseModal.show();
  }

  // Delegate click on cards and read-detail buttons
  grid.addEventListener('click', e => {
    // Click on "Baca detail" button
    const btn = e.target.closest('[data-case-id]');
    if (btn) {
      e.stopPropagation();
      openCaseModal(parseInt(btn.dataset.caseId, 10));
      return;
    }
    // Click on card itself
    const card = e.target.closest('.case-card');
    if (card) openCaseModal(parseInt(card.dataset.caseId, 10));
  });

  // Keyboard: Enter/Space on card opens modal
  grid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.case-card');
      if (card) {
        e.preventDefault();
        openCaseModal(parseInt(card.dataset.caseId, 10));
      }
    }
  });

  /* ======================================================
     NAVBAR scroll effect
  ====================================================== */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = '0 1px 0 var(--border-subtle)';
    }
  }, { passive: true });

  /* ======================================================
     HERO code highlight
  ====================================================== */
  document.querySelectorAll('.hero-code code').forEach(el => hljs.highlightElement(el));

  /* ======================================================
     UTILITY
  ====================================================== */
  function escHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  }

});
