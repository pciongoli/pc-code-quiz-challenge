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
  {
    question: "An 'Array' _____",
    choices: ["is a built in browser function", "loops or repetedly executes a statement", "displays each element in the console", "is a data type designed to store data as a list"],
    answer: "is a data type designed to store data as a list",
  },
  {
    question: "Which best defines a function?",
    choices: ["A function is a JavaScript pop-up that does not allow anything to occur until it has been acknowledged.", "A function is a predefined action that we can call or include in our code (after we declare it earlier in the code).", "A function is a data type that only accepts values of 'true' or 'false'.", "A fucntions purpose is to combine a string with a variable"],
    answer: "A function is a predefined action that we can call or include in our code (after we declare it earlier in the code).",
  },
  {
    question: "A variable is a _______.",
    choices: ["pop up that does not allow anything to occur until it has been acknowledged", "predefined action that we can call or include in our code", "named location for a value that gets stored in the browsers memory when a program is run", "data type designed to store data as a list"],
    answer: "named location for a value that gets stored in the browsers memory when a program is run",
  },
  {
    question: "What is a third party API?",
    choices: ["company allow you to access their functionality via JavaScript and us it on your site", "Is when you use three different JavaScript files in one project", "Is when you create a website with two friends", "Is the core concept of all coding"],
    answer: "company allow you to access their functionality via JavaScript and us it on your site",
  },
  {
    question: "What is the best profession?",
    choices: ["Doctor", "Web Developer", "Scientist", "Astronaut"],
    answer: "Web Developer",
  },
  {
    question: "What is the purpose of (h1, h2, h3, h4, h5, h6)?",
    choices: ["Allows you to put 5 different :hover fucntions at once", "Creates a chart of how happy the user is", "Tag used to define HTML headings. h1 being the most important and h6 the least", "Tag used to define HTML headings. h1 being the least important and h6 the most"],
    answer: "Tag used to define HTML headings. h1 being the most important and h6 the least",
  },
  {
    question: "What does Math.random do?",
    choices: ["Generates a random number between 0 and 100", "Generates a random number between 0 and 1", "Generates a random weather forcast", "Creates a unique math equasion for the user to solve"],
    answer: "Generates a random number between 0 and 1",
  },
  {
    question: "What is a switch statement?",
    choices: ["can replace multiple if checks", "gives more descriptive ways to compare a value with multiple variants", "C. options A and B", "D. a statment in which the user can change their mind about a previous selection"],
    answer: "C. options A and B",
  }

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
  console.log("Welcome " + name + " please enjoy the quiz.");
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