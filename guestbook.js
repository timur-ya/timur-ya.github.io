document.getElementById("guestForm").onsubmit = function(event) {
  event.preventDefault(); // stop page reload

  // Get values from input fields
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  // Create a new list item
  const li = document.createElement("li");
  li.textContent = name + ": " + message;

  // Add to the messages list
  document.getElementById("messagesList").appendChild(li);

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
};
