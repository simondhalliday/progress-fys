/* glossary.js — FYS: Progress (AS.001.219)
   Hover definitions using Bootstrap 5 tooltips.
   Usage in .qmd: [term]{.term}

   Two sources, both canonical:
   [SNG] Halliday, session_notes_glossary.xlsx
   [UOE] Halliday & Arias, UOE-Glossary-Revision.xlsx

   Works for the Bowles & Halliday textbook too — copy and extend. */

const glossary = {

  /* ── Goods typology [SNG] ────────────────────────────────────────────── */

  'nonrival':
    '[SNG] A good is nonrival when more people using the good does not reduce ' +
    'the benefits available to other users. See also: rival.',

  'nonrivalry':
    '[SNG] A good is nonrival when more people using the good does not reduce ' +
    'the benefits available to other users. See also: rival.',

  'rival':
    '[SNG] A good is rival when more people using the good reduces the benefits ' +
    'available to other users. See also: nonrival.',

  'excludable':
    '[SNG] A good is excludable when a potential user may be denied access to ' +
    'the good at a low or zero cost.',

  'nonexcludable':
    '[SNG] A good is nonexcludable when a potential user may not be denied ' +
    'access to the good at low or zero cost.',

  'public good':
    '[SNG] A public good is non-rival and non-excludable. ' +
    'See also: common property resource, private good, club good.',

  'private good':
    '[SNG] A private good is rival and excludable. ' +
    'See also: common property resource, public good, club good.',

  'club good':
    '[SNG] A club good is non-rival and excludable. ' +
    'See also: common property resource, public good, private good.',

  'common property resource':
    '[SNG] A common property resource is rival and non-excludable. ' +
    'See also: public good, private good, club good.',

  /* ── Market failure & externalities [SNG / UOE] ──────────────────────── */

  'market failure':
    '[SNG] When markets allocate resources in (Pareto) inefficient ways.',

  'spillover':
    '[SNG] A spillover is an external effect. An external effect occurs when ' +
    'a person\'s action confers a benefit or imposes a cost on others and this ' +
    'cost or benefit is not taken into account by the individual taking the action. ' +
    'External effects are also called externalities or spillovers.',

  'external effects':
    '[UOE] An external effect occurs when a person\'s action confers a benefit ' +
    'or imposes a cost on others, and this cost or benefit is not taken into account ' +
    'by the individual taking the action. Also called externalities.',

  'externality':
    '[UOE] See: external effects. An external effect occurs when a person\'s action ' +
    'confers a benefit or imposes a cost on others that the decision-maker does not ' +
    'take into account.',

  'external benefits':
    '[UOE] A positive external effect: a positive effect of an economic decision on ' +
    'other people that is not taken into account by the decision-maker. Also called ' +
    'a positive externality or external economy.',

  'external cost':
    '[UOE] A negative external effect: a negative effect of an economic decision on ' +
    'other people that is not taken into account by the decision-maker. Also called ' +
    'a negative externality.',

  'internalizing the external effect':
    '[UOE] Getting the party that imposes a cost on others to pay for that cost.',

  'free-riders':
    '[UOE] Someone who benefits from the contributions of others to some cooperative ' +
    'project without contributing themselves is said to be free riding, or to be a free rider.',

  'free rider':
    '[UOE] Someone who benefits from the contributions of others to some cooperative ' +
    'project without contributing themselves.',

  'social dilemma':
    '[UOE] A situation in which actions taken independently by individuals in pursuit ' +
    'of their own private objectives result in an outcome that is inferior to some other ' +
    'feasible outcome that could have occurred if people had acted together.',

  'deadweight loss':
    '[UOE] A measure of the total loss of surplus (potential gains from trade) ' +
    'relative to the maximum available in the market.',

  /* ── Cognitive instincts & global development [SNG] ─────────────────── */

  'heuristic thinking':
    '[SNG] Fast, intuitive rules of thumb that guide decision-making without ' +
    'exhaustive deliberation. Evolved as mental shortcuts for navigating complex ' +
    'environments. Useful in many contexts, but can produce systematic errors when ' +
    'applied to a modern world very different from the one our ancestors faced.',

  'negativity instinct':
    '[SNG] The human tendency to notice negative events and information more readily ' +
    'than positive ones — an evolved cognitive bias that made sense when threats demanded ' +
    'immediate attention. Combined with media bias toward dramatic events and misremembering ' +
    'of the past, it produces a worldview significantly darker than the data warrants. ' +
    'Identified by Hans Rosling in Factfulness (2018).',

  'gap instinct':
    '[SNG] The tendency to divide people, countries, or situations into two distinct groups ' +
    'with a gap between them — "developed" vs. "developing," "us" vs. "them." Identified by ' +
    'Hans Rosling as one of the most pervasive and misleading cognitive biases in global ' +
    'development: in reality, the majority of humanity lives in the middle, between the two ' +
    'old categories.',

  'four income levels':
    '[SNG] Hans Rosling\'s replacement for the "developed/developing" binary. Level 1: ' +
    '~$1–2/day (extreme poverty, ~1 billion people). Level 2: ~$2–8/day (basic needs met ' +
    'with effort, ~3 billion). Level 3: ~$8–32/day (relative comfort, ~2 billion). Level 4: ' +
    '$32+/day (affluence, ~1 billion). Most of humanity lives on Levels 2 and 3.',

  /* ── Development & freedom [SNG / Sen] ──────────────────────────────── */

  'development as freedom':
    '[SNG] Amartya Sen\'s framework, developed in Development as Freedom (1999): economic ' +
    'development is the expansion of substantive freedoms — the real capabilities people have ' +
    'to live lives they have reason to value. Income growth matters insofar as it expands ' +
    'freedom, but is not the end in itself.',

  'constitutive role':
    '[SNG] In Amartya Sen\'s framework, the role of freedom as part of what development ' +
    'actually is, not merely a means to it. A person who cannot vote, cannot choose their ' +
    'occupation, or cannot access healthcare is unfree in ways that matter regardless of ' +
    'their income level.',

  'instrumental role':
    '[SNG] In Amartya Sen\'s framework, the role of freedom as the means by which development ' +
    'happens: political freedoms produce accountable governments that address famines; ' +
    'educational opportunities produce human capital; social opportunities enable economic ' +
    'participation. Freedom drives development as well as constituting it.',

  'human development index':
    '[SNG] A composite measure of development that goes beyond income to include life ' +
    'expectancy and years of education. Produced annually by the UNDP. Captures more of ' +
    'Sen\'s "development as freedom" than GDP per capita alone. Also: HDI.',

  'hdi':
    '[SNG] Human Development Index. A composite measure combining GDP per capita, life ' +
    'expectancy, and education. Produced annually by the UNDP. See also: Augmented Human ' +
    'Development Index (AHDI).',

  'augmented human development index':
    '[SNG] An extension of the HDI that adds measures of political freedoms and civil ' +
    'liberties to the standard income, life expectancy, and education components. Developed ' +
    'by Prados de la Escosura (2015). Makes visible what standard income or HDI measures ' +
    'hide about the quality of political life. Also: AHDI.',

  'ahdi':
    '[SNG] Augmented Human Development Index. Extends the standard HDI by incorporating ' +
    'political freedoms and civil liberties. See also: Human Development Index (HDI).',

  /* ── Capitalism & creative destruction [SNG / UOE] ───────────────────── */

  'capitalism':
    '[UOE] An economic system combining private property, markets, wage labor, and profit ' +
    'driven innovation. Capitalist institutions created for the first time at scale a sustained ' +
    'incentive for producers to search for and implement better ways of doing things — the ' +
    'engine of the Great Enrichment after 1800.',

  'creative destruction':
    '[UOE] The process by which new products, firms, and technologies continuously displace ' +
    'old ones as part of capitalist growth. "Creative" because it generates better products ' +
    'and more efficient production; "destruction" because it eliminates existing businesses ' +
    'and jobs. Central to capitalism because profit-seeking innovation continuously renders ' +
    'older methods obsolete.',

  /* ── Research & innovation [SNG / UOE] ───────────────────────────────── */

  'basic research':
    '[SNG] Basic research is experimental or theoretical work undertaken to advance ' +
    'scientific knowledge without any particular application or use in view. Its value ' +
    'may only become apparent much later, and it forms the foundation on which applied ' +
    'research builds. See also: applied research.',

  'applied research':
    '[SNG] Applied research is original investigation directed primarily towards a ' +
    'specific practical aim or objective, building on the knowledge produced by basic ' +
    'research. See also: basic research.',

  'innovation rent':
    '[UOE] Profits in excess of the opportunity cost of capital that an innovator gets ' +
    'by introducing a new technology, organizational form, or marketing strategy.',

  'technological innovation':
    '[UOE] A change in technology that reduces the amount of resources — labour, ' +
    'machines, land, energy, time — required to produce a given amount of output.',

  /* ── Growth & institutions [UOE] ─────────────────────────────────────── */

  'economic growth':
    '[UOE] An economy grows when its GDP per capita increases over time. ' +
    'A growth rate is a percentage change: (New − Old) / Old.',

  'institutions':
    '[UOE] A set of laws and informal rules that regulate social interactions among ' +
    'people, and between people and the biosphere; sometimes also termed ' +
    '\'the rules of the game\'.',

  'economic rent':
    '[UOE] The difference between the net benefit that an individual receives from a ' +
    'chosen action, and the net benefit from the next-best alternative (or reservation option).',

  'division of labor':
    '[UOE] The specialization of producers to carry out different tasks in the production process.',

  'specialization':
    '[UOE] When workers, organizations, or countries concentrate on producing a limited ' +
    'set of goods or performing specific tasks, often through the division of labor.',

  'markets':
    '[UOE] Markets enable people to exchange goods and services by means of directly ' +
    'reciprocated transfers, voluntarily entered into for mutual benefit, often in an impersonal way.',

  'inequality':
    '[UOE] The degree to which income, wealth, or other economic resources are distributed ' +
    'unevenly among people or groups. Measured using tools such as the Gini coefficient ' +
    'or income shares.',

  'public goods game':
    '[UOE] A game in which individual players can take an action that would be costly ' +
    'to themselves, but would produce benefits for all players (including themselves).',

  'common property resources':
    '[UOE] A resource governed by a defined community of users who can exclude outsiders. ' +
    'The community collectively manages the resource, often through rules, norms, or informal institutions.',

};

/* Strip source tags like [SNG], [UOE], [NEEDED — ...] from visible text */
function cleanDef(text) {
  return text
    .replace(/^\[(?:SNG|UOE|NEEDED[^\]]*)\]\s*/i, '')
    .trim();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.term').forEach(function (el) {
    const word    = el.textContent.trim().toLowerCase();
    const def     = glossary[word];
    const example = el.getAttribute('data-example');

    if (!def) {
      console.warn('Glossary: no entry for "' + word + '"');
      return;
    }

    /* Build HTML tooltip: standard definition + optional context example */
    let content = '<div class="glossary-def">' + cleanDef(def) + '</div>';
    if (example) {
      content += '<div class="glossary-example">' + example + '</div>';
    }

    new bootstrap.Tooltip(el, {
      title: content,
      html: true,
      placement: 'top',
      trigger: 'hover focus',
      customClass: 'glossary-tooltip' + (example ? ' glossary-tooltip--has-example' : ''),
    });
  });
});
