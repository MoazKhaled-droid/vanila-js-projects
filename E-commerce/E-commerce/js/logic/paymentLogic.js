import { addOrder } from "./trackingLogic.js";

export function initPaymentModal(updateCartUICallback) {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const paymentModal = document.getElementById("paymentModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");

    if (!checkoutBtn || !paymentModal || !confirmPaymentBtn) return;

    closeModalBtn.addEventListener("click", () => {
        paymentModal.classList.remove("active");
    });

    confirmPaymentBtn.addEventListener("click", () => {
        let currentCart = [];
        try {
            currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch {
            currentCart = [];
        }

        if (currentCart.length === 0) {
            showPaymentPopup(false, "Your cart is empty");
            paymentModal.classList.remove("active");
            return;
        }

        const isValid = validatePaymentForm();
        if (!isValid) return;

        // Simulate payment processing
        confirmPaymentBtn.textContent = "Processing...";
        confirmPaymentBtn.disabled = true;

        setTimeout(() => {
            confirmPaymentBtn.textContent = "Confirm Payment";
            confirmPaymentBtn.disabled = false;
            paymentModal.classList.remove("active");

            const total = document.getElementById("totalValue").textContent;
            
            // Add order to tracking
            addOrder(currentCart, total);

            // Clear cart
            localStorage.setItem("cart", JSON.stringify([]));
            if (typeof updateCartUICallback === "function") {
                updateCartUICallback();
            }

            // Show success popup
            showPaymentPopup(true, "Thanks for joining Vault");
            
            // Clear form
            document.getElementById("ccName").value = "";
            document.getElementById("ccNumber").value = "";
            document.getElementById("ccExpiry").value = "";
            document.getElementById("ccCvv").value = "";

        }, 1500);
    });
}

function validatePaymentForm() {
    let isValid = true;
    
    const name = document.getElementById("ccName");
    const number = document.getElementById("ccNumber");
    const expiry = document.getElementById("ccExpiry");
    const cvv = document.getElementById("ccCvv");

    const errName = document.getElementById("errName");
    const errNumber = document.getElementById("errNumber");
    const errExpiry = document.getElementById("errExpiry");
    const errCvv = document.getElementById("errCvv");

    const resetError = (ele) => { ele.style.display = "none"; ele.textContent = ""; };
    const setError = (ele, msg) => { ele.style.display = "block"; ele.textContent = msg; isValid = false; };

    resetError(errName);
    resetError(errNumber);
    resetError(errExpiry);
    resetError(errCvv);

    if (name.value.trim().length < 3) setError(errName, "Name is too short");
    if (!/^\d{16}$/.test(number.value.trim())) setError(errNumber, "Must be 16 digits");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value.trim())) setError(errExpiry, "Format MM/YY");
    if (!/^\d{3}$/.test(cvv.value.trim())) setError(errCvv, "Must be 3 digits");

    return isValid;
}

export function showPaymentPopup(isSuccess, message) {
    // Remove existing popup if any
    const existingPopup = document.getElementById("paymentPopupOverlay");
    if (existingPopup) {
        existingPopup.remove();
    }

    const popupHTML = `
    <div id="paymentPopupOverlay" class="payment-popup-overlay active">
        <div class="payment-popup-content">
            <div class="icon-container">
                <svg class="progress-ring" width="100" height="100">
                    <circle class="progress-ring__circle" stroke="${isSuccess ? '#28a745' : '#ff0000'}" stroke-width="6" fill="transparent" r="45" cx="50" cy="50" />
                </svg>
                <i class="fa-solid ${isSuccess ? 'fa-check' : 'fa-x'}" style="color: ${isSuccess ? '#28a745' : '#ff0000'};"></i>
            </div>
            <h2>${isSuccess ? 'Success!' : 'Failed'}</h2>
            <p>${message}</p>
            <button id="closePopupBtn" class="btn" style="margin-top: 15px; width: 100%;">Close</button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const overlay = document.getElementById("paymentPopupOverlay");
    const closeBtn = document.getElementById("closePopupBtn");
    
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
        setTimeout(() => overlay.remove(), 300);
    });
}
