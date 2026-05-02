import { transformCatData } from "./homeLogic.js";
const availableCatField = document.getElementById("availableCat");
const cardGrid = document.getElementById("categories-grid");
export async function renderCatCards() { // ضفنا async هنا
    const cardData = await transformCatData(); 
    
    if (!cardData || cardData.length === 0) return;

    availableCatField.textContent = `${cardData.length} AVAILABLE`;

    const cardsHTML = cardData.map(({ cardId, cardIcon, cardCat, cardName }) => {
        return `
        <article class="glass-card category-card" id="${cardId}" role="listitem" tabindex="0"
            aria-label="${cardName} quiz category — click to start" 
            data-category="${cardCat}" 
            data-icon="${cardIcon}"
            data-modal="quiz-modal">
            
            <div class="category-card__image" aria-hidden="true">
                <div class="category-card__grid-overlay"></div>
                <div class="category-card__image-inner">
                    <span class="card-deco card-deco-1"></span>
                    <span class="card-deco card-deco-2"></span>
                    <span class="card-deco card-deco-3"></span>
                    
                    <div style="font-size:3.5rem; position:relative; z-index:1; filter:drop-shadow(0 0 20px rgba(124,58,237,0.6));">
                        <i class="fa-solid ${cardIcon} category-card__icon"></i>
                    </div>
                </div>
            </div>

            <div class="category-card__body">
                <span class="category-card__category">${cardCat || "General"}</span>
                <h3 class="category-card__title">${cardName}</h3>
                <div class="category-card__footer">
                    <button class="category-card__action startBtn" id="start">
                        Start Quiz <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        </article>
        `;
    }).join("");

    cardGrid.innerHTML = cardsHTML;
}

// export function showError(message) {
//     if (document.querySelector('.error-toast')) return;

//     const toast = document.createElement('div');
//     toast.className = 'error-toast';
//     toast.innerHTML = `
//         <i class="fa-solid fa-triangle-exclamation"></i>
//         <span>${message}</span>
//     `;

//     document.body.appendChild(toast);

//     setTimeout(() => {
//         toast.classList.add('fade-out');
//         toast.addEventListener('animationend', () => toast.remove());
//     }, 3000);
// }