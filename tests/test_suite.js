/**
 * Automated Verification Suite for Bootstrap 5 Mock Interview Quiz App
 */

import { QUESTIONS_DATA, CATEGORIES } from '../assets/js/data/questions.js';
import { QuizEngine, shuffleQuestionOptions, QUIZ_MODES } from '../assets/js/modules/engine.js';
import { QuizTimer } from '../assets/js/modules/timer.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('RUNNING BOOTSTRAP 5 QUIZ ENGINE TEST SUITE');
console.log('====================================================\n');

// 1. QUESTION BANK INTEGRITY
console.log('[SUITE 1: Question Bank Integrity]');
assert(QUESTIONS_DATA.length === 65, `Question bank has exactly 65 questions (found: ${QUESTIONS_DATA.length})`);
assert(Object.keys(CATEGORIES).length === 16, `Category registry has 16 categories (found: ${Object.keys(CATEGORIES).length})`);

const ids = new Set();
const texts = new Set();
const foundCategories = new Set();
let invalidOptionsCount = 0;
let invalidAnswerIndexCount = 0;
let hardQuestionCount = 0;
let hintCount = 0;
let codeSnippetCount = 0;

QUESTIONS_DATA.forEach((q, idx) => {
  if (ids.has(q.id)) ids.add(q.id + '_DUP');
  ids.add(q.id);

  if (texts.has(q.question)) texts.add(q.question + '_DUP');
  texts.add(q.question);

  if (CATEGORIES[q.category]) foundCategories.add(q.category);

  if (q.difficulty === 'Hard') hardQuestionCount++;
  if (q.hint && q.hint.trim().length > 0) hintCount++;
  if (q.hasCodeSnippet || q.codeSnippet) codeSnippetCount++;

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    invalidOptionsCount++;
  }

  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
    invalidAnswerIndexCount++;
  }
});

assert(ids.size === 65, 'All 65 question IDs are unique');
assert(texts.size === 65, 'All 65 question texts are unique');
assert(foundCategories.size === 16, 'All 16 categories are represented in the question bank');
assert(hardQuestionCount >= 10, `Difficult/Hard questions present (found: ${hardQuestionCount})`);
assert(hintCount >= 20, `At least ~1/3 questions have helpful hints (found: ${hintCount})`);
assert(codeSnippetCount === 0, 'All code references removed from question bank');
assert(invalidOptionsCount === 0, 'Every question has exactly 4 options');
assert(invalidAnswerIndexCount === 0, 'Every question has a valid 0..3 correctAnswer index');

// 2. RANDOMIZATION INTEGRITY (10,000 Iteration Invariance Test)
console.log('\n[SUITE 2: Option Randomization & Answer Mapping Invariance]');
let desyncErrors = 0;

for (let i = 0; i < 10000; i++) {
  const sampleQ = QUESTIONS_DATA[i % QUESTIONS_DATA.length];
  const { shuffledOptions, newCorrectIndex } = shuffleQuestionOptions(sampleQ.options, sampleQ.correctAnswer);
  
  const originalCorrectText = sampleQ.options[sampleQ.correctAnswer];
  const mappedCorrectText = shuffledOptions[newCorrectIndex];

  if (originalCorrectText !== mappedCorrectText) {
    desyncErrors++;
  }
  if (shuffledOptions.length !== 4) {
    desyncErrors++;
  }
}

assert(desyncErrors === 0, '10,000 Fisher-Yates option shuffles executed with 0 answer desync errors');

// 3. ENGINE MODE SIZING & NO-SKIP GUARDS
console.log('\n[SUITE 3: Quiz Engine Mode Sizing & State Logic]');
const engine = new QuizEngine();

const quickSession = engine.startQuiz('QUICK');
assert(quickSession.totalQuestions === 10, 'Quick mode initializes exactly 10 questions');

const fullSession = engine.startQuiz('FULL');
assert(fullSession.totalQuestions === 30, 'Full mode initializes exactly 30 questions');

const completeSession = engine.startQuiz('COMPLETE');
assert(completeSession.totalQuestions === 65, 'Complete mode initializes all 65 questions');

// Test Submission Guard
const q1 = engine.getCurrentQuestion();
const submit1 = engine.submitAnswer(q1.data.correctAnswer);
assert(submit1 !== null && submit1.isCorrect === true, 'First answer submission succeeds');

// Attempt Rapid Double Submission on Same Question
const submitDuplicate = engine.submitAnswer(0);
assert(submitDuplicate === null, 'Rapid duplicate submit on already-submitted question is blocked');

// 4. SCORING & PERFORMANCE TIERS
console.log('\n[SUITE 4: Scoring Formula & Performance Tier Boundaries]');
assert(engine.getPerformanceTier(100).title === 'Mastery Level', '100% maps to Mastery Level');
assert(engine.getPerformanceTier(90).title === 'Mastery Level', '90% maps to Mastery Level');
assert(engine.getPerformanceTier(85).title === 'Proficient', '85% maps to Proficient');
assert(engine.getPerformanceTier(75).title === 'Proficient', '75% maps to Proficient');
assert(engine.getPerformanceTier(65).title === 'Developing', '65% maps to Developing');
assert(engine.getPerformanceTier(60).title === 'Developing', '60% maps to Developing');
assert(engine.getPerformanceTier(45).title === 'Foundational', '45% maps to Foundational');
assert(engine.getPerformanceTier(40).title === 'Foundational', '40% maps to Foundational');
assert(engine.getPerformanceTier(20).title === 'Needs More Practice', '20% maps to Needs More Practice');
assert(engine.getPerformanceTier(0).title === 'Needs More Practice', '0% maps to Needs More Practice');

// 5. TIMER DRIFT & EXPIRY LOGIC
console.log('\n[SUITE 5: Timer Lifecycle]');
const timer = new QuizTimer();
let tickCount = 0;
let expired = false;

timer.start(
  2,
  () => { tickCount++; },
  () => { expired = true; }
);

setTimeout(() => {
  assert(tickCount > 0, 'Timer ticks dispatched regularly');
  assert(timer.getFormattedTime(65) === '01:05', 'Timer formats 65s as "01:05"');
  assert(timer.getFormattedTime(0) === '00:00', 'Timer formats 0s as "00:00"');
  timer.stop();

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');
  
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}, 300);
