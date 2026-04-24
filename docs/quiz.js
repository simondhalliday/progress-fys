/* quiz.js — FYS: Progress (AS.001.219)
   Handles:
   1. Instructor note toggle (.instructor callouts hidden by default)
   2. Embedded MCQ blocks (.quiz)
   3. Orbit fallback (simple flip-cards if orbit web component fails to load)
*/

/* ── 1. Instructor note toggle ───────────────────────────────────────────
   .instructor callouts are hidden by default so students see clean notes.
   A toggle button at the top of each session note lets the instructor
   reveal/hide them. State persists in localStorage. */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Instructor toggle ─────────────────────────────────── */
  var instructorBlocks = document.querySelectorAll('.instructor');
  if (instructorBlocks.length) {
    var STORE_KEY = 'progress-show-instructor';
    var visible = localStorage.getItem(STORE_KEY) === 'true';

    var btn = document.createElement('button');
    btn.className = 'instructor-toggle';
    btn.setAttribute('aria-pressed', String(visible));

    function applyState() {
      instructorBlocks.forEach(function (el) {
        el.style.display = visible ? '' : 'none';
      });
      btn.textContent = visible ? 'Hide instructor notes' : 'Show instructor notes';
      btn.setAttribute('aria-pressed', String(visible));
    }

    btn.addEventListener('click', function () {
      visible = !visible;
      localStorage.setItem(STORE_KEY, String(visible));
      applyState();
    });

    /* Insert after the Quarto title block, before main content */
    var titleBlock = document.getElementById('title-block-header');
    var container  = document.getElementById('quarto-document-content');
    if (titleBlock && titleBlock.parentNode === container) {
      container.insertBefore(btn, titleBlock.nextSibling);
    } else if (container) {
      container.insertBefore(btn, container.firstChild);
    }

    applyState();
  }

  /* ── 2. Embedded MCQ blocks ────────────────────────────── */
  document.querySelectorAll('.quiz').forEach(function (quiz) {
    var opts = quiz.querySelectorAll('.quiz-opts li');

    opts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (quiz.classList.contains('quiz--answered')) return;
        quiz.classList.add('quiz--answered');

        var correct = opt.dataset.correct === 'true';
        opt.classList.add(correct ? 'quiz-opt--correct' : 'quiz-opt--wrong');

        var fb = document.createElement('p');
        fb.className = 'quiz-feedback' + (correct ? ' quiz-feedback--correct' : ' quiz-feedback--wrong');
        fb.textContent = opt.dataset.fb || (correct ? 'Correct.' : 'Not quite.');
        opt.appendChild(fb);

        if (!correct) {
          opts.forEach(function (o) {
            if (o.dataset.correct === 'true') o.classList.add('quiz-opt--reveal');
          });
        }

        var retry = document.createElement('button');
        retry.className = 'quiz-retry';
        retry.textContent = 'Try again';
        retry.addEventListener('click', function () {
          quiz.classList.remove('quiz--answered');
          opts.forEach(function (o) {
            o.classList.remove('quiz-opt--correct', 'quiz-opt--wrong', 'quiz-opt--reveal');
            var existing = o.querySelector('.quiz-feedback');
            if (existing) existing.remove();
          });
          retry.remove();
        });
        quiz.appendChild(retry);
      });
    });
  });

  /* ── 3. Orbit fallback ─────────────────────────────────────
     Poll every 500ms for up to 10 seconds. If Orbit renders successfully
     (clientHeight > 20), stop. Only fall back if it never renders.
     This avoids firing the fallback before Orbit has had a chance to load. */
  var orbitCheckCount = 0;
  var orbitInterval = setInterval(function () {
    orbitCheckCount++;
    var orbitAreas = document.querySelectorAll('orbit-reviewarea');
    if (!orbitAreas.length) { clearInterval(orbitInterval); return; }

    var anyVisible = Array.prototype.some.call(orbitAreas, function (el) {
      return el.clientHeight > 20;
    });
    if (anyVisible) { clearInterval(orbitInterval); return; } /* Orbit loaded — done */
    if (orbitCheckCount < 20) return;                         /* keep waiting */

    /* 10 seconds elapsed and nothing rendered — run the fallback */
    clearInterval(orbitInterval);
    (function () {

    document.querySelectorAll('orbit-reviewarea').forEach(function (area) {
      var prompts = area.querySelectorAll('orbit-prompt');
      if (!prompts.length) return;

      var wrapper = document.createElement('div');
      wrapper.className = 'orbit-fallback';

      var label = document.createElement('p');
      label.className = 'orbit-fallback__label';
      label.textContent = 'Review cards';
      wrapper.appendChild(label);

      prompts.forEach(function (p, i) {
        var q = p.getAttribute('question') || '';
        var a = p.getAttribute('answer')   || '';

        var card = document.createElement('div');
        card.className = 'orbit-fallback__card';

        var front = document.createElement('div');
        front.className = 'orbit-fallback__front';
        front.innerHTML = '<span class="orbit-fallback__num">' + (i + 1) + '</span>' + q;

        var back = document.createElement('div');
        back.className = 'orbit-fallback__back';
        back.textContent = a;
        back.style.display = 'none';

        var toggle = document.createElement('button');
        toggle.className = 'orbit-fallback__reveal';
        toggle.textContent = 'Show answer';
        toggle.addEventListener('click', function () {
          if (back.style.display === 'none') {
            back.style.display = '';
            toggle.textContent = 'Hide answer';
          } else {
            back.style.display = 'none';
            toggle.textContent = 'Show answer';
          }
        });

        card.appendChild(front);
        card.appendChild(back);
        card.appendChild(toggle);
        wrapper.appendChild(card);
      });

      area.replaceWith(wrapper);
    });
    }()); /* end fallback IIFE */

  }, 500); /* poll interval */

});
