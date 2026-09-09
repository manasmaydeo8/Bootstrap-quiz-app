/**
 * Quiz Engine Module - State Management, Shuffling & Scoring
 */

import { QUESTIONS_DATA, CATEGORIES } from '../data/questions.js';

export const QUIZ_MODES = {
  QUICK: {
    id: 'QUICK',
    name: 'Quick Sprint',
    count: 10,
    timeLimitSec: 600, // 10 minutes
    description: '10 randomized questions with a 10-minute timer for quick practice.'
  },
  FULL: {
    id: 'FULL',
    name: 'Full Mock Exam',
    count: 30,
    timeLimitSec: 900, // 15 minutes
    description: '30 questions covering all major categories with a 15-minute countdown.'
  },
  COMPLETE: {
    id: 'COMPLETE',
    name: 'Complete Question Bank',
    count: QUESTIONS_DATA.length, // 65 questions
    timeLimitSec: 0, // Untimed
    description: 'All 65 curated questions with an untimed stop-clock for comprehensive mastery.'
  }
};

/**
 * Perform Fisher-Yates array shuffle in place
 * @param {Array} array 
 * @returns {Array} new shuffled array
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffle 4 options for a question while preserving correct answer mapping
 * @param {Array<string>} originalOptions 
 * @param {number} originalCorrectIndex 
 * @returns {{ shuffledOptions: Array<string>, newCorrectIndex: number }}
 */
export function shuffleQuestionOptions(originalOptions, originalCorrectIndex) {
  const mapped = originalOptions.map((text, idx) => ({
    text,
    isCorrect: idx === originalCorrectIndex
  }));

  const shuffled = shuffleArray(mapped);
  return {
    shuffledOptions: shuffled.map(item => item.text),
    newCorrectIndex: shuffled.findIndex(item => item.isCorrect)
  };
}

export class QuizEngine {
  constructor() {
    this.mode = 'QUICK';
    this.sessionQuestions = [];
    this.currentIndex = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.timeSpentSec = 0;
  }

  /**
   * Initialize a new quiz session
   * @param {'QUICK'|'FULL'|'COMPLETE'} modeKey 
   */
  startQuiz(modeKey = 'QUICK') {
    const modeConfig = QUIZ_MODES[modeKey] || QUIZ_MODES.QUICK;
    this.mode = modeConfig.id;
    this.currentIndex = 0;
    this.isCompleted = false;
    this.timeSpentSec = 0;

    // Pick randomized question pool without repeats
    const pool = shuffleArray(QUESTIONS_DATA).slice(0, Math.min(modeConfig.count, QUESTIONS_DATA.length));

    // Process and shuffle options for each selected question
    this.sessionQuestions = pool.map(rawQ => {
      const { shuffledOptions, newCorrectIndex } = shuffleQuestionOptions(rawQ.options, rawQ.correctAnswer);
      return {
        ...rawQ,
        options: shuffledOptions,
        correctAnswer: newCorrectIndex,
        originalCorrectAnswer: rawQ.correctAnswer
      };
    });

    // Initialize answer records
    this.userAnswers = this.sessionQuestions.map(() => ({
      selectedIndex: null,
      isCorrect: false,
      isSubmitted: false
    }));

    return {
      mode: this.mode,
      modeConfig,
      totalQuestions: this.sessionQuestions.length,
      firstQuestion: this.getCurrentQuestion()
    };
  }

  /**
   * Get current question details
   */
  getCurrentQuestion() {
    if (!this.sessionQuestions.length || this.currentIndex < 0 || this.currentIndex >= this.sessionQuestions.length) {
      return null;
    }
    const currentQ = this.sessionQuestions[this.currentIndex];
    return {
      index: this.currentIndex,
      questionNumber: this.currentIndex + 1,
      totalQuestions: this.sessionQuestions.length,
      data: currentQ,
      categoryMeta: CATEGORIES[currentQ.category] || { id: currentQ.category, name: 'General Bootstrap' },
      userAnswer: this.userAnswers[this.currentIndex] || { selectedIndex: null, isCorrect: false, isSubmitted: false }
    };
  }

