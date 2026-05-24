/**
 * BookBridge — script.js
 * Clean, modular JS with full feature parity:
 *  - Navbar scroll behaviour
 *  - Mobile hamburger menu
 *  - Book data + rendering
 *  - Genre filter tabs
 *  - Live search
 *  - "Load more" pagination
 *  - Book detail modal
 *  - Lend form (validation, submit, success)
 *  - Testimonials
 *  - Toast notifications
 *  - Scroll-reveal animations
 *  - Footer year
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */

const BOOK_DATA = [
  { id: 1,  title: 'Atomic Habits',          author: 'James Clear',       genre: 'self-help',  condition: 'Like New', location: 'Indiranagar, Bangalore',   available: true,  emoji: '📗', color: '#1e3a5f,#2563eb', lender: { name: 'Aisha M.',    avatar: 'AM', color: '#2563eb' }, description: 'Tiny changes, remarkable results. A practical guide to building good habits and breaking bad ones.' },
  { id: 2,  title: 'Deep Work',              author: 'Cal Newport',       genre: 'self-help',  condition: 'Good',     location: 'Koramangala, Bangalore',    available: true,  emoji: '📘', color: '#0f4c81,#38bdf8', lender: { name: 'Rajan S.',    avatar: 'RS', color: '#0ea5e9' }, description: 'Rules for focused success in a distracted world. Newport argues that focused work is the superpower of the 21st century.' },
  { id: 3,  title: 'Sapiens',                author: 'Yuval Noah Harari', genre: 'non-fiction', condition: 'Good',    location: 'HSR Layout, Bangalore',     available: true,  emoji: '📙', color: '#1a3a6b,#60a5fa', lender: { name: 'Priya K.',    avatar: 'PK', color: '#7c3aed' }, description: 'A brief history of humankind — sweeping and insightful. One of the most talked-about books of the decade.' },
  { id: 4,  title: 'Dune',                   author: 'Frank Herbert',     genre: 'sci-fi',     condition: 'Fair',     location: 'Whitefield, Bangalore',     available: false, emoji: '🪐', color: '#2d1b69,#7c3aed', lender: { name: 'Tariq B.',    avatar: 'TB', color: '#d97706' }, description: 'A landmark of science fiction — an epic story of politics, religion, ecology and human nature set on a desert planet.' },
  { id: 5,  title: 'The Midnight Library',   author: 'Matt Haig',         genre: 'fiction',    condition: 'Like New', location: 'Jayanagar, Bangalore',      available: true,  emoji: '📚', color: '#064e3b,#10b981', lender: { name: 'Nidhi T.',    avatar: 'NT', color: '#059669' }, description: 'Between life and death there is a library. A beautiful novel about all the choices that go into a life well lived.' },
  { id: 6,  title: 'Zero to One',            author: 'Peter Thiel',       genre: 'non-fiction', condition: 'Good',    location: 'MG Road, Bangalore',        available: true,  emoji: '💡', color: '#1e3a5f,#0891b2', lender: { name: 'Arjun V.',    avatar: 'AV', color: '#0891b2' }, description: 'Notes on startups, or how to build the future. Thiel argues that progress comes from going from zero to one.' },
  { id: 7,  title: '1984',                   author: 'George Orwell',     genre: 'fiction',    condition: 'Good',     location: 'BTM Layout, Bangalore',     available: true,  emoji: '🔭', color: '#111827,#374151', lender: { name: 'Meera P.',    avatar: 'MP', color: '#dc2626' }, description: 'A chilling dystopia that defined the genre. Big Brother, doublethink, and Room 101 — as relevant as ever.' },
  { id: 8,  title: 'Project Hail Mary',      author: 'Andy Weir',         genre: 'sci-fi',     condition: 'Like New', location: 'Electronic City, Bangalore', available: true,  emoji: '🚀', color: '#0c1445,#3b82f6', lender: { name: 'Kiran D.',    avatar: 'KD', color: '#2563eb' }, description: 'A lone astronaut must save Earth from an unimaginable threat. Possibly the best sci-fi novel of this decade.' },
  { id: 9,  title: 'The Almanack of Naval', author: 'Eric Jorgenson',    genre: 'self-help',  condition: 'Good',     location: 'Marathahalli, Bangalore',   available: false, emoji: '⚓', color: '#1c1917,#78716c', lender: { name: 'Sneha R.',    avatar: 'SR', color: '#f59e0b' }, description: 'The collected wisdom and thoughts of Naval Ravikant on wealth, happiness and finding your purpose.' },
  { id: 10, title: 'Educated',               author: 'Tara Westover',     genre: 'biography',  condition: 'Good',     location: 'Indiranagar, Bangalore',    available: true,  emoji: '🎓', color: '#134e4a,#0d9488', lender: { name: 'Rohit A.',    avatar: 'RA', color: '#0d9488' }, description: 'A memoir about the transformative power of education — and the cost of becoming who you believe you are.' },
  { id: 11, title: 'The Alchemist',          author: 'Paulo Coelho',      genre: 'fiction',    condition: 'Fair',     location: 'Rajajinagar, Bangalore',    available: true,  emoji: '🌅', color: '#78350f,#d97706', lender: { name: 'Farida H.',   avatar: 'FH', color: '#d97706' }, description: 'A philosophical novel about Santiago, an Andalusian shepherd boy who wants to travel the world in search of treasure.' },
  { id: 12, title: 'Thinking, Fast and Slow',author: 'Daniel Kahneman',   genre: 'non-fiction', condition: 'Good',    location: 'Yelahanka, Bangalore',      available: true,  emoji: '🧠', color: '#1e1b4b,#4f46e5', lender: { name: 'Sanjay N.',   avatar: 'SN', color: '#4f46e5' }, description: 'A groundbreaking tour of the human mind revealing the surprising factors that affect our thoughts and choices.' },
];

