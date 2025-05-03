const wordList = [
    "apple", "mountain", "bicycle", "refrigerator", "ocean",
    "sky", "train", "microwave", "moss", "king",
    "microphone", "gutter", "car", "toaster", "cat",
    "grape", "currency", "glue", "island", "holiday"
  ];
  let displayedWords = [];
  let recallWords = [];
  
  function startFlashingWords() {
    displayedWords = [];
    let index = 0;
  
    const wordContainer = document.getElementById("word-container");
  
    // Display each word for 2 seconds
    const interval = setInterval(() => {
      if (index < wordList.length) {
        const word = wordList[index];
        wordContainer.textContent = word;
        displayedWords.push(word);
        index++;
      } else {
        clearInterval(interval);
        wordContainer.textContent = ""; // Clear the container
        setTimeout(() => {
          // Redirect to the recall page after a short delay
          window.location.href = "sp-recall.html";
        }, 2000); // 2-second delay before moving to recall
      }
    }, 2000);
  }
  
  function submitRecall() {
    const userInput = document.getElementById("user-recall").value.trim();
    if (userInput) {
      // Add the word to the recallWords array
      recallWords.push(userInput.toLowerCase());
  
      // Save the updated recallWords array to localStorage
      localStorage.setItem("serialPositionRecall", JSON.stringify(recallWords));
  
      // Clear the input box
      document.getElementById("user-recall").value = "";
    }
  }
  
  function endGuessing() {
    // Redirect to the explanation page
    window.location.href = "sp-explanation.html";
  }
  
  // Add event listener for Enter key
  document.getElementById("user-recall").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior (e.g., adding a new line)
      submitRecall(); // Call the submit function
    }
  });