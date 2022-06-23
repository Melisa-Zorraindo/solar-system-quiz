import { questionList } from "./data.js";

const startBtn = document.querySelector("#start");
const mainContainer = document.querySelector(".main-content");

startBtn.addEventListener("click", () => {
  const heading = document.querySelector("h1");
  heading.innerHTML = "Loading...";

  //clear html and create loader bar
  mainContainer.innerHTML = "";
  const loaderContainer = document.createElement("span");
  loaderContainer.classList.add("loader");
  mainContainer.append(loaderContainer);

  //set timer to render html after loading bar completed
  setTimeout(renderMainContent, 3000, questionList);
});

//render page content
let questionNumber = 0;
function renderMainContent(questionList) {
  //update heading
  const newHeading = document.querySelector("h1");
  newHeading.innerHTML = "Choose the correct answer";

  //clear html to render new one
  mainContainer.innerHTML = "";

  //create question container
  const questionBox = document.createElement("div");
  questionBox.classList.add("question-box");
  mainContainer.append(questionBox);

  //create image container
  const imgContainer = document.createElement("figure");
  imgContainer.classList.add("img-container");
  questionBox.append(imgContainer);

  //create image
  const picture = document.createElement("img");
  picture.src = questionList[questionNumber].image;
  picture.alt = questionList[questionNumber].altText;
  imgContainer.append(picture);

  //create caption
  const pictureCaption = document.createElement("figcaption");
  pictureCaption.innerHTML = questionList[questionNumber].altText;
  imgContainer.append(pictureCaption);

  //create intro
  const introParagraph = document.createElement("p");
  introParagraph.innerHTML = questionList[questionNumber].intro;
  questionBox.append(introParagraph);

  //create question
  const question = document.createElement("p");
  question.innerHTML = questionList[questionNumber].question;
  questionBox.append(question);

  //create options container
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");
  mainContainer.append(optionsContainer);

  //create unordered list
  const ul = document.createElement("ul");
  optionsContainer.append(ul);

  //create first list element
  const listItemOne = document.createElement("li");
  ul.append(listItemOne);

  //create first radio button
  const radioBtnOne = document.createElement("input");
  radioBtnOne.type = "radio";
  radioBtnOne.name = "answer";
  radioBtnOne.id = "question-one";
  radioBtnOne.value = questionList[questionNumber].options[0];
  listItemOne.append(radioBtnOne);

  //create first label
  const labelOne = document.createElement("label");
  labelOne.htmlFor = "question-one";
  labelOne.setAttribute("data-content", "a");
  listItemOne.append(labelOne);

  //create first option
  const optionOne = document.createElement("p");
  optionOne.innerHTML = questionList[questionNumber].options[0];
  labelOne.append(optionOne);

  //create second list element
  const listItemTwo = document.createElement("li");
  ul.append(listItemTwo);

  //create second radio button
  const radioBtnTwo = document.createElement("input");
  radioBtnTwo.type = "radio";
  radioBtnTwo.name = "answer";
  radioBtnTwo.id = "question-two";
  radioBtnTwo.value = questionList[questionNumber].options[1];
  listItemTwo.append(radioBtnTwo);

  //create second label
  const labelTwo = document.createElement("label");
  labelTwo.htmlFor = "question-two";
  labelTwo.setAttribute("data-content", "b");
  listItemTwo.append(labelTwo);

  //create second option
  const optionTwo = document.createElement("p");
  optionTwo.innerHTML = questionList[questionNumber].options[1];
  labelTwo.append(optionTwo);

  //create third list element
  const listItemThree = document.createElement("li");
  ul.append(listItemThree);

  //create third radio button
  const radioBtnThree = document.createElement("input");
  radioBtnThree.type = "radio";
  radioBtnThree.name = "answer";
  radioBtnThree.id = "question-three";
  radioBtnThree.value = questionList[questionNumber].options[2];
  listItemThree.append(radioBtnThree);

  //create third label
  const labelThree = document.createElement("label");
  labelThree.htmlFor = "question-three";
  labelThree.setAttribute("data-content", "c");
  listItemThree.append(labelThree);

  //create third option
  const optionThree = document.createElement("p");
  optionThree.innerHTML = questionList[questionNumber].options[2];
  labelThree.append(optionThree);

  //create button container
  const nexQuestionBtnContainer = document.createElement("div");
  nexQuestionBtnContainer.classList.add("btn-container");
  optionsContainer.append(nexQuestionBtnContainer);

  //create button
  const nexQuestionBtn = document.createElement("button");
  nexQuestionBtn.id = "next";
  nexQuestionBtn.classList.add("next");
  nexQuestionBtn.innerHTML = "&#8680;";
  nexQuestionBtnContainer.append(nexQuestionBtn);

  //select buttons for points management
  const radioBtns = document.querySelectorAll("input[type='radio']");

  radioBtns.forEach((button) => {
    button.addEventListener("change", () => {
      countPoints(button);
    });
  });

  //go to next question
  const nextQuestion = document.querySelector("#next");
  nextQuestion.addEventListener("click", () => {
    //render next question or last content when no more questions available
    questionNumber < 10 ? renderNextQuestion() : renderResults();
  });

  questionNumber++;
}

