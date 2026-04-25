/* paginate.js — FYS: Progress (AS.001.219)
   Section-by-section navigation for session notes.
   Hides all level-2 sections except the current one and adds
   prev/next navigation at the bottom, CORE-econ style.
   URL hash tracks position; TOC links navigate between sections.

   NOTE: Quarto's built-in scroll-spy (quarto.js) recalculates the
   active TOC entry on every scroll event using offsetTop. When
   paginate.js hides sections with display:none their offsetTop
   collapses to 0, which fools the scroll-spy into always marking
   the last section as active. We suppress this with a
   requestAnimationFrame re-highlight after each scroll. */

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
    prog.textContent = (current + 1) + ' / ' + sections.length;
    nav.appendChild(prog);

    /* Link container */
    var links = document.createElement('div');
    links.className = 'section-nav__links';

    if (current > 0) {
      var prev = document.createElement('button');
      prev.className = 'section-nav__btn section-nav__prev';
      prev.innerHTML = '← <span>' + sectionTitle(current - 1) + '</span>';
      prev.addEventListener('click', function () { showSection(current - 1); });
      links.appendChild(prev);
    } else {
      links.appendChild(document.createElement('span')); /* spacer */
    }

    if (current < sections.length - 1) {
      var next = document.createElement('button');
      next.className = 'section-nav__btn section-nav__next';
      next.innerHTML = '<span>' + sectionTitle(current + 1) + '</span> →';
      next.addEventListener('click', function () { showSection(current + 1); });
      links.appendChild(next);
    }

    nav.appendChild(links);
    sections[current].appendChild(nav);
  }

  /* ── Highlight active TOC entry ──────────────────────────── */
  /* Called immediately, then again via rAF to override quarto.js's
     scroll-spy which fires asynchronously after window.scrollTo. */
  function highlightTOC() {
    function apply() {
      document.querySelectorAll('#TOC .nav-link').forEach(function (a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + sections[current].id) {
          a.classList.add('active');
        }
      });
    }
    apply();                               /* immediate pass */
    requestAnimationFrame(function () {    /* post-scroll-spy pass */
      requestAnimationFrame(apply);        /* two rAFs: scroll event fires between them */
    });
  }

  /* ── Re-highlight after any scroll (keeps quarto.js honest) ─ */
  var scrollTimer = null;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(highlightTOC, 80);
  }, { passive: true });

  /* ── Wire up TOC links ───────────────────────────────────── */
  /* Use capture phase so this fires before quarto.js's bubble-phase
     handlers. stopImmediatePropagation prevents them from running at all,
     so quarto.js does not try to scroll to a hidden section. */
  document.querySelectorAll('#TOC a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var targetId = a.getAttribute('href').slice(1);
      var idx = sections.findIndex(function (s) { return s.id === targetId; });
      if (idx !== -1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showSection(idx);
      }
    }, true);   /* capture = true */
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
