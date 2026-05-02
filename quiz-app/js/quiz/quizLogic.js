import { renderQuiz } from "./quizUi.js";

const answersGrid = document.getElementById("answers-grid");
const quizFooter = document.getElementById("quiz-footer");
export let result = 0;

export function formatData(arrOfQues) {
    if (!arrOfQues || arrOfQues.length === 0) return [];

    return {
        questions: arrOfQues.map(({ difficulty, category, question, correct_answer, incorrect_answers }) => {

            const allAnswers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
            return {
                diff: difficulty,
                cat: category,
                ques: question,
                correct: correct_answer,
                answers: allAnswers,
            };
        }),
        numperOfQuestions: arrOfQues,
    }
}

let totalSeconds = 10 * 60;

export function updateTimer() {
    if (totalSeconds <= 0) return null;

    totalSeconds--;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return formattedTime;
}

export function handelEvents(currentIndex, questions, total, id, params) {
    const nextBtn = document.getElementById("next-btn");

    // Event الإجابة
    answersGrid.addEventListener("click", (e) => {
        const answerBtn = e.target.closest(".answer-btn");
        if (!answerBtn || answerBtn.disabled) return;

        const currentQuestion = questions[currentIndex]; // نجيب السؤال الحالي صح
        const correctAnswer = currentQuestion.correct;

        const allButtons = answersGrid.querySelectorAll(".answer-btn");
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.querySelector(".answer-btn__text").textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });

        const selected = answerBtn.querySelector(".answer-btn__text").textContent;
        let isCorrect = selected === correctAnswer;

        if (isCorrect) {
            result++;
            answerBtn.classList.add("correct");
        } else {
            answerBtn.classList.add("incorrect");
        }

        const dots = document.querySelectorAll(".progress-dot");
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add(isCorrect ? "correct" : "wrong");
        }

        nextBtn.disabled = false;
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < total) {
            const allButtons = answersGrid.querySelectorAll(".answer-btn");
            allButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("correct", "incorrect");
                btn.style.cursor = "pointer";
            });

            nextBtn.disabled = true;
            renderQuiz(questions[currentIndex], total, id, currentIndex);
        } else {
            const time = document.getElementById("timer-display").textContent;
            const cat = document.getElementById("quiz-category-chip").textContent
            const amount = params.get('amount') || 10;
            const diff = params.get('difficulty') || 'easy';
            const id = params.get('category') || 9;
            window.location.href = `result.html?total=${total}&result=${result}&cat="${cat}&time="${time}"`;
        }
    });
}