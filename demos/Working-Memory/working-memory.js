let currentLength = 3;
let currentSequence = "";
let gameActive = false;

const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const sequenceDiv = document.getElementById("sequence");
const userInput = document.getElementById("user-input");
const resultDiv = document.getElementById("result");
const instructions = document.getElementById("instructions");

function generateSequence(length) {
  let seq = "";
  for (let i = 0; i < length; i++) {
    seq += Math.floor(Math.random() * 10);
  }
  return seq;
}

function startGame() {
  gameActive = true;
  currentLength = 3;
  instructions.textContent = "Memorize the number:";
  resultDiv.classList.add("hidden");
  showSequence();
}

function showSequence() {
  currentSequence = generateSequence(currentLength);
  sequenceDiv.textContent = currentSequence;
  sequenceDiv.classList.remove("hidden");
  userInput.classList.add("hidden");
  submitBtn.classList.add("hidden");

  setTimeout(() => {
    sequenceDiv.textContent = "";
    userInput.value = "";
    userInput.classList.remove("hidden");
    submitBtn.classList.remove("hidden");
    userInput.focus();
  }, 1500 + currentLength * 300);
}

function checkAnswer() {
  const answer = userInput.value.trim();
  if (answer === currentSequence) {
    currentLength++;
    showSequence();
  } else {
    endGame();
  }
}

function endGame() {
  gameActive = false;
  userInput.classList.add("hidden");
  submitBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");

  resultDiv.innerHTML = `
    <h2>Test Over!</h2>
    <p>You reached a maximum sequence length of <strong>${currentLength - 1}</strong>.</p>
    <p><strong>Explanation:</strong> Working memory is the system your brain uses to hold and manipulate small bits of information for a short period. Most people can hold around 7 ± 2 items in their working memory. This limit explains why phone numbers are typically 7 digits long!</p>
  `;
  resultDiv.classList.remove("hidden");
}

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");
  startGame();
});

submitBtn.addEventListener("click", checkAnswer);

restartBtn.addEventListener("click", () => {
  startBtn.classList.remove("hidden");
  resultDiv.classList.add("hidden");
  instructions.textContent = "Click 'Start Test' to begin remembering sequences of numbers!";
});
