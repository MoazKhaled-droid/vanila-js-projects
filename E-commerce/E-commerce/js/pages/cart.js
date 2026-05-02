import { initApp } from "../logic/utils.js";
import { renderCart } from "../ui/cartUi.js";
import { calcInvoice } from "../logic/cartLogic.js";
import { initPaymentModal, showPaymentPopup } from "../logic/paymentLogic.js";

const cartItemsListEle = document.getElementById("cartItemsList");
const subTotalEle = document.getElementById("subtotalValue");
const totalEle = document.getElementById("totalValue");
const checkBtn = document.getElementById("checkoutBtn");

function updateUI() {
    let currentCart = [];
    try {
        currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
        console.warn("Resetting corrupted cart data.");
        localStorage.setItem("cart", JSON.stringify([]));
    }
    renderCart(currentCart, cartItemsListEle);
    calcInvoice(subTotalEle, totalEle, currentCart);
}

function handleEvents() {
    cartItemsListEle.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        const id = Number(btn.id.replace(/\D/g, ""));
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (e) {
            console.warn("Resetting corrupted cart data.");
            localStorage.setItem("cart", JSON.stringify([]));
        }
        const productIndex = cart.findIndex(item => item.id === id);

        if (productIndex === -1 && !btn.classList.contains("remove-btn")) return;

        if (btn.classList.contains("remove-btn")) {
            cart = cart.filter(item => item.id !== id);
        } else if (btn.id.startsWith("incCart")) {
            cart[productIndex].quantity++;
        } else if (btn.id.startsWith("decCart")) {
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity--;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateUI();
    });

    checkBtn.addEventListener("click", () => {
        if (totalEle.textContent === "0.00" || totalEle.textContent === "$0.00") {
            showPaymentPopup(false, "Your cart is empty");
            return;
        }
        const paymentModal = document.getElementById("paymentModal");
        if (paymentModal) {
            paymentModal.classList.add("active");
        }
    });
}

handleEvents();
initApp();
updateUI();
initPaymentModal(updateUI); 