let score = 0; // this keeps our number

// find the HTML elements we want to change
const button = document.getElementById("clickButton");
const scoreText = document.getElementById("scoreText");

// when the button is clicked...
button.addEventListener("click", function() {
  score = score + 1; // add 1 to score
  scoreText.textContent = "Score: " + score; // update text
});