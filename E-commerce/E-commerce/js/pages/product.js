import { isLoggedIn } from "../logic/authLogic.js";
import { switchDarkLight, toggleLoader } from "../ui/sharedUi.js";
import { getProductById } from "../api/productApi.js";
import { renderProduct, thumbnailRow, mainImage } from "../ui/productUi.js";
import { addToCart } from "../logic/cartLogic.js";
import { initApp } from "../logic/utils.js";

const productContainer = document.getElementById("productDetails")
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const Quantity = document.getElementById("qtyValue");
const quantityControler = document.getElementById("quantityControls");
const addToCartBtn = document.getElementById("addToCartMainBtn");
let product;



async function initProductDetails() {
    if (!id) {
        window.location.replace("index.html");
        return;
    }

    try {
        toggleLoader(true);
        product = await getProductById(id);
        renderProduct(product);
    } catch (er) {
        console.error("Failed to load product:", er.message);
    } finally {
        toggleLoader(false);
    }
}

function setupEventListeners() {
    thumbnailRow.addEventListener("click", (e) => {
        const thumbnail = e.target.closest(".thumbnail");

        if (!thumbnail) return;

        const img = thumbnail.querySelector("img");
        const allThumbnails = thumbnailRow.querySelectorAll(".thumbnail");

        allThumbnails.forEach(th => th.classList.remove("active"));
        thumbnail.classList.add("active");

        const displayImg = mainImage.querySelector("img");
        if (displayImg) {
            displayImg.src = img.src;
        }
    });
    quantityControler.addEventListener("click", (e) => {
        const btn = e.target.closest(".quantity-btn");
        if (!btn) return;
        if (btn.id === "decreaseQty") {
            let value = Number(Quantity.textContent);
            value--;
            if (value === 0) return;
            Quantity.textContent = value;
        }
        if (btn.id === "increaseQty") {
            let value = Number(Quantity.textContent);
            value++;
            Quantity.textContent = value;
        }
    })
    addToCartBtn.addEventListener("click",()=>{
        const Qvalue = Quantity.textContent;
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (e) {
            console.warn("Resetting corrupted cart data.");
            localStorage.setItem("cart", JSON.stringify([]));
        }
        addToCart(cart,product,Qvalue);
        window.location.href = `cart.html`
    })
}
initApp();
initProductDetails();
setupEventListeners();