/**
 * Timer Module - Accurate Countdown and Stopwatch Controller with Drift Compensation
 */

export class QuizTimer {
  constructor() {
    this.intervalId = null;
    this.totalDurationSec = 0;
    this.remainingSec = 0;
    this.elapsedSec = 0;
    this.isCountdown = true;
    this.isRunning = false;
    this.startTime = 0;
    this.onTick = null;
    this.onExpire = null;
  }

  /**
   * Start or reset timer
   * @param {number} durationSec - 0 for count-up/untimed, >0 for countdown
   * @param {Function} onTick - Callback receiving (remainingSec, elapsedSec, formattedRemaining)
   * @param {Function} onExpire - Callback triggered when countdown hits 0
   */
  start(durationSec, onTick, onExpire) {
    this.stop();

    this.totalDurationSec = Math.max(0, durationSec);
    this.isCountdown = this.totalDurationSec > 0;
    this.remainingSec = this.totalDurationSec;
    this.elapsedSec = 0;
    this.startTime = Date.now();
    this.onTick = onTick;
    this.onExpire = onExpire;
    this.isRunning = true;

    // Trigger immediate tick
    this._dispatchTick();

    this.intervalId = setInterval(() => {
      if (!this.isRunning) return;

      const now = Date.now();
      const realElapsed = Math.floor((now - this.startTime) / 1000);
      this.elapsedSec = realElapsed;

      if (this.isCountdown) {
        this.remainingSec = Math.max(0, this.totalDurationSec - realElapsed);

        if (this.remainingSec <= 0) {
          this.remainingSec = 0;
          this.stop();
          this._dispatchTick();
          if (this.onExpire) {
            this.onExpire();
          }
          return;
        }
      }

      this._dispatchTick();
    }, 250); // High frequency check for smooth UI updates without drift
  }

  _dispatchTick() {
    if (this.onTick) {
      const displaySec = this.isCountdown ? this.remainingSec : this.elapsedSec;
      this.onTick(this.remainingSec, this.elapsedSec, this.getFormattedTime(displaySec));
    }
  }

  /**
   * Stop and clear the timer interval
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  /**
   * Format seconds to MM:SS string
   * @param {number} totalSeconds 
   * @returns {string}
   */
  getFormattedTime(totalSeconds = (this.isCountdown ? this.remainingSec : this.elapsedSec)) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  /**
   * Get total elapsed time in seconds
   * @returns {number}
   */
  getTimeElapsed() {
    return this.elapsedSec;
  }
}
