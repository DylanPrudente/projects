const questions = [
    {
      question: "Which is more likely?",
      options: { A: "Being killed by a shark", B: "Being killed by falling airplane parts" },
      correct: "B",
      explanation: "Death by falling airplane parts is more common, though shark attacks are more vivid and memorable due to media coverage."
    },
    {
      question: "Which is more common?",
      options: { A: "Words that begin with the letter 'R'", B: "Words with 'R' as the third letter" },
      correct: "B",
      explanation: "Words with 'R' as the third letter are more common, but it's easier to recall words that start with 'R'."
    },
    {
      question: "Which causes more deaths annually?",
      options: { A: "Car accidents", B: "Plane crashes" },
      correct: "A",
      explanation: "Car accidents are far more common, but plane crashes are more vivid and receive more media attention."
    },
    {
      question: "Which causes more deaths in the U.S.?",
      options: { A: "Homicide", B: "Suicide" },
      correct: "B",
      explanation: "Suicide deaths are more common, but homicides are more frequently reported in the news."
    },
    {
      question: "Which is more likely?",
      options: { A: "Winning the lottery", B: "Being struck by lightning" },
      correct: "B",
      explanation: "Being struck by lightning is more likely, though winning the lottery is more desirable and memorable."
    },
    {
      question: "Which is more likely?",
      options: { A: "Dying from a fireworks accident", B: "Dying from a drowning accident" },
      correct: "B",
      explanation: "Drowning accidents are far more common than fireworks accidents."
    },
    {
      question: "Which is more common in the U.S.?",
      options: { A: "Accidental death by gun", B: "Death in a fire" },
      correct: "A",
      explanation: "Accidental deaths by guns are more common than deaths in fires."
    },
    {
      question: "Which causes more deaths annually?",
      options: { A: "Bee stings", B: "Falling out of bed" },
      correct: "B",
      explanation: "Falling out of bed causes more deaths annually than bee stings."
    },
    {
      question: "Which is more common?",
      options: { A: "Being wrongly convicted of a crime", B: "Being struck and killed by lightning" },
      correct: "A",
      explanation: "Being wrongly convicted of a crime is more common than being struck and killed by lightning."
    }
  ];
  
  let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // Store user answers

function startQuiz() {
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-text").textContent = question.question;
  document.getElementById("option-a").textContent = `A: ${question.options.A}`;
  document.getElementById("option-b").textContent = `B: ${question.options.B}`;
  document.getElementById("feedback").style.display = "none";
  document.getElementById("next-btn").style.display = "none";

  // Reset button styles
  document.getElementById("option-a").classList.remove("selected");
  document.getElementById("option-b").classList.remove("selected");
}

function selectAnswer(choice) {
  const question = questions[currentQuestionIndex];
  userAnswers.push({ question: question.question, choice, correct: question.correct });

  if (choice === question.correct) {
    score++;
  }

  // Highlight the selected button
  document.getElementById("option-a").classList.remove("selected");
  document.getElementById("option-b").classList.remove("selected");
  document.getElementById(`option-${choice.toLowerCase()}`).classList.add("selected");

  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("results-container").style.display = "block";

  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = ""; // Clear previous results

  userAnswers.forEach((answer, index) => {
    const question = questions[index];
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Q${index + 1}:</strong> ${question.question}<br>
      <strong>Your Answer:</strong> ${answer.choice} (${question.options[answer.choice]})<br>
      <strong>Correct Answer:</strong> ${question.correct} (${question.options[question.correct]})<br>
      <span style="color: ${answer.choice === question.correct ? "green" : "red"};">
        ${answer.choice === question.correct ? "Correct" : "Incorrect"}
      </span>
    `;
    resultsList.appendChild(listItem);
  });

  document.getElementById("score").textContent = `You got ${score} out of ${questions.length} correct.`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  document.getElementById("results-container").style.display = "none";
  document.getElementById("start-btn").style.display = "block";
  document.getElementById("instructions").style.display = "block";
}