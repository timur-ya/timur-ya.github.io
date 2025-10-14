const button = document.getElementById("gameButton");
let score = 0;

// move button to random place
function moveButton() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  button.style.left = x + "px";
  button.style.top = y + "px";
}

button.addEventListener("click", function() {
  score = score + 1;
  button.textContent = "Score: " + score;
  moveButton();
});

// move every 2 seconds
setInterval(moveButton, 2000);