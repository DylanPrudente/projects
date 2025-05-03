const wordList = ["bed", "rest", "dream", "tired", "pillow", "night", "blanket", "doze", "yawn"];
const targetWord = "sleep";
let recallWords = [];
let isTestStopped = false;

function startTestButton() {
  localStorage.removeItem("recallWords"); // Clear previous guesses
  window.location.href = "drm-flash.html"; // Redirect to the word flashing page
}

function startTest() {
  const wordContainer = document.getElementById("word-container");
  let index = 0;

  const interval = setInterval(() => {
    if (isTestStopped || index >= wordList.length) {
      clearInterval(interval);
      showRecall(); // Show recall input if the test is stopped or completed
    } else {
      const word = wordList[index];
      wordContainer.textContent = word; // Display the current word
      index++;
    }
  }, 1000); // Display each word for 1 second
}

function stopTest() {
  isTestStopped = true; // Mark the test as stopped
}

function showRecall() {
  window.location.href = "drm-guess.html"; // Redirect to the recall page
}

function submitRecall() {
  const userInput = document.getElementById("user-recall").value.trim();
  if (userInput) {
    recallWords.push(userInput.toLowerCase()); // Add the word to the recallWords array
    localStorage.setItem("recallWords", JSON.stringify(recallWords)); // Save to localStorage
    document.getElementById("user-recall").value = ""; // Clear the input box
  }
}

function endGuessing() {
  window.location.href = "drm-explanation.html"; // Redirect to the explanation page
}

// Add event listener for Enter key
document.getElementById("user-recall")?.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior (e.g., adding a new line)
    submitRecall(); // Call the submit function
  }
});