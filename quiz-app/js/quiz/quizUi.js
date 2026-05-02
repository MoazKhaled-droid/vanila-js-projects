import { catIcons } from "../home/homeLogic.js";
import { updateTimer } from "./quizLogic.js";
import { result } from "./quizLogic.js";
const catEle = document.getElementById("quiz-category-chip");
const diffEle = document.getElementById("quiz-difficulty-badge");
const currentQuesEle = document.getElementById("current-q-num");
const totalEle = document.getElementById("total-q-num");
const progresPar = document.getElementById("progress-bar");
const quesNumPadge = document.getElementById("numBadge");
const questionEle = document.getElementById("question-text");
const answerTextEle = document.querySelectorAll(".answer-btn__text");
const progresDotsEle = document.querySelector(".progress-dots");
const timerEle = document.getElementById("timer-display");


const timer = setInterval(() => {
    const time = updateTimer();

    if (time) {
        timerEle.textContent = time;
    } else {
        clearInterval(timer);
        const params = new URLSearchParams(window.location.search);
        timerEle.textContent = "00:00";
        const amount = params.get('amount') || 10;
        const diff = params.get('difficulty') || 'easy';
        const id = params.get('category') || 9;
        window.location.href = `result.html?total=${total}&result=${result}&cat="${cat}&time="${time}"`;
    }
}, 1000);

export function renderQuiz(question, numOfQues, id, index) {
    if (!question) return;

    const { diff, cat, ques, answers } = question;

    // تحديث النقط
    const dotsContainer = document.getElementById("progress-dots");
    if (index === 0) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < numOfQues; i++) {
            dotsContainer.innerHTML += `<span class="progress-dot"></span>`;
        }
    }
    const allDots = document.querySelectorAll(".progress-dot");
    allDots.forEach(dot => dot.classList.remove("current"));
    if (allDots[index]) allDots[index].classList.add("current");

    questionEle.innerHTML = ques;

    answerTextEle.forEach((ele, i) => {
        if (answers && answers[i]) {
            ele.innerHTML = answers[i];
        } else {
            ele.innerHTML = "";
        }
    });

    // تحديث باقي الـ UI...
    catEle.innerHTML = `<i class="fa-solid ${catIcons[id]} category-card__icon"> ${cat}`
    diffEle.textContent = diff;
    currentQuesEle.textContent = index + 1;
    totalEle.textContent = numOfQues;
    progresPar.style.width = `${((index + 1) / numOfQues) * 100}%`;
    quesNumPadge.textContent = index + 1
}