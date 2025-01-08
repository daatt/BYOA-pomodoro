let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const toggleMode = document.getElementById('toggle-mode');
const modeLabel = document.querySelector('.mode-label');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = `(${timeString}) ${mode} - Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    modeLabel.textContent = isWorkTime ? 'Break Mode' : 'Work Mode';
    toggleMode.checked = !isWorkTime;
    updateDisplay();
}

function toggleTimer() {
    if (timerId === null) {
        // Start the timer
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                toggleTimer();
            }
        }, 1000);
        startPauseButton.textContent = 'Pause';
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        startPauseButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    statusText.textContent = 'Work Time';
    toggleMode.checked = false;
    startPauseButton.textContent = 'Start';
    updateDisplay();
    document.title = 'Pomodoro Timer';
}

function manualToggle() {
    clearInterval(timerId);
    timerId = null;
    switchMode();
}

toggleMode.addEventListener('change', manualToggle);

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
resetTimer(); 