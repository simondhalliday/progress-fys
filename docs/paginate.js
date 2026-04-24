/* paginate.js — FYS: Progress (AS.001.219)
   Section-by-section navigation for session notes.
   Hides all level-2 sections except the current one and adds
   prev/next navigation at the bottom, CORE-econ style.
   URL hash tracks position; TOC links navigate between sections. */

document.addEventListener('DOMContentLoaded', function () {

  var content  = document.getElementById('quarto-document-content');
  if (!content) return;

  var sections = Array.prototype.slice.call(
    content.querySelectorAll(':scope > section.level2')
  );
  if (sections.length < 2) return;   /* single-section pages: do nothing */

  var current = 0;

  /* Determine initial section from URL hash */
  if (window.location.hash) {
    var hash = window.location.hash.slice(1);
    sections.forEach(function (s, i) {
      if (s.id === hash) current = i;
    });
  }

  /* ── Show a section ─────────────────────────────────────── */
  function showSection(n) {
    sections.forEach(function (s) { s.style.display = 'none'; });
    sections[n].style.display = '';
    current = n;

    history.replaceState(null, '', '#' + sections[n].id);
    window.scrollTo({ top: 0, behavior: 'instant' });

    renderNav();
    highlightTOC();
  }

  /* ── Section title (strip term markup for display) ──────── */
  function sectionTitle(n) {
    var h2 = sections[n].querySelector('h2');
    return h2 ? h2.textContent.trim() : 'Section ' + (n + 1);
  }

  /* ── Render prev/next nav ────────────────────────────────── */
  function renderNav() {
    /* Remove old nav if present */
    var old = sections[current].querySelector('.section-nav');
    if (old) old.remove();

    var nav = document.createElement('nav');
    nav.className = 'section-nav';
    nav.setAttribute('aria-label', 'Section navigation');

    /* Progress indicator */
    var prog = document.createElement('span');
    prog.className = 'section-nav__progress';
    prog.textContent = (current + 1) + '\u00a0/\u00a0' + sections.length;
    nav.appendChild(prog);

    /* Link container */
    var links = document.createElement('div');
    links.className = 'section-nav__links';

    if (current > 0) {
      var prev = document.createElement('button');
      prev.className = 'section-nav__btn section-nav__prev';
      prev.innerHTML = '\u2190 <span>' + sectionTitle(current - 1) + '</span>';
      prev.addEventListener('click', function () { showSection(current - 1); });
      links.appendChild(prev);
    } else {
      links.appendChild(document.createElement('span')); /* spacer */
    }

    if (current < sections.length - 1) {
      var next = document.createElement('button');
      next.className = 'section-nav__btn section-nav__next';
      next.innerHTML = '<span>' + sectionTitle(current + 1) + '</span> \u2192';
      next.addEventListener('click', function () { showSection(current + 1); });
      links.appendChild(next);
    }

    nav.appendChild(links);
    sections[current].appendChild(nav);
  }

  /* ── Highlight active TOC entry ──────────────────────────── */
  function highlightTOC() {
    document.querySelectorAll('#TOC .nav-link').forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + sections[current].id) {
        a.classList.add('active');
      }
    });
  }

  /* ── Wire up TOC links ───────────────────────────────────── */
  document.querySelectorAll('#TOC a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var targetId = a.getAttribute('href').slice(1);
      var idx = sections.findIndex(function (s) { return s.id === targetId; });
      if (idx !== -1) {
        e.preventDefault();
        showSection(idx);
      }
    });
  });

  /* ── Keyboard navigation ─────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' && current < sections.length - 1) showSection(current + 1);
    if (e.key === 'ArrowLeft'  && current > 0)                   showSection(current - 1);
  });

  /* ── Initialise ──────────────────────────────────────────── */
  showSection(current);
});
