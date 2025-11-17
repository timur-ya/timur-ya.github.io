const button = document.getElementById("gameButton");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");

const hitSound = document.getElementById("hitSound");
const gameOverSound = document.getElementById("gameOverSound");

const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");
const saveSettings = document.getElementById("saveSettings");

let gameRunning = false;

settingsButton.addEventListener("click", () => {
  if (!gameRunning) {
    const isPanelHiden = settingsPanel.style.display === "none";
    if (isPanelHiden)
      settingsPanel.style.display = "block";
  } 
});

saveSettings.addEventListener("click", () => {
  targetSize = parseInt(document.getElementById("inputSize").value);
  adjustHitPercent = parseInt(document.getElementById("inputHitSpeed").value);
  adjustMissPercent = parseInt(document.getElementById("inputMissSpeed").value);
  gameTime = parseInt(document.getElementById("inputTime").value);
  settingsPanel.style.display = "none";
});


let highScore = 0;

let score = 0;
let timeLeft = 0;

let gameInterval = null;
let autoMoveInterval = null;
let hitTimer = null;

let targetSize = 200;     // in px
let adjustHitPercent = 20; // % faster per hit
let adjustMissPercent = 20; // % slower per auto-move
let gameTime = 15;         // seconds

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
  timeLeft = gameTime;
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
    moveDelay = moveDelay * (1 + adjustMissPercent / 100);
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