const TESTIMONIALS = [
  { quote: 'Found my entire reading list for the year through BookBridge. The community here is so warm and generous.', name: 'Ananya Singh', city: 'Bangalore', stars: 5, avatar: 'AS', color: '#2563eb' },
  { quote: 'I lent out 12 books this month alone. It feels amazing knowing they\'re being read instead of sitting on a shelf.', name: 'Marcus Chen', city: 'Hyderabad', stars: 5, avatar: 'MC', color: '#7c3aed' },
  { quote: 'As a student, borrowing instead of buying has saved me thousands. Can\'t imagine reading without BookBridge now.', name: 'Preethi Rao', city: 'Chennai', stars: 5, avatar: 'PR', color: '#059669' },
  { quote: 'The quality of books people list here is incredible. Found a first-edition Tolkien in my neighbourhood!', name: 'David Okafor', city: 'Mumbai', stars: 5, avatar: 'DO', color: '#d97706' },
  { quote: 'Simple, clean, and genuinely useful. Borrowed 8 books in two months and made a new friend through it.', name: 'Layla Mehta', city: 'Pune', stars: 5, avatar: 'LM', color: '#0891b2' },
  { quote: 'I was sceptical at first, but the community guidelines and reviews make it feel completely safe and trustworthy.', name: 'Ravi Shankar', city: 'Delhi', stars: 5, avatar: 'RS', color: '#dc2626' },
];

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */

const state = {
  activeFilter:  'all',
  searchQuery:   '',
  visibleCount:  8,
  PAGE_SIZE:     4,
  allBooks:      [...BOOK_DATA],
};

/* ═══════════════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════════════ */

/**
 * Returns filtered + searched subset of books
 */
function getFilteredBooks() {
  const q = state.searchQuery.toLowerCase();
  return state.allBooks.filter(book => {
    const matchFilter = state.activeFilter === 'all' || book.genre === state.activeFilter;
    const matchSearch = !q || [book.title, book.author, book.genre]
      .some(s => s.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });
}

/**
 * Converts a gradient string "color1,color2" to CSS gradient
 */
function makeGradient(colorStr, deg = 135) {
  return `linear-gradient(${deg}deg, ${colorStr})`;
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════ */

function createBookCard(book, index) {
  const article = document.createElement('article');
  article.className = 'book-card';
  article.setAttribute('role', 'listitem');
  article.setAttribute('tabindex', '0');
  article.setAttribute('aria-label', `${book.title} by ${book.author}`);
  article.style.animationDelay = `${(index % state.PAGE_SIZE) * 60}ms`;

  const statusClass = book.available ? 'available' : 'lent';
  const statusLabel = book.available ? 'Available' : 'On Loan';

  article.innerHTML = `
    <div class="book-card-cover" style="background: ${makeGradient(book.color)}">
      <span role="img" aria-label="${book.title}">${book.emoji}</span>
    </div>
    <div class="book-card-body">
      <span class="book-card-genre">${book.genre}</span>
      <h3 class="book-card-title">${book.title}</h3>
      <p class="book-card-author">${book.author}</p>
    </div>
    <div class="book-card-meta">
      <span class="book-card-location">📍 ${book.location.split(',')[0]}</span>
      <span class="book-card-status ${statusClass}">${statusLabel}</span>
    </div>
  `;

  article.addEventListener('click', () => openBookModal(book));
  article.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBookModal(book); }
  });

  return article;
}

