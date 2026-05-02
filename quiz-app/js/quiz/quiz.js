import { toggleLoadingSpinner } from "../sharedLogic.js";
import { applyTheme, initTheme } from "../sharedLogic.js";
import { fetchQuestions } from "./api.js";
import { formatData, handelEvents } from "./quizLogic.js";
import { renderQuiz } from "./quizUi.js";

async function initQuiz() {
    try {
        const params = new URLSearchParams(window.location.search);
        const amount = params.get('amount') || 10;
        const diff = params.get('difficulty') || 'easy';
        const id = params.get('category') || 9;

        const rawData = await fetchQuestions(amount, diff, id);
        const data = formatData(rawData); 
        
        let currentIndex = 0;
        const total = data.questions.length;

        // رندر أول سؤال
        renderQuiz(data.questions[currentIndex], total, id, currentIndex);
        
        // تشغيل الـ Events مرة واحدة فقط ونبعت لها "المحرك"
        handelEvents(currentIndex, data.questions, total, id,params);
        
    } catch (error) {
        console.warn("Error init quiz:", error.message);
    }
}

initTheme();
applyTheme();
initQuiz();