//points system
let currentPoints;
let totalPoints = 0;
function countPoints(button) {
  currentPoints = 0;

  //set variable to 0 every time user changes answer to avoid adding more than one point per question
  const correctOption = questionList[questionNumber - 1].correctAnswer;
  button.value === correctOption ? currentPoints++ : (currentPoints = 0);

  //styles for client feedback
  updateSelectedOptionStyles();
}

function updateSelectedOptionStyles() {
  //update style for selected option and remove style when button not checked
  const selectedOption = document.querySelectorAll("input[type='radio']");
  for (let i = 0; i < selectedOption.length; i++) {
    selectedOption[i].checked
      ? selectedOption[i].nextSibling.classList.add("selected-label")
      : selectedOption[i].nextSibling.classList.remove("selected-label");
  }
}

const finalAnswers = [];
function storeSelectedOptionValues() {
  //store user answers to display in answer key
  const chosenOption = document.querySelectorAll("input[type='radio']");
  for (let i = 0; i < chosenOption.length; i++) {
    if (chosenOption[i].checked) {
      finalAnswers.push(chosenOption[i].value);
    }
  }
}

function renderNextQuestion() {
  //store user's answers before rendering next question
  storeSelectedOptionValues();

  //check an option was chosen
  const answerOption = document.querySelectorAll("input[type='radio']");
  if (
    answerOption[0].checked ||
    answerOption[1].checked ||
    answerOption[2].checked
  ) {
    //add current points to total before rendering next question
    totalPoints += currentPoints;
    renderMainContent(questionList);
  } else {
    //alert user an option has to be chosen
    alert("Please choose an answer");
  }
}

const finalContentContainer = document.querySelector(".final-content");

function renderResults() {
  //store user's last answer before rendering results
  storeSelectedOptionValues();

  //add point from last question
  totalPoints += currentPoints;
  //update heading
  const lastHeading = document.querySelector("h1");
  if (totalPoints < 5) {
    lastHeading.innerHTML = "Better luck next time!";
  } else if (totalPoints >= 5 && totalPoints < 8) {
    lastHeading.innerHTML = "Really good!";
  } else if (totalPoints >= 8) {
    lastHeading.innerHTML = "Congrats!";
  }

  //clear content to create new
  mainContainer.innerHTML = "";
  finalContentContainer.classList.add("results-box");

  //print number of correct answers
  const subheading = document.createElement("h2");
  subheading.innerHTML = `You got ${totalPoints}/10 questions right`;
  subheading.style.textAlign = "center";
  finalContentContainer.append(subheading);

  renderAnswerKey(questionList);
}

function renderAnswerKey(questionList) {
  //print questions with correct answers
  const answerKey = document.createElement("ol");
  finalContentContainer.append(answerKey);

  for (let i = 0; i < questionList.length; i++) {
    const quizItem = document.createElement("li");
    quizItem.innerHTML = questionList[i].intro;
    quizItem.innerHTML += " " + questionList[i].question;
    quizItem.classList.add("answer-key-question");
    quizItem.style.listStyleType = "decimal";
    answerKey.append(quizItem);

    //create list of possible answers
    //container
    const possibleAnswersContainer = document.createElement("ol");
    quizItem.append(possibleAnswersContainer);

    //list items
    let possibleAnswer = questionList[i].options;
    for (let j = 0; j < possibleAnswer.length; j++) {
      let possibleAnswerLi = document.createElement("li");
      possibleAnswerLi.innerHTML = questionList[i].options[j];
      possibleAnswerLi.classList.add("answer-key-option");
      possibleAnswersContainer.append(possibleAnswerLi);

      //style correct answer
      if (possibleAnswerLi.innerHTML === questionList[i].correctAnswer) {
        let checkmark = document.createElement("span");
        checkmark.innerHTML = " " + "&#10004;";
        checkmark.classList.add("checkmark");
        possibleAnswerLi.append(checkmark);
      } else if (possibleAnswerLi.innerHTML === finalAnswers[i]) {
        let cross = document.createElement("span");
        cross.innerHTML = " " + "&#10008;";
        cross.classList.add("cross");
        possibleAnswerLi.append(cross);
      }
    }
  }
  console.log(finalAnswers);
  //create restart button container
  const restartBtnContainer = document.createElement("div");
  restartBtnContainer.classList.add("restart-container");
  finalContentContainer.append(restartBtnContainer);

  //create button to restart the game
  const restartBtn = document.createElement("a");
  restartBtn.setAttribute("href", "index.html");
  restartBtn.classList.add("play-again");
  restartBtn.innerHTML = "PLAY AGAIN";
  restartBtnContainer.append(restartBtn);
}