function createTestimonialCard(t, index) {
  const card = document.createElement('article');
  card.className = 'testimonial-card';
  card.style.animationDelay = `${index * 80}ms`;
  card.innerHTML = `
    <div class="testimonial-stars" aria-label="${t.stars} out of 5 stars">${'★'.repeat(t.stars)}</div>
    <p class="testimonial-quote">${t.quote}</p>
    <div class="testimonial-author">
      <div class="author-avatar" style="background: ${t.color}" aria-hidden="true">${t.avatar}</div>
      <div>
        <div class="author-name">${t.name}</div>
        <div class="author-city">${t.city}</div>
      </div>
    </div>
  `;
  return card;
}

/* ═══════════════════════════════════════════════════════════
   RENDER
═══════════════════════════════════════════════════════════ */

function renderBooks() {
  const grid      = document.getElementById('booksGrid');
  const noResults = document.getElementById('noResults');
  const loadMore  = document.getElementById('loadMoreBtn');

  const filtered  = getFilteredBooks();
  const visible   = filtered.slice(0, state.visibleCount);

  grid.innerHTML = '';
  noResults.classList.toggle('hidden', filtered.length > 0);
  grid.classList.toggle('hidden', filtered.length === 0);

  visible.forEach((book, i) => grid.appendChild(createBookCard(book, i)));

  loadMore.classList.toggle('hidden', state.visibleCount >= filtered.length);
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  TESTIMONIALS.forEach((t, i) => grid.appendChild(createTestimonialCard(t, i)));
}

/* ═══════════════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════════════ */

function openBookModal(book) {
  const overlay = document.getElementById('modalOverlay');
  const body    = document.getElementById('modalBody');

  const conditionColour = {
    'Like New': '#059669',
    'Good': '#0891b2',
    'Fair': '#d97706',
    'Well-loved': '#9ca3af',
  };

  body.innerHTML = `
    <div class="modal-book-cover" style="background: ${makeGradient(book.color)}">
      <span role="img" aria-label="${book.title}" style="font-size:3.5rem">${book.emoji}</span>
    </div>
    <h2 class="modal-book-title" id="modalTitle">${book.title}</h2>
    <p class="modal-book-author">${book.author}</p>
    <div class="modal-badges">
      <span class="modal-badge">${book.genre}</span>
      <span class="modal-badge" style="background:#fff3; color:#555; border-color:#e5e7eb">
        Condition: ${book.condition}
      </span>
      <span class="modal-badge ${book.available ? 'green' : ''}">
        ${book.available ? '✓ Available' : '⏳ On Loan'}
      </span>
    </div>
    <p class="modal-description">${book.description}</p>
    <div class="modal-lender">
      <div class="modal-lender-avatar" style="background: ${book.lender.color}" aria-hidden="true">
        ${book.lender.avatar}
      </div>
      <div>
        <div class="modal-lender-name">${book.lender.name}</div>
        <div class="modal-lender-stats">📍 ${book.location} · ⭐ 4.9 lender rating</div>
      </div>
    </div>
    <div class="modal-actions">
      ${book.available
        ? `<button class="btn btn-primary" id="requestBtn">Request to Borrow</button>`
        : `<button class="btn btn-primary" disabled style="opacity:.5;cursor:not-allowed">Currently On Loan</button>`
      }
      <button class="btn btn-outline" id="saveBtn">♡ Save</button>
    </div>
  `;

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Focus trap
  const focusable = overlay.querySelectorAll('button, [href], input');
  if (focusable.length) focusable[0].focus();

  // Request button
  const requestBtn = document.getElementById('requestBtn');
  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      closeModal();
      showToast(`Request sent to ${book.lender.name} for "${book.title}"!`, 'success');
    });
  }

  // Save button
  document.getElementById('saveBtn').addEventListener('click', function () {
    this.textContent = '♥ Saved';
    this.style.color = '#ef4444';
    this.style.borderColor = '#ef4444';
    showToast(`"${book.title}" saved to your wishlist`, 'info');
  });
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════
   FORM
═══════════════════════════════════════════════════════════ */

function validateField(id, errorId, message) {
  const el  = document.getElementById(id);
  const err = document.getElementById(errorId);
  const val = el.value.trim();
  if (!val) {
    el.classList.add('error');
    err.textContent = message;
    return false;
  }
  el.classList.remove('error');
  err.textContent = '';
  return true;
}

