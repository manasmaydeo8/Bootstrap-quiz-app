/**
 * UI Module - DOM Rendering, View Swapping & Accessible Component Interactions
 */

import { CATEGORIES, QUESTIONS_DATA } from '../data/questions.js';
import { loadState } from './storage.js';

/**
 * Helper to escape HTML characters
 * @param {string} str 
 * @returns {string}
 */
export function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export class UIController {
  constructor() {
    this.views = {
      home: document.getElementById('view-home'),
      quiz: document.getElementById('view-quiz'),
      results: document.getElementById('view-results'),
      review: document.getElementById('view-review')
    };

    this.selectedOptionIndex = null;
  }

  /**
   * Switch active full-screen view
   * @param {'home'|'quiz'|'results'|'review'} targetView 
   */
  switchView(targetView) {
    Object.keys(this.views).forEach(key => {
      const el = this.views[key];
      if (el) {
        if (key === targetView) {
          el.classList.remove('d-none');
          el.setAttribute('aria-hidden', 'false');
        } else {
          el.classList.add('d-none');
          el.setAttribute('aria-hidden', 'true');
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Render Home view with storage stats and history
   */
  renderHome() {
    const state = loadState();

    // Render Best Scores
    const quickScoreEl = document.getElementById('home-best-quick');
    const fullScoreEl = document.getElementById('home-best-full');
    const completeScoreEl = document.getElementById('home-best-complete');

    if (quickScoreEl) quickScoreEl.textContent = `${state.bestScores.QUICK || 0}%`;
    if (fullScoreEl) fullScoreEl.textContent = `${state.bestScores.FULL || 0}%`;
    if (completeScoreEl) completeScoreEl.textContent = `${state.bestScores.COMPLETE || 0}%`;

    // Render Last Quiz Attempt
    const lastAttemptContainer = document.getElementById('home-last-attempt-container');
    if (lastAttemptContainer) {
      if (state.lastScore) {
        const dateStr = new Date(state.lastScore.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        lastAttemptContainer.innerHTML = `
          <div class="card border-primary-subtle shadow-sm bg-body-tertiary">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-primary">${escapeHTML(state.lastScore.mode)} MODE</span>
                <small class="text-body-secondary">${escapeHTML(dateStr)}</small>
              </div>
              <div class="d-flex align-items-center gap-3">
                <div class="display-6 fw-bold text-primary">${state.lastScore.percentage}%</div>
                <div>
                  <div class="fw-semibold">${escapeHTML(state.lastScore.tier.title)}</div>
                  <div class="text-body-secondary small">${state.lastScore.score} of ${state.lastScore.total} correct in ${Math.floor(state.lastScore.timeSpentSec / 60)}m ${state.lastScore.timeSpentSec % 60}s</div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        lastAttemptContainer.innerHTML = `
          <div class="card border-dashed bg-body-tertiary text-center py-4">
            <div class="card-body text-body-secondary">
              <i class="bi bi-journal-x fs-2 mb-2 d-block"></i>
              No quiz attempts yet. Choose a mode below to start practicing!
            </div>
          </div>
        `;
      }
    }

    // Render History count badge in nav
    const historyCountBadge = document.getElementById('nav-history-count');
    if (historyCountBadge) {
      historyCountBadge.textContent = state.history.length;
    }
  }

  /**
   * Render active question card in Quiz view
   * @param {object} questionContext 
   */
  renderQuestion(questionContext) {
    if (!questionContext) return;
    const { index, questionNumber, totalQuestions, data, categoryMeta, userAnswer } = questionContext;
    this.selectedOptionIndex = userAnswer ? userAnswer.selectedIndex : null;

    // 1. Question Counter & Progress Bar
    const counterEl = document.getElementById('quiz-question-counter');
    if (counterEl) {
      counterEl.textContent = `Question ${questionNumber} of ${totalQuestions}`;
    }

    const progressPercentage = Math.round(((index + 1) / totalQuestions) * 100);
    const progressBar = document.getElementById('quiz-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
      progressBar.textContent = `${progressPercentage}%`;
      progressBar.setAttribute('aria-valuenow', progressPercentage);
    }

    // 2. Category & Difficulty Badges
    const categoryBadge = document.getElementById('quiz-category-badge');
    if (categoryBadge) {
      categoryBadge.textContent = categoryMeta.name;
    }

    const difficultyBadge = document.getElementById('quiz-difficulty-badge');
    if (difficultyBadge) {
      difficultyBadge.textContent = data.difficulty;
      difficultyBadge.className = 'badge';
      if (data.difficulty === 'Easy') {
        difficultyBadge.classList.add('bg-success-subtle', 'text-success', 'border', 'border-success-subtle');
      } else if (data.difficulty === 'Medium') {
        difficultyBadge.classList.add('bg-warning-subtle', 'text-warning', 'border', 'border-warning-subtle');
      } else {
        difficultyBadge.classList.add('bg-danger-subtle', 'text-danger', 'border', 'border-danger-subtle');
      }
    }

    // 3. Question Text
    const questionTextEl = document.getElementById('quiz-question-text');
    if (questionTextEl) {
      questionTextEl.textContent = data.question;
    }

    // 4. Question Hint Handling
    const hintBtn = document.getElementById('quiz-hint-btn');
    const hintContainer = document.getElementById('quiz-hint-container');
    const hintTextEl = document.getElementById('quiz-hint-text');

    if (hintContainer) {
      hintContainer.classList.add('d-none');
    }
    if (hintBtn) {
      if (data.hint) {
        hintBtn.classList.remove('d-none');
        hintBtn.setAttribute('aria-expanded', 'false');
        hintBtn.className = 'btn btn-outline-warning btn-sm';
        if (hintTextEl) {
          hintTextEl.textContent = data.hint;
        }
      } else {
        hintBtn.classList.add('d-none');
      }
    }

    // 5. Options Radiogroup
    const optionsContainer = document.getElementById('quiz-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      data.options.forEach((optText, optIdx) => {
        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.className = 'list-group-item list-group-item-action p-3 rounded-3 mb-2 border option-btn text-start d-flex align-items-center gap-3 transition-all';
        optionBtn.id = `option-btn-${optIdx}`;
        optionBtn.setAttribute('data-option-index', optIdx);
        optionBtn.setAttribute('role', 'radio');
        optionBtn.setAttribute('aria-checked', this.selectedOptionIndex === optIdx ? 'true' : 'false');

        const isChecked = this.selectedOptionIndex === optIdx;
        if (isChecked) {
          optionBtn.classList.add('active', 'border-primary');
        }

        // Apply post-submit styles
        if (userAnswer && userAnswer.isSubmitted) {
          optionBtn.disabled = true;
          if (optIdx === data.correctAnswer) {
            optionBtn.classList.add('bg-success-subtle', 'border-success', 'text-success-emphasis');
          } else if (optIdx === userAnswer.selectedIndex && !userAnswer.isCorrect) {
            optionBtn.classList.add('bg-danger-subtle', 'border-danger', 'text-danger-emphasis');
          }
        }

        const letterBadge = document.createElement('span');
        letterBadge.className = `badge ${isChecked ? 'bg-light text-primary' : 'bg-secondary'} rounded-circle option-letter-badge p-2 d-inline-flex justify-content-center align-items-center`;
        letterBadge.style.width = '32px';
        letterBadge.style.height = '32px';
        letterBadge.textContent = letters[optIdx];

        const textSpan = document.createElement('span');
        textSpan.className = 'flex-grow-1 option-text';
        textSpan.textContent = optText;

        optionBtn.appendChild(letterBadge);
        optionBtn.appendChild(textSpan);

        if (userAnswer && userAnswer.isSubmitted) {
          if (optIdx === data.correctAnswer) {
            const checkIcon = document.createElement('i');
            checkIcon.className = 'bi bi-check-circle-fill text-success fs-5';
            optionBtn.appendChild(checkIcon);
          } else if (optIdx === userAnswer.selectedIndex && !userAnswer.isCorrect) {
            const crossIcon = document.createElement('i');
            crossIcon.className = 'bi bi-x-circle-fill text-danger fs-5';
            optionBtn.appendChild(crossIcon);
          }
        }

        optionsContainer.appendChild(optionBtn);
      });
    }

    // 6. Submit Button & Feedback Box Synchronization
    const submitBtn = document.getElementById('quiz-submit-btn');
    const feedbackBox = document.getElementById('quiz-feedback-box');

    if (userAnswer && userAnswer.isSubmitted) {
      if (submitBtn) submitBtn.classList.add('d-none');
      if (feedbackBox) {
        feedbackBox.classList.remove('d-none');
        this.renderFeedbackBox(userAnswer.isCorrect, data.options[data.correctAnswer], data.explanation, questionContext.index === questionContext.totalQuestions - 1);
      }
    } else {
      if (submitBtn) {
        submitBtn.classList.remove('d-none');
        submitBtn.disabled = this.selectedOptionIndex === null;
      }
      if (feedbackBox) feedbackBox.classList.add('d-none');
    }
  }

  /**
   * Render question feedback alert box
   */
  renderFeedbackBox(isCorrect, correctAnswerText, explanation, isLastQuestion) {
    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (!feedbackBox) return;

    feedbackBox.className = `alert ${isCorrect ? 'alert-success border-success' : 'alert-danger border-danger'} mt-4 p-4 rounded-3 shadow-sm`;
    feedbackBox.setAttribute('role', 'alert');
    feedbackBox.setAttribute('aria-live', 'assertive');

    feedbackBox.innerHTML = `
      <div class="d-flex align-items-start gap-3">
        <i class="bi ${isCorrect ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'} fs-2"></i>
        <div class="flex-grow-1">
          <h5 class="alert-heading fw-bold mb-1">${isCorrect ? 'Correct! Excellent deduction.' : 'Incorrect.'}</h5>
          ${!isCorrect ? `<p class="mb-2"><strong>Correct Answer:</strong> ${escapeHTML(correctAnswerText)}</p>` : ''}
          <div class="explanation-content small mt-2 pt-2 border-top border-secondary-subtle">
            <strong>Explanation:</strong> ${escapeHTML(explanation)}
          </div>
        </div>
      </div>
      <div class="text-end mt-3">
        <button id="quiz-next-btn" class="btn ${isCorrect ? 'btn-success' : 'btn-primary'} px-4 fw-semibold" type="button">
          ${isLastQuestion ? 'Finish & View Results <i class="bi bi-trophy-fill ms-1"></i>' : 'Next Question <i class="bi bi-arrow-right ms-1"></i>'}
        </button>
      </div>
    `;
  }

  /**
   * Update countdown timer display
   * @param {string} formattedTime 
   * @param {boolean} isWarning 
   */
  updateTimerDisplay(formattedTime, isWarning = false) {
    const timerEl = document.getElementById('quiz-timer-display');
    const timerBadge = document.getElementById('quiz-timer-badge');
    if (timerEl) timerEl.textContent = formattedTime;
    if (timerBadge) {
      if (isWarning) {
        timerBadge.className = 'badge bg-danger text-white timer-warning-pulse px-3 py-2 fs-6';
      } else {
        timerBadge.className = 'badge bg-body-secondary text-body-emphasis border px-3 py-2 fs-6';
      }
    }
  }

  /**
   * Render Final Results Scorecard
   * @param {object} results 
   */
  renderResults(results) {
    const scoreVal = document.getElementById('results-score-value');
    const percentageVal = document.getElementById('results-percentage-value');
    const tierBadge = document.getElementById('results-tier-badge');
    const feedbackText = document.getElementById('results-feedback-text');
    const timeVal = document.getElementById('results-time-taken');
    const correctVal = document.getElementById('results-correct-count');
    const incorrectVal = document.getElementById('results-incorrect-count');
    const unansweredVal = document.getElementById('results-unanswered-count');

    if (scoreVal) scoreVal.textContent = `${results.score} / ${results.total}`;
    if (percentageVal) percentageVal.textContent = `${results.percentage}%`;
    if (tierBadge) {
      tierBadge.textContent = results.tier.title;
      tierBadge.className = `badge ${results.tier.badgeClass} px-3 py-2 fs-6 mb-2`;
    }
    if (feedbackText) feedbackText.textContent = results.tier.feedback;
    
    const minutes = Math.floor(results.timeSpentSec / 60);
    const seconds = results.timeSpentSec % 60;
    if (timeVal) timeVal.textContent = `${minutes}m ${seconds}s`;
    if (correctVal) correctVal.textContent = results.correctCount;
    if (incorrectVal) incorrectVal.textContent = results.incorrectCount;
    if (unansweredVal) unansweredVal.textContent = results.unansweredCount;

    const resultsBar = document.getElementById('results-progress-bar');
    if (resultsBar) {
      resultsBar.style.width = `${results.percentage}%`;
      resultsBar.className = `progress-bar ${results.percentage >= 75 ? 'bg-success' : results.percentage >= 50 ? 'bg-primary' : 'bg-warning'}`;
    }
  }

  /**
   * Render Comprehensive Review Screen
   * @param {Array} reviewItems 
   * @param {'all'|'correct'|'incorrect'} filter 
   */
  renderReview(reviewItems, filter = 'all') {
    const reviewContainer = document.getElementById('review-list-container');
    if (!reviewContainer) return;

    reviewContainer.innerHTML = '';

    const filtered = reviewItems.filter(item => {
      if (filter === 'correct') return item.isCorrect;
      if (filter === 'incorrect') return !item.isCorrect;
      return true;
    });

    if (filtered.length === 0) {
      reviewContainer.innerHTML = `
        <div class="card border-dashed p-4 text-center text-body-secondary my-4">
          <p class="mb-0">No questions match the current filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `card mb-3 border ${item.isCorrect ? 'border-success-subtle' : 'border-danger-subtle'} shadow-sm`;

      card.innerHTML = `
        <div class="card-header bg-body-tertiary d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-secondary">Q${item.questionNumber}</span>
            <span class="badge bg-info-subtle text-info border border-info-subtle">${escapeHTML(item.categoryName)}</span>
            <span class="badge ${item.difficulty === 'Easy' ? 'bg-success-subtle text-success' : item.difficulty === 'Medium' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}">${escapeHTML(item.difficulty)}</span>
            ${item.hint ? '<span class="badge bg-warning-subtle text-warning border border-warning-subtle"><i class="bi bi-lightbulb-fill me-1"></i>Hint Available</span>' : ''}
          </div>
          <div>
            ${item.isCorrect 
              ? '<span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Correct</span>'
              : '<span class="badge bg-danger"><i class="bi bi-x-circle me-1"></i> Incorrect</span>'}
          </div>
        </div>
        <div class="card-body">
          <h6 class="card-title fw-bold mb-3">${escapeHTML(item.question)}</h6>
          ${item.hint ? `
            <div class="alert alert-warning-subtle border border-warning-subtle py-2 px-3 mb-3 small d-flex align-items-center gap-2">
              <i class="bi bi-lightbulb-fill text-warning flex-shrink-0"></i>
              <div><strong>Hint:</strong> ${escapeHTML(item.hint)}</div>
            </div>
          ` : ''}

          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <div class="p-3 rounded-2 border ${item.isCorrect ? 'bg-success-subtle border-success' : 'bg-danger-subtle border-danger'}">
                <small class="d-block text-body-secondary fw-semibold mb-1">Your Answer:</small>
                <div class="fw-bold">${escapeHTML(item.userAnswerText)}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded-2 border bg-success-subtle border-success">
                <small class="d-block text-body-secondary fw-semibold mb-1">Correct Answer:</small>
                <div class="fw-bold text-success-emphasis">${escapeHTML(item.correctAnswerText)}</div>
              </div>
            </div>
          </div>

          <div class="alert alert-light border mb-0 small">
            <i class="bi bi-info-circle-fill text-primary me-1"></i>
            <strong>Explanation:</strong> ${escapeHTML(item.explanation)}
          </div>
        </div>
      `;

      reviewContainer.appendChild(card);
    });
  }

  /**
   * Render Question Bank browser modal
   */
  renderQuestionBankModal(searchQuery = '', categoryFilter = 'ALL', difficultyFilter = 'ALL') {
    const listContainer = document.getElementById('qbank-list-container');
    const countBadge = document.getElementById('qbank-results-count');
    if (!listContainer) return;

    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filtered = QUESTIONS_DATA.filter(q => {
      const matchSearch = trimmedQuery === '' || 
        q.question.toLowerCase().includes(trimmedQuery) || 
        (q.hint && q.hint.toLowerCase().includes(trimmedQuery)) ||
        q.options.some(opt => opt.toLowerCase().includes(trimmedQuery)) ||
        q.explanation.toLowerCase().includes(trimmedQuery);
      
      const matchCategory = categoryFilter === 'ALL' || q.category === categoryFilter;
      const matchDifficulty = difficultyFilter === 'ALL' || q.difficulty === difficultyFilter;

      return matchSearch && matchCategory && matchDifficulty;
    });

    if (countBadge) countBadge.textContent = `${filtered.length} of ${QUESTIONS_DATA.length} Questions`;

    listContainer.innerHTML = '';
    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-5 text-body-secondary">
          <i class="bi bi-search fs-1 mb-2 d-block"></i>
          No questions match the filter criteria.
        </div>
      `;
      return;
    }

    const accordion = document.createElement('div');
    accordion.className = 'accordion accordion-flush';
    accordion.id = 'qbankAccordion';

    filtered.forEach((q) => {
      const item = document.createElement('div');
      item.className = 'accordion-item border rounded-3 mb-2';
      const categoryName = (CATEGORIES[q.category] && CATEGORIES[q.category].name) || q.category;

      item.innerHTML = `
        <h2 class="accordion-header" id="heading-${q.id}">
          <button class="accordion-button collapsed gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${q.id}" aria-expanded="false" aria-controls="collapse-${q.id}">
            <span class="badge bg-secondary font-monospace">${q.id}</span>
            <span class="badge ${q.difficulty === 'Easy' ? 'bg-success' : q.difficulty === 'Medium' ? 'bg-warning text-dark' : 'bg-danger'}">${q.difficulty}</span>
            <span class="text-truncate flex-grow-1">${escapeHTML(q.question)}</span>
          </button>
        </h2>
        <div id="collapse-${q.id}" class="accordion-collapse collapse" aria-labelledby="heading-${q.id}" data-bs-parent="#qbankAccordion">
          <div class="accordion-body">
            <div class="d-flex gap-2 mb-2 flex-wrap align-items-center">
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle">${escapeHTML(categoryName)}</span>
              ${q.hint ? '<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle"><i class="bi bi-lightbulb-fill me-1"></i>Hint Available</span>' : ''}
            </div>
            ${q.hint ? `
              <div class="alert alert-warning-subtle border border-warning-subtle py-2 px-3 mb-3 small d-flex align-items-center gap-2">
                <i class="bi bi-lightbulb-fill text-warning flex-shrink-0"></i>
                <div><strong>Hint:</strong> ${escapeHTML(q.hint)}</div>
              </div>
            ` : ''}
            <h6 class="fw-bold mb-2">Options:</h6>
            <div class="list-group mb-3">
              ${q.options.map((opt, oIdx) => `
                <div class="list-group-item d-flex align-items-center justify-content-between ${oIdx === q.correctAnswer ? 'list-group-item-success fw-bold' : ''}">
                  <span>${escapeHTML(opt)}</span>
                  ${oIdx === q.correctAnswer ? '<span class="badge bg-success"><i class="bi bi-check-lg"></i> Correct Answer</span>' : ''}
                </div>
              `).join('')}
            </div>
            <div class="alert alert-info py-2 px-3 small mb-0">
              <strong>Explanation:</strong> ${escapeHTML(q.explanation)}
            </div>
          </div>
        </div>
      `;
      accordion.appendChild(item);
    });

    listContainer.appendChild(accordion);
  }

  /**
   * Render History Modal
   */
  renderHistoryModal() {
    const state = loadState();
    const historyList = document.getElementById('history-modal-list');
    if (!historyList) return;

    if (!state.history || state.history.length === 0) {
      historyList.innerHTML = `
        <div class="text-center py-5 text-body-secondary">
          <i class="bi bi-clock-history fs-1 mb-2 d-block"></i>
          No quiz history found.
        </div>
      `;
      return;
    }

    historyList.innerHTML = `
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Date</th>
              <th>Mode</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Tier</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            ${state.history.map(item => `
              <tr>
                <td><small class="text-body-secondary">${escapeHTML(new Date(item.date).toLocaleDateString())} ${escapeHTML(new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</small></td>
                <td><span class="badge bg-secondary">${escapeHTML(item.mode)}</span></td>
                <td><strong>${item.score}</strong> / ${item.total}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <span class="fw-bold">${item.percentage}%</span>
                    <div class="progress flex-grow-1" style="height: 6px; min-width: 50px;">
                      <div class="progress-bar ${item.percentage >= 75 ? 'bg-success' : item.percentage >= 50 ? 'bg-primary' : 'bg-warning'}" style="width: ${item.percentage}%"></div>
                    </div>
                  </div>
                </td>
                <td><span class="badge ${item.tier ? escapeHTML(item.tier.badgeClass) : 'bg-primary'}">${item.tier ? escapeHTML(item.tier.title) : 'Complete'}</span></td>
                <td><small>${Math.floor(item.timeSpentSec / 60)}m ${item.timeSpentSec % 60}s</small></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}
