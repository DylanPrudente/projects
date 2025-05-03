const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
const keyMap = { r: "Red", g: "Green", b: "Blue", y: "Yellow", p: "Purple" }; // Map keys to colors
const wordEl = document.getElementById("word");
const resultEl = document.getElementById("result");

let score = 0;
let total = 0;
let startTime = null;
let responseTimes = { match: [], mismatch: [] };
let timer = null;

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function nextWord() {
  resultEl.textContent = "";

  const wordText = getRandomColor();
  const fontColor = getRandomColor();

  wordEl.textContent = wordText;
  wordEl.style.color = fontColor;

  // Record the start time for this word
  startTime = performance.now();

  // Save the current correct color for validation
  wordEl.dataset.correctColor = fontColor;
}

function handleKeyPress(event) {
  const key = event.key.toLowerCase(); // Get the pressed key
  const chosen = keyMap[key]; // Map the key to a color

  if (!chosen) return; // Ignore invalid keys

  total++;
  const endTime = performance.now();
  const responseTime = endTime - startTime;

  const correct = wordEl.dataset.correctColor;

  if (chosen === correct) {
    score++;
    responseTimes.match.push(responseTime);
    resultEl.textContent = "✅ Correct!";
    resultEl.style.color = "green";
  } else {
    responseTimes.mismatch.push(responseTime);
    resultEl.textContent = `❌ Incorrect. The font color was ${correct}.`;
    resultEl.style.color = "red";
  }

  setTimeout(() => {
    nextWord();
  }, 1000);
}

function endTest() {
  // Save response times to localStorage
  localStorage.setItem(
    "stroopResults",
    JSON.stringify({
      matchTimes: responseTimes.match,
      mismatchTimes: responseTimes.mismatch,
    })
  );

  // Redirect to results page
  window.location.href = "stroop-result.html";
}

function startTest() {
  nextWord(); // Start the first word

  // Listen for key presses
  document.addEventListener("keydown", handleKeyPress);

  // End the test after 30 seconds
  timer = setTimeout(() => {
    endTest();
  }, 30000);
}

startTest();