function handleLendSubmit(e) {
  e.preventDefault();

  const valid = [
    validateField('bookTitle',    'titleError',    'Please enter the book title.'),
    validateField('bookAuthor',   'authorError',   'Please enter the author name.'),
    validateField('bookGenre',    'genreError',    'Please select a genre.'),
    validateField('bookCondition','conditionError','Please select the condition.'),
    validateField('bookLocation', 'locationError', 'Please enter your area.'),
  ].every(Boolean);

  if (!valid) return;

  // Simulate async submit
  const btn = document.getElementById('lendSubmitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    // Add to local book list
    const newBook = {
      id:        state.allBooks.length + 1,
      title:     document.getElementById('bookTitle').value.trim(),
      author:    document.getElementById('bookAuthor').value.trim(),
      genre:     document.getElementById('bookGenre').value,
      condition: document.getElementById('bookCondition').options[document.getElementById('bookCondition').selectedIndex].text,
      location:  document.getElementById('bookLocation').value.trim(),
      available: true,
      emoji:     '📖',
      color:     '1e3a5f,2563eb',
      lender:    { name: 'You', avatar: 'YO', color: '#2563eb' },
      description: document.getElementById('bookDescription').value.trim() || 'A book available for borrowing.',
    };
    state.allBooks.unshift(newBook);

    btn.classList.remove('loading');
    btn.disabled = false;

    // Show success
    document.getElementById('lendForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.remove('hidden');

    showToast(`"${newBook.title}" is now listed!`, 'success');

    // Refresh book grid
    state.activeFilter = 'all';
    state.searchQuery  = '';
    state.visibleCount = 8;
    renderBooks();

    // Reset filter tabs
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.filter === 'all');
      t.setAttribute('aria-selected', t.dataset.filter === 'all');
    });
  }, 1200);
}

function resetForm() {
  const form    = document.getElementById('lendForm');
  const success = document.getElementById('formSuccess');
  form.reset();
  form.classList.remove('hidden');
  success.classList.add('hidden');
  document.getElementById('charCount').textContent = '0 / 300';
  ['bookTitle','bookAuthor','bookGenre','bookCondition','bookLocation'].forEach(id => {
    document.getElementById(id)?.classList.remove('error');
  });
  ['titleError','authorError','genreError','conditionError','locationError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */

function showToast(message, type = 'info') {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const container = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" aria-label="Dismiss">✕</button>
  `;

  container.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('out');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */

function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */

function initNavbar() {
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileMenu();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════════ */

function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.classList.remove('open');
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}

/* ═══════════════════════════════════════════════════════════
   FILTER & SEARCH
═══════════════════════════════════════════════════════════ */

function initFilters() {
  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      state.activeFilter = tab.dataset.filter;
      state.visibleCount = 8;
      renderBooks();
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchQuery  = searchInput.value;
      state.visibleCount = 8;
      renderBooks();
    }, 220);
  });

  // Load more
  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    state.visibleCount += state.PAGE_SIZE;
    renderBooks();
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL CLOSE
═══════════════════════════════════════════════════════════ */

function initModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   FORM INIT
═══════════════════════════════════════════════════════════ */

function initForm() {
  document.getElementById('lendForm').addEventListener('submit', handleLendSubmit);
  document.getElementById('listAnotherBtn').addEventListener('click', resetForm);

  // Real-time field validation
  ['bookTitle', 'bookAuthor', 'bookLocation'].forEach(id => {
    const errorIds = { bookTitle: 'titleError', bookAuthor: 'authorError', bookLocation: 'locationError' };
    document.getElementById(id).addEventListener('blur', function () {
      if (this.value.trim()) {
        this.classList.remove('error');
        document.getElementById(errorIds[id]).textContent = '';
      }
    });
  });

  // Character count for description
  const desc  = document.getElementById('bookDescription');
  const count = document.getElementById('charCount');
  desc.addEventListener('input', () => {
    count.textContent = `${desc.value.length} / 300`;
  });
}

/* ═══════════════════════════════════════════════════════════
   CTA BUTTONS
═══════════════════════════════════════════════════════════ */

function initCtaButtons() {
  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const bindScroll = (btnId, targetId) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => scrollTo(targetId));
  };

  bindScroll('heroBrowseBtn',  'browse');
  bindScroll('heroLendBtn',    'lend');
  bindScroll('ctaJoinBtn',     'browse');
  bindScroll('ctaLearnBtn',    'how-it-works');
  bindScroll('loginBtn',       'browse');
  bindScroll('joinBtn',        'lend');
  bindScroll('loadMoreBtn',    'browse');
}

/* ═══════════════════════════════════════════════════════════
   ADD DATA-REVEAL ATTRIBUTES
═══════════════════════════════════════════════════════════ */

function addRevealAttributes() {
  const selectors = [
    '.step-card',
    '.lend-copy',
    '.lend-form-card',
    '.testimonial-card',
    '.cta-content',
    '.browse-header',
    '.section-title',
    '.section-label',
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
        if (i > 0) el.setAttribute('data-reveal-delay', Math.min(i, 3).toString());
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */

function init() {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Core features
  initNavbar();
  initMobileMenu();
  initModal();
  initFilters();
  initForm();
  initCtaButtons();

  // Render content
  renderBooks();
  renderTestimonials();

  // After DOM is settled, add reveal attributes & init observer
  requestAnimationFrame(() => {
    addRevealAttributes();
    initScrollReveal();
  });
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
