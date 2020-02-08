
// Variables to store the quiz score and question number information
let totalCorrect = 0;
let currentQuestion = 0;

// question database
const STORE = [
  {
    question: 'Who created Slapsgiving ?',
    answer: '0',
    choices: ['Barney and Marshall', 'Robin and Lily', 'Ted and Barney', 'Ted and Marshall', 'Ted and Punchy'],
    img: 'Slapsgiving.jpg',
  },
  {
    question: 'Who was named Beercules ?',
    answer: '2',
    choices: ['Ted', 'Barney', 'Marshall', 'Lily', 'Punchy'],
    img: 'Beercules.jpg',
  },
  {
    question: 'Who was Lilys’ doppelganger ?',
    answer: '3',
    choices: ['Mustache lily', 'Street performer lily', 'Lily the wrestler', 'Stripper lily', 'Teacher lily'],
    img: 'Stripper-lily.jpg',
  },
  {
    question: 'What’s Barneys job ?',
    answer: '0',
    choices: ['Please', 'Has a lot of keys', 'Stock investor', 'Lawyer', 'architect'],
    img: 'Please.jpg',
  },
  {
    question: 'Whats Robin famous for in Canada ?',
    answer: '4',
    choices: ['Actress', 'Model', 'News Reporter', 'Hockey player', 'Teenage popstar'],
    img: 'Robin.jpg',
  },
];

function newGame() {
  $('.startButton').on('click', event => {
    $('.intro').hide();
    $('.container').show();
    $('.currentStats').show();
    displayQuestion();
    showCurrentStats();
  });
}

function displayQuestion() {
  $('.question-container').show();
  // generate radio buttons
  let answers = '';
  for (let i = 0; i < STORE.length; i++) {
    answers += `
        <label class="answerLabel">
          <input type="radio" class="answerInput" name="user-answer" id="user-answer" value="${i}" aria-label="radioButton" required>${STORE[currentQuestion].choices[i]}
        </label>
    `;
  }

  $('.question-container').html(`
    <legend class="questionDiv">
      <h3>${STORE[currentQuestion].question}</h3>
    </legend>
    <div class="answersDiv">
      ${answers}
    </div>
    <div class="submitAnswerButton">
      <button type="submit" class="submitAnswer">Submit</button>
    </div>
  `);
}

function submitAnswer() {
  $('.js-form').on('submit', function() {
    event.preventDefault();
    const userPickNum = $('input[name=user-answer]:checked').val();
    const answerNum = STORE[currentQuestion].answer;
    const answer = STORE[currentQuestion].choices[answerNum];
    const img = STORE[currentQuestion].img;

    $('.results').show();
    if (userPickNum === STORE[currentQuestion].answer) {
      $('.results').html(`
        <h2>Congratulations</h2>
        <p>Omg! You are a How I Met Your Mother Legend!!</p>
        <p>The correct answer is ${answer}.</p>
        <img src="./imgs/${img}" class="answerImg">
        <button class="nextButton">Next</button>
      `);
      totalCorrect++;
    } else {
      $('.results').html(`
        <h2>Incorrect</h2>
        <p>The correct answer is ${answer}.</p>
        <div style="padding-top:50.938%;position:relative;"><iframe src="https://gifer.com/embed/2Kc" width="100%" height="100%" style='position:absolute;top:0;left:0;' frameBorder="0" allowFullScreen></iframe></div><p><a href="https://gifer.com">via GIFER</a></p>
        <button class="nextButton">Next</button>
      `);
    }
    $('.question-container').hide();
    $('.checkAnswerButton').hide();
    questionCounter();
  });
}

function questionCounter() {
  currentQuestion++;
}

function nextQuestion() {
  $('.results').on('click', '.nextButton', function() {
    if (currentQuestion === 5) {
      $('.results').hide();
      $('.container').hide();
      $('.stats').show();
      showStatsSection();
    } else {
      $('.container').show();
      $('.results').hide();
      displayQuestion();
      showCurrentStats();
    }
  });
}

function showCurrentStats() {
  let totalIncorrect = (currentQuestion) - totalCorrect;
  $('.currentStats').html(`
    <h2>Question ${currentQuestion + 1} of 5 <br> ${totalCorrect} correct / ${totalIncorrect} Incorrect</h2>
  `);
}

function showStatsSection() {
  $('.currentStats').hide();
  $('.stats').html(`
    <h2>Here's how you did</h2>
    <h2>${totalCorrect} correct out of 5 questions</h2>
    <h3>Points Earned ${totalCorrect}</h3>
    <img src="./imgs/Cast.jpeg" class="answerImg">
    <button class="restart-button">Restart the Quiz</button>    
  `);
}

function resetStats() {
  currentQuestion = 0;
  totalCorrect = 0;
  $('.stats').hide();
  $('.intro').show();
}

function restartQuiz() {
  $('.stats').on('click', '.restart-button', function() {
    resetStats();
  });
}


function quizInit() {
  newGame();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(quizInit);