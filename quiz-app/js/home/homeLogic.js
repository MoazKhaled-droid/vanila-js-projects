import { fetchCat } from "./api.js";
import { toggleLoadingSpinner } from "../sharedLogic.js";
const modalOverlay = document.getElementById("quiz-modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalIcon = document.getElementById("modal-icon");
const modalGrid = document.getElementById("categories-grid")
const diffForm = document.querySelector(".diff")
const quesForm = document.querySelector(".ques");
const nameele = document.getElementById("user-name-input");
export const catIcons = {
    9: "fa-brain",                  // General Knowledge
    10: "fa-book-open",             // Books
    11: "fa-film",                  // Film
    12: "fa-music",                 // Music
    13: "fa-masks-theater",         // Musicals & Theatres
    14: "fa-tv",                    // Television
    15: "fa-gamepad",               // Video Games 🎮
    16: "fa-chess-board",           // Board Games
    17: "fa-microscope",            // Science & Nature
    18: "fa-laptop-code",           // Science: Computers 💻
    19: "fa-calculator",            // Science: Mathematics
    20: "fa-scroll",                // Mythology
    21: "fa-football",              // Sports
    22: "fa-earth-americas",        // Geography
    23: "fa-landmark",              // History
    24: "fa-monument",              // Politics
    25: "fa-palette",               // Art
    26: "fa-star",                  // Celebrities
    27: "fa-paw",                   // Animals
    28: "fa-car",                   // Vehicles
    29: "fa-face-laugh",          // Comics
    30: "fa-microchip",             // Gadgets
    31: "fa-user-ninja",            // Anime & Manga 🎌
    32: "fa-icons",                 // Cartoon & Animations
    "default": "fa-circle-question" // Defult
};
// 
export async function transformCatData() {
    try {
        toggleLoadingSpinner(true)
        const catData = await fetchCat();
        if (!catData) return [];

        const regex = /^(.*?):\s*(.*)$/;

        return catData.map(({ id, name: fullName }) => {
            const match = fullName.match(regex);

            let prefix = null;
            let name = fullName;

            if (match) {
                prefix = match[1];
                name = match[2];
            } else {
                prefix = "General";
            }

            return {
                cardId: id,
                cardCat: prefix,
                cardName: name,
                cardIcon: catIcons[id] || catIcons.default,
            };
        });
    } catch (er) {
        console.warn(`Error: ${er.message}`);
        return [];
    }finally{
        toggleLoadingSpinner(false)
    }
}

export function handleEvents() {
    let levelValue = "easy"; // قيمة افتراضية عشان لو مداسش
    let numberOfQues = "10"; // قيمة افتراضية
    let currentCatId = null;
    let name;

    if (!modalGrid || !modalOverlay) return;

    // 1. فتح الـ Modal وجلب بيانات الكارد
    modalGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".category-card");
        if (!card) return;

        currentCatId = card.id;
        const title = card.querySelector(".category-card__title").textContent;
        const iconClass = card.dataset.icon; // لو كنت مخزنها في data-icon

        modalOverlay.style.display = "flex";
        modalTitle.textContent = title;
        modalIcon.innerHTML = `<i class="fa-solid ${catIcons[currentCatId]}"></i>`;
    });

    diffForm?.addEventListener("change", (e) => {
        if (e.target.name === "difficulty") {
            levelValue = e.target.value;
        }
    });

    const selectElement = document.getElementById("num-questions");
    selectElement?.addEventListener("change", () => {
        numberOfQues = selectElement.value;
    });

    modalOverlay.addEventListener("click", (e) => {
        const startBtn = e.target.closest("#start-quiz-btn");
        const closeBtn = e.target.closest("#modal-close-btn");

        if (closeBtn) {
            modalOverlay.style.display = "none";
        }

        if (startBtn) {
            window.location.href = `quiz.html?category=${currentCatId}&difficulty=${levelValue}&amount=${numberOfQues}`;
        }
    });
    nameele.addEventListener("change",(e)=>{
        name = nameele.value;
        if(!name) return;
        localStorage.setItem("userName",name);
    })
}
