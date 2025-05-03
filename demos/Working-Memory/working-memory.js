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
    <p>
      Working memory is the system your brain uses to temporarily hold and work with information needed for tasks like problem-solving, reasoning, and learning.
    </p>
    <p>
      A famous study by George Miller found that most people can hold about <strong>7 ± 2 items</strong> in working memory. However, newer research suggests it may be closer to <strong>4 items</strong>, depending on how the information is grouped.
    </p>
    <p>
      This demo tests your "digit span," a common way to measure working memory capacity.
    </p>
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
