const messageEle = document.getElementById("result-subtitle");
const scoreDisplayNumber = document.getElementById("score-display-number");
const scorePercentage = document.getElementById("score-percentage");
const statCorrect = document.getElementById("stat-correct");
const statTime = document.getElementById("stat-time");
const statIncorrect = document.getElementById("stat-incorrect");
const perfFill = document.getElementById("perf-fill");
const perfPct = document.getElementById("perf-pct")
export function renderResult(message, percentage, correct, wrong, total, time) {
    messageEle.textContent = message;
    scoreDisplayNumber.innerHTML = `${correct}<em>/${total}</em>`;
    scorePercentage.textContent = percentage;
    statCorrect.textContent = correct;
    statIncorrect.textContent = wrong
    statTime.textContent = time;
    perfFill.style.width = percentage;
    perfPct.textContent = percentage;
    const circumference = 377;

    const pctValue = parseFloat(percentage);

    const offset = circumference - (pctValue / 100) * circumference;

    const ringFill = document.querySelector(".score-ring__fill");
    if (ringFill) {
        ringFill.style.strokeDashoffset = offset;
    }
}