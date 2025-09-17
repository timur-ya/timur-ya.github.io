// When the page loads
window.onload = function() {
  alert("Welcome to my website!");
};

// Button click event
document.getElementById("colorButton").onclick = function() {
  // Change background to a random color
  document.body.style.backgroundColor = 
    "#" + Math.floor(Math.random()*16777215).toString(16);

  // Show a fun message
  document.getElementById("message").innerText = "You clicked the magic button!";
};