  /**
   * Submit answer for the active question
   * @param {number} selectedOptionIndex 
   */
  submitAnswer(selectedOptionIndex) {
    if (this.isCompleted) return null;
    if (this.currentIndex < 0 || this.currentIndex >= this.sessionQuestions.length) return null;

    // Guard against rapid duplicate submissions
    if (this.userAnswers[this.currentIndex] && this.userAnswers[this.currentIndex].isSubmitted) {
      return null;
    }

    const currentQ = this.sessionQuestions[this.currentIndex];
    if (!currentQ) return null;

    const isCorrect = selectedOptionIndex === currentQ.correctAnswer;
    this.userAnswers[this.currentIndex] = {
      selectedIndex: selectedOptionIndex,
      isCorrect,
      isSubmitted: true
    };

    return {
      isCorrect,
      correctAnswerIndex: currentQ.correctAnswer,
      correctAnswerText: currentQ.options[currentQ.correctAnswer],
      explanation: currentQ.explanation,
      isLastQuestion: this.currentIndex === this.sessionQuestions.length - 1
    };
  }

  /**
   * Advance to the next question
   * @returns {boolean} true if moved, false if reached the end
   */
  nextQuestion() {
    if (this.currentIndex < this.sessionQuestions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  /**
   * Go back to previous question
   */
  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  /**
   * Check if current question is the last one
   */
  isLastQuestion() {
    return this.currentIndex >= this.sessionQuestions.length - 1;
  }

  /**
   * Evaluate and finalize session results
   * @param {number} timeElapsedSec 
   */
  evaluateResults(timeElapsedSec = 0) {
    this.isCompleted = true;
    this.timeSpentSec = Math.max(0, timeElapsedSec);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    this.userAnswers.forEach(ans => {
      if (!ans || !ans.isSubmitted || ans.selectedIndex === null) {
        unansweredCount++;
      } else if (ans.isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const total = this.sessionQuestions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const tier = this.getPerformanceTier(percentage);

    return {
      mode: this.mode,
      score: correctCount,
      total,
      percentage,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSec: this.timeSpentSec,
      tier,
      date: new Date().toISOString()
    };
  }

  /**
   * Map percentage to performance tier
   * @param {number} percentage 
   */
  getPerformanceTier(percentage) {
    if (percentage >= 90) {
      return {
        title: 'Mastery Level',
        badgeClass: 'bg-success',
        textClass: 'text-success',
        feedback: 'Outstanding! You demonstrate production-ready Bootstrap 5 expertise.'
      };
    }
    if (percentage >= 75) {
      return {
        title: 'Proficient',
        badgeClass: 'bg-primary',
        textClass: 'text-primary',
        feedback: 'Solid grasp! Ready for technical interview loops with minor brush-up.'
      };
    }
    if (percentage >= 60) {
      return {
        title: 'Developing',
        badgeClass: 'bg-info',
        textClass: 'text-info',
        feedback: 'Good foundation! Review responsive grid nesting and utility edge cases.'
      };
    }
    if (percentage >= 40) {
      return {
        title: 'Foundational',
        badgeClass: 'bg-warning',
        textClass: 'text-warning',
        feedback: 'Keep practicing! Review Bootstrap 4 vs 5 syntax differences and breakpoints.'
      };
    }
    return {
      title: 'Needs More Practice',
      badgeClass: 'bg-secondary',
      textClass: 'text-secondary',
      feedback: 'Great start! Dedicate time to core containers, grid units, and spacing classes.'
    };
  }

  /**
   * Produce comprehensive review list of all attempted questions
   */
  getReviewData() {
    return this.sessionQuestions.map((q, idx) => {
      const ans = this.userAnswers[idx] || { selectedIndex: null, isCorrect: false, isSubmitted: false };
      return {
        index: idx,
        questionNumber: idx + 1,
        id: q.id,
        category: q.category,
        categoryName: (CATEGORIES[q.category] && CATEGORIES[q.category].name) || q.category,
        difficulty: q.difficulty,
        hint: q.hint || '',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        correctAnswerText: q.options[q.correctAnswer],
        userAnswerIndex: ans.selectedIndex,
        userAnswerText: ans.selectedIndex !== null ? q.options[ans.selectedIndex] : 'Not Answered',
        isCorrect: Boolean(ans.isCorrect),
        isSubmitted: Boolean(ans.isSubmitted),
        explanation: q.explanation
      };
    });
  }
}
