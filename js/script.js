var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var startQuiz = document.querySelector("#game-begin");



var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
    },
    {
      question: "Where is the propper place to insert JavaScript",
      choices: ["<head>", "<body>", "<section>", "<footer>"],
      answer: "<head>",
    },  

  ];

  
  var questionIndex = 0;
  var correctCount = 0;
  
  var time = 60;
  var intervalId;
  
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  shuffle(questions);



  function endQuiz() {
    // call clear interval to stop timer from running
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "You have finished the Coding Challenge Quiz, Your final score is " + correctCount;
    saveScore();
  }

  var saveScore = function () {
    localStorage.setItem("correctCount", JSON.stringify(correctCount));
    localStorage.setItem("name", playerInfo.name);
  };
  

  function updateTime() { 
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }
  
  function renderQuestion() {
    
    if (time == 0) {
      updateTime();
      return;
    }
  
    intervalId = setInterval(updateTime, 1000);
    
    questionEl.textContent = questions[questionIndex].question;
  
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";
  
    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;
  
    for (var i = 0; i < choicesLenth; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.textContent = choices[i];
      optionListEl.append(questionListItem);
    }
  }
  
  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      time = 0;
    }
    renderQuestion();
  }
  
  function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
      var answer = event.target.textContent;
      if (answer === questions[questionIndex].answer) {
        questionResultEl.textContent = "Correct";
        correctCount++;
      } else {
        questionResultEl.textContent = "Incorrect";
        time = time - 5;
        timerEl.textContent = time;
       }
    }
    setTimeout(nextQuestion, 1500);
  }

    
  // function to set name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {{
    name = prompt("What is your Name?");
  }
  console.log("Welcome " + name + "please enjoy the quiz.");
  return name;
}saveScore();
};

var playerInfo = {
  name: getPlayerName()
};


  localStorage.getItem("name")
  localStorage.getItem("correctCount");

  renderQuestion();
  optionListEl.addEventListener("click", checkAnswer);
  