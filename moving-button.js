const button = document.getElementById("gameButton");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");

const hitSound = document.getElementById("hitSound");
const gameOverSound = document.getElementById("gameOverSound");

const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");
const saveSettingsBtn = document.getElementById("saveSettings");

let gameRunning = false;

settingsButton.addEventListener("click", () => {
  if (!gameRunning) {
    const isPanelHiden = settingsPanel.style.display === "none";
    if (isPanelHiden)
      settingsPanel.style.display = "block";
  } 
});

saveSettingsBtn.addEventListener("click", () => {

  settingsPanel.style.display = "none";
  if (gameRunning) return; 
    saveSettings();
  alert("Settings saved!");
});


let highScore = 0;

let score = 0;
let timeLeft = 0;

let gameInterval = null;
let autoMoveInterval = null;
let hitTimer = null;

let targetSize = 200;     // in px
let adjustHitPercent = 20; // % faster per hit
let gameTimeLimit = 15;         // seconds
loadSettings();

// move button to random place
function moveButton() {
  button.style.width = targetSize + "px";
  button.style.height = targetSize + "px";
  const x = Math.random() * (window.innerWidth - targetSize);
  const y = Math.random() * (window.innerHeight - targetSize);
  button.style.left = x + "px";
  button.style.top = y + "px";
}


function startGame() {
  gameRunning = true;
  settingsPanel.style.display = "none";
  score = 0;
  timeLeft = gameTimeLimit;
  timeText.textContent = timeLeft;
  highScoreDisplay.textContent = "High Score: " + highScore

  button.textContent = "Target";
  button.style.backgroundColor = "red";

  moveButton();
  button.disabled = false;
  moveDelay = 2000; // time between moves

  autoMoveInterval = setInterval(autoMove, moveDelay);
  gameInterval = setInterval(updateTimer, 1000);
}
button.textContent = "Start";
button.style.backgroundColor = "green";
button.disabled = false;

button.addEventListener("click", function startOrPlay() {
  if (button.textContent === "Start" || button.textContent === "Restart") {
    startGame();
  } else if (button.textContent === "Target") {
    handleHit();
  }
});
let moveDelay = 2000;
let canMove = true;

function updateTimer() {
  timeLeft-=1;
  timeText.textContent = timeLeft;
  if (timeLeft==0) {
    endGame();
  }
}
function saveSettings() {
    targetSize = document.getElementById("inputSize").value;
    adjustHitPercent = document.getElementById("inputHitSpeed").value;
    gameTimeLimit = document.getElementById("inputTime").value;
    const settings = {
        targetSize: targetSize,
        adjustHitPercent: adjustHitPercent,
        gameTimeLimit: gameTimeLimit
    };
console.log(document.getElementById("inputSize").value)
    localStorage.setItem("movingButtonSettings", JSON.stringify(settings));
}
function loadSettings() {
  document.getElementById("inputSize").value = targetSize; 
  document.getElementById("inputHitSpeed").value = adjustHitPercent;
  document.getElementById("inputTime").value = gameTimeLimit;
    const saved = localStorage.getItem("movingButtonSettings");
    if (!saved) return; // Nothing saved yet

    const settings = JSON.parse(saved);

    targetSize = settings.targetSize;
    adjustHitPercent = settings.adjustHitPercent;
    gameTimeLimit = settings.gameTimeLimit;
}

function handleHit() {
  moveButton();
  adjustSpeed(true); // speed up after hit
  score++;
  scoreText.textContent = score;
  clearInterval(autoMoveInterval);
  autoMoveInterval = setInterval(autoMove, moveDelay);
  hitSound.currentTime = 0;
  hitSound.play();
}

function adjustSpeed(faster) {
  if (faster) {
    moveDelay = moveDelay * (1 - adjustHitPercent / 100);
  } else {
    moveDelay = moveDelay * (1 + adjustHitPercent / 100);
  }
}

function autoMove() {
  if (canMove) {
    moveButton();
    adjustSpeed(false); // slow down when auto moves
    clearInterval(autoMoveInterval);
    autoMoveInterval = setInterval(autoMove, moveDelay);
  }
}

function endGame() {
  gameOverSound.play();
  clearInterval(autoMoveInterval);
  clearInterval(gameInterval);
  button.textContent = "Restart";
  button.style.backgroundColor = "green";
  alert("Time’s up! You scored " + score + " points!");
  moveDelay = 2000;
  gameRunning = false;

}