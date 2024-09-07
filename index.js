const questions = [
    {
        questions: "What does html stands for ? ",
        answers: [
            {text:"Hyperlinks and Text Markup Language",correct:false},
            {text:"Hyper Text Markup Language",correct:true},
            {text:"Home Tool Markup Language",correct:false},
            {text:"Hyper Text Markedup Language",correct:false},
        ]
    },
    {
        questions: "Which character is used to indicate an end tag ?",
        answers: [
            {text:"^",correct:false},
            {text:">",correct:false},
            {text:"*",correct:false},
            {text:"/",correct:true},
        ]

    },
    {
        questions: "What does CSS stand for ? ",
        answers: [
            {text:"Cascading Style Sheets",correct:true},
            {text:"Creative Style Sheets",correct:false},
            {text:"Computer Style Sheets",correct:false},
            {text:"Colourful Style Sheets",correct:false},
        ]
    },
    {
    questions: "Where in an HTML document is the correct place to refer to an external style sheet ? ",
    answers: [
        {text:"In the body section",correct:false},
        {text:"End of the document",correct:false},
        {text:"In the head section",correct:true},
        {text:"Inside a div element",correct:false},
        ] 
    },
    {
        questions: "Which event occurs when the user clicks on an HTML element ?",
        answers: [
            {text:"onmouseover",correct:false},
            {text:"onclick",correct:true},
            {text:"onchange",correct:false},
            {text:"onmouseclick",correct:false},
        ]
    }
]; 

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next-btn");


let currentQIndex = 0;
let score= 0;
function startQuiz()
{
    currentQIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQ = questions[currentQIndex];
    let questionNo = currentQIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQ.questions;

    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
   const selectBtn = e.target;
   const isCorrect = selectBtn.dataset.correct==="true";
   if(isCorrect){
    selectBtn.classList.add("correct");
    score++;
   } else{
    selectBtn.classList.add("incorrect");
   }
   Array.from(answerButton.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
   });
   nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !!!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextBtn()
{
    currentQIndex++;
    if(currentQIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if (currentQIndex < questions.length){
       handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();