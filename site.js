/* site.js — FYS: Progress (AS.001.219)
   Minimal interactivity: mobile nav toggle. */

(function () {
  'use strict';

  var nav    = document.querySelector('.site-nav');
  var btn    = document.querySelector('.site-nav__toggle');
  var links  = document.querySelector('.site-nav__links');

  if (!nav || !btn) return;

  /* Toggle open/closed */
  btn.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('site-nav--open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label',    isOpen ? 'Close menu' : 'Open menu');
  });

  /* Close when a nav link is tapped */
  if (links) {
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('site-nav--open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* Close when tapping outside the nav */
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      nav.classList.remove('site-nav--open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
  });
}());
