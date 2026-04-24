/* glossary.js — FYS: Progress (AS.001.219)
   Hover definitions using Bootstrap 5 tooltips.
   Usage in .qmd: [nonrival]{.term}
   Add new terms to the dictionary below.
   This same pattern works for the Bowles & Halliday textbook. */

const glossary = {
  /* ── Core public goods concepts ─────────────────────────── */
  'nonrival':
    'A good is nonrival if one person\'s use does not reduce its availability to others. ' +
    'You can use an idea at the same time as me — unlike a sandwich.',

  'nonrivalry':
    'The property of a good whereby one person\'s use does not reduce its availability to ' +
    'others. Knowledge is nonrival: sharing an idea doesn\'t diminish it.',

  'nonexcludable':
    'A good is nonexcludable if people cannot easily be prevented from using it. ' +
    'Once scientific results are published, it is hard to stop others from building on them.',

  'public good':
    'A good that is both nonrival (one person\'s use doesn\'t reduce availability to others) ' +
    'and nonexcludable (hard to prevent access). Basic scientific knowledge is a classic example.',

  'rival':
    'A good is rival if one person\'s use reduces its availability to others — like a sandwich ' +
    'or a shirt. Most physical goods are rival.',

  /* ── Market failure ──────────────────────────────────────── */
  'market failure':
    'A situation where markets left to themselves produce too much or too little of something ' +
    'relative to what is socially optimal. Public goods cause market failure because producers ' +
    'cannot capture the full social value of what they create.',

  'externality':
    'A cost or benefit that falls on someone not party to a transaction. Positive externalities ' +
    '(like knowledge spillovers) mean markets underproduce; negative externalities (like ' +
    'pollution) mean markets overproduce.',

  'spillover':
    'A benefit (or cost) of an activity that accrues to parties not directly involved. ' +
    'Basic research generates large knowledge spillovers — benefits that the original ' +
    'researcher cannot fully capture.',

  /* ── Institutions ────────────────────────────────────────── */
  'basic research':
    'Research undertaken to advance scientific knowledge without a specific application in ' +
    'view. Contrasts with applied research (directed at a practical goal) and experimental ' +
    'development (turning results into products or processes).',

  'applied research':
    'Research directed at a specific practical goal or application, building on the stock ' +
    'of knowledge from basic research.',
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.term').forEach(function (el) {
    const word = el.textContent.trim().toLowerCase();
    const def = glossary[word];
    if (def) {
      new bootstrap.Tooltip(el, {
        title: def,
        placement: 'top',
        trigger: 'hover focus',
        customClass: 'glossary-tooltip',
      });
    } else {
      /* Warn in dev if a .term has no glossary entry */
      console.warn('Glossary: no entry for "' + word + '"');
    }
  });
});
