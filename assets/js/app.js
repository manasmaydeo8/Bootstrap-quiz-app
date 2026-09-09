/**
 * App Entry Point - Event Routing, Module Coordination & Lifecycle
 */

import { QuizEngine } from './modules/engine.js';
import { QuizTimer } from './modules/timer.js';
import { UIController } from './modules/ui.js';
import { initTheme, toggleTheme } from './modules/theme.js';
import { recordQuizResult, clearAllHistory } from './modules/storage.js';
import { CATEGORIES } from './data/questions.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Subsystems
  initTheme();
  const engine = new QuizEngine();
  const timer = new QuizTimer();
  const ui = new UIController();

  let currentReviewFilter = 'all';
  let activeModeKey = 'QUICK';
  let isQuizActive = false;

  // Window beforeunload prompt if quiz is actively running
  window.addEventListener('beforeunload', (e) => {
    if (isQuizActive && !engine.isCompleted) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // Render initial Home view
  ui.renderHome();

  // Populate category filter in Question Bank modal
  const qbankCategorySelect = document.getElementById('qbank-category-filter');
  if (qbankCategorySelect) {
    Object.values(CATEGORIES).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      qbankCategorySelect.appendChild(opt);
    });
  }

  // 2. Start Quiz Handler
  function handleStartQuiz(modeKey) {
    activeModeKey = modeKey;
    isQuizActive = true;
    const session = engine.startQuiz(modeKey);
    ui.switchView('quiz');
    ui.renderQuestion(session.firstQuestion);

    // Start timer
    const timeLimitSec = session.modeConfig.timeLimitSec;
    timer.start(
      timeLimitSec,
      (remainingSec, elapsedSec, formattedTime) => {
        const isWarning = timeLimitSec > 0 && remainingSec <= 60;
        ui.updateTimerDisplay(formattedTime, isWarning);
      },
      () => {
        // Auto-expire when countdown hits 0
        handleQuizEnd(true);
      }
    );
  }

  // 3. Option Selection Handler
  function handleSelectOption(optionIndex) {
    const currentQ = engine.getCurrentQuestion();
    if (!currentQ || (currentQ.userAnswer && currentQ.userAnswer.isSubmitted)) return;

    ui.selectedOptionIndex = optionIndex;

    // Update active visual states on buttons
    const container = document.getElementById('quiz-options-container');
    if (container) {
      const buttons = container.querySelectorAll('.option-btn');
      buttons.forEach((btn, idx) => {
        const badge = btn.querySelector('.option-letter-badge');
        if (idx === optionIndex) {
          btn.classList.add('active', 'border-primary');
          btn.setAttribute('aria-checked', 'true');
          if (badge) badge.className = 'badge bg-light text-primary rounded-circle option-letter-badge p-2 d-inline-flex justify-content-center align-items-center';
        } else {
          btn.classList.remove('active', 'border-primary');
          btn.setAttribute('aria-checked', 'false');
          if (badge) badge.className = 'badge bg-secondary rounded-circle option-letter-badge p-2 d-inline-flex justify-content-center align-items-center';
        }
      });
    }

    // Enable submit button
    const submitBtn = document.getElementById('quiz-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }

  // 4. Submit Answer Handler
  function handleSubmitAnswer() {
    if (ui.selectedOptionIndex === null) return;
    const submitBtn = document.getElementById('quiz-submit-btn');
    if (submitBtn) submitBtn.disabled = true;

    const result = engine.submitAnswer(ui.selectedOptionIndex);
    if (!result) return;

    const currentQ = engine.getCurrentQuestion();
    ui.renderQuestion(currentQ);
  }

  // 5. Next Question / Finalize Quiz Handler
  function handleNextQuestion() {
    if (engine.isLastQuestion()) {
      handleQuizEnd(false);
    } else {
      engine.nextQuestion();
      const currentQ = engine.getCurrentQuestion();
      ui.renderQuestion(currentQ);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // 6. Finalize Quiz & Calculate Results
  function handleQuizEnd(isTimeExpired = false) {
    isQuizActive = false;
    timer.stop();
    const elapsed = timer.getTimeElapsed();
    const results = engine.evaluateResults(elapsed);

    // Save to persistent storage
    recordQuizResult(results);

    // Render results view
    ui.renderResults(results);
    ui.switchView('results');

    if (isTimeExpired) {
      const timerBadge = document.getElementById('quiz-timer-badge');
      if (timerBadge) timerBadge.className = 'badge bg-danger text-white px-3 py-2 fs-6';
    }
  }

  // ==========================================
  // EVENT DELEGATION & LISTENERS
  // ==========================================

  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  // Navbar Navigation Links
  document.querySelectorAll('[data-nav-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-nav-view');
      if (target === 'home') {
        if (isQuizActive) {
          const quitModalEl = document.getElementById('quitQuizModal');
          if (quitModalEl && window.bootstrap) {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(quitModalEl);
            modalInstance.show();
            return;
          }
        }
        timer.stop();
        isQuizActive = false;
        ui.renderHome();
        ui.switchView('home');
      }
    });
  });

  // Mode Selection Start Buttons (Home Screen)
  document.getElementById('btn-start-quick')?.addEventListener('click', () => handleStartQuiz('QUICK'));
  document.getElementById('btn-start-full')?.addEventListener('click', () => handleStartQuiz('FULL'));
  document.getElementById('btn-start-complete')?.addEventListener('click', () => handleStartQuiz('COMPLETE'));

  // Option Click Delegation inside Quiz Options Container
  const optionsContainer = document.getElementById('quiz-options-container');
  if (optionsContainer) {
    optionsContainer.addEventListener('click', (e) => {
      const optionBtn = e.target.closest('.option-btn');
      if (optionBtn && !optionBtn.disabled) {
        const idx = parseInt(optionBtn.getAttribute('data-option-index'), 10);
        handleSelectOption(idx);
      }
    });
  }

  // Submit Answer Button Click
  document.getElementById('quiz-submit-btn')?.addEventListener('click', handleSubmitAnswer);

  // Dynamic Feedback Next Button Click (Delegated on Feedback Box)
  document.getElementById('quiz-feedback-box')?.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('#quiz-next-btn');
    if (nextBtn) {
      handleNextQuestion();
    }
  });

  // Quit Quiz Modal Confirmation
  document.getElementById('btn-confirm-quit')?.addEventListener('click', () => {
    isQuizActive = false;
    timer.stop();
    const quitModalEl = document.getElementById('quitQuizModal');
    if (quitModalEl && window.bootstrap) {
      const modalInstance = bootstrap.Modal.getInstance(quitModalEl);
      if (modalInstance) modalInstance.hide();
    }
    ui.renderHome();
    ui.switchView('home');
  });

  // Results Actions
  document.getElementById('btn-results-review')?.addEventListener('click', () => {
    const reviewData = engine.getReviewData();
    currentReviewFilter = 'all';
    ui.renderReview(reviewData, currentReviewFilter);
    ui.switchView('review');
  });

  document.getElementById('btn-results-retry')?.addEventListener('click', () => {
    handleStartQuiz(activeModeKey);
  });

  document.getElementById('btn-results-home')?.addEventListener('click', () => {
    ui.renderHome();
    ui.switchView('home');
  });

  // Review View Filter Buttons
  document.getElementById('review-filter-all')?.addEventListener('click', (e) => {
    document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    e.target.classList.add('active', 'btn-primary');
    currentReviewFilter = 'all';
    ui.renderReview(engine.getReviewData(), currentReviewFilter);
  });

  document.getElementById('review-filter-correct')?.addEventListener('click', (e) => {
    document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    e.target.classList.add('active', 'btn-primary');
    currentReviewFilter = 'correct';
    ui.renderReview(engine.getReviewData(), currentReviewFilter);
  });

  document.getElementById('review-filter-incorrect')?.addEventListener('click', (e) => {
    document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    e.target.classList.add('active', 'btn-primary');
    currentReviewFilter = 'incorrect';
    ui.renderReview(engine.getReviewData(), currentReviewFilter);
  });

  document.getElementById('btn-review-back-results')?.addEventListener('click', () => {
    ui.switchView('results');
  });

  document.getElementById('btn-review-home')?.addEventListener('click', () => {
    ui.renderHome();
    ui.switchView('home');
  });

  // Hint Button Toggle Handler
  const hintBtn = document.getElementById('quiz-hint-btn');
  const hintContainer = document.getElementById('quiz-hint-container');
  if (hintBtn && hintContainer) {
    hintBtn.addEventListener('click', () => {
      const isHidden = hintContainer.classList.contains('d-none');
      if (isHidden) {
        hintContainer.classList.remove('d-none');
        hintBtn.setAttribute('aria-expanded', 'true');
        hintBtn.className = 'btn btn-warning btn-sm text-dark fw-semibold';
      } else {
        hintContainer.classList.add('d-none');
        hintBtn.setAttribute('aria-expanded', 'false');
        hintBtn.className = 'btn btn-outline-warning btn-sm';
      }
    });
  }

  // Question Bank Modal Trigger & Live Filter Handlers
  const qbankModal = document.getElementById('questionBankModal');
  if (qbankModal) {
    qbankModal.addEventListener('show.bs.modal', () => {
      const searchInput = document.getElementById('qbank-search-input');
      const catFilter = document.getElementById('qbank-category-filter');
      const diffFilter = document.getElementById('qbank-difficulty-filter');

      const applyFilter = () => {
        ui.renderQuestionBankModal(
          searchInput ? searchInput.value : '',
          catFilter ? catFilter.value : 'ALL',
          diffFilter ? diffFilter.value : 'ALL'
        );
      };

      if (searchInput) searchInput.oninput = applyFilter;
      if (catFilter) catFilter.onchange = applyFilter;
      if (diffFilter) diffFilter.onchange = applyFilter;

      applyFilter();
    });
  }

  // Progress/History Modal Trigger
  const historyModal = document.getElementById('historyModal');
  if (historyModal) {
    historyModal.addEventListener('show.bs.modal', () => {
      ui.renderHistoryModal();
    });
  }

  // Clear History Button
  document.getElementById('btn-clear-history')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all quiz history and best scores? This cannot be undone.')) {
      clearAllHistory();
      ui.renderHistoryModal();
      ui.renderHome();
    }
  });

  // Keyboard Shortcuts (A/B/C/D, 1/2/3/4, Enter)
  document.addEventListener('keydown', (e) => {
    // Only capture when on quiz view and not focusing an input
    const quizView = document.getElementById('view-quiz');
    if (!quizView || quizView.classList.contains('d-none')) return;
    if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName?.toLowerCase())) return;

    const currentQ = engine.getCurrentQuestion();
    if (!currentQ) return;

    const key = e.key.toUpperCase();
    const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

    if (keyMap[key] !== undefined && (!currentQ.userAnswer || !currentQ.userAnswer.isSubmitted)) {
      e.preventDefault();
      handleSelectOption(keyMap[key]);
    } else if (e.key === 'Enter') {
      if (!currentQ.userAnswer || !currentQ.userAnswer.isSubmitted) {
        if (ui.selectedOptionIndex !== null) {
          e.preventDefault();
          handleSubmitAnswer();
        }
      } else {
        e.preventDefault();
        handleNextQuestion();
      }
    }
  });
});
