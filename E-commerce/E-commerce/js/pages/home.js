import { isLoggedIn } from "../logic/authLogic.js";
import { switchDarkLight } from "../ui/sharedUi.js";
import { toggleLoader } from "../ui/sharedUi.js";
import { renderProducts, rendercatBtns } from "../ui/homeUi.js";
import { getCatigorys, getProducts, getSearchProducts, getOneCatigory } from "../api/productApi.js";
import { filter, initApp } from "../logic/utils.js";
const savedTheme = localStorage.getItem("theme");
initApp();
// constants 
const filterContainer = document.getElementById("categoryFilters");
const allFilter = document.getElementById("All")
const productGrid = document.getElementById("productGrid");
const addMoreBtn = document.getElementById("addBtn");
// Toggle Sidebar Categories
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
const catSearch = document.getElementById("catSearch");
const productSearch = document.getElementById("searchInput");

let AllCat = [];

let productCounter = 0;
let Cattimer;
let searchTimer;
let skipValue = 0;
// Start collapsed on mobile devices
if (window.innerWidth <= 600) {
    sidebar.classList.add('collapsed');
}
// init 
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
async function initHome() {
    try {
        toggleLoader(true);
        const homeProducts = await getProducts();
        AllCat = await getCatigorys(); 

        productGrid.innerHTML = renderProducts(homeProducts);
        filterContainer.innerHTML = rendercatBtns(AllCat); 
    } catch (e) {
        console.error(e.message);
    } finally {
        toggleLoader(false);
    }
}
initHome()
// Events 
productGrid.addEventListener("click",(e)=>{
const detailsBtn = e.target.closest(".details-btn");
    if (!detailsBtn) return;
    const id = detailsBtn.getAttribute("data-id"); 
    window.location.href = `product.html?id=${id}`;
})

productSearch.addEventListener("input",()=>{
    clearTimeout(searchTimer);
    searchTimer = setTimeout(async ()=>{
        try{
            const term = productSearch.value.trim();
            const products = await getSearchProducts(term);
            productGrid.innerHTML = renderProducts(products);
        }catch(e){
            console.log(e.message);
        }
    },1000)
})

addMoreBtn.addEventListener("click", async () => {
    skipValue += 20;
    productCounter++
    try {
        toggleLoader(true);
        const homeProducts = await getProducts(skipValue);
        const catygories = await getCatigorys();
        productGrid.innerHTML += renderProducts(homeProducts);
        filterContainer.innerHTML += rendercatBtns(catygories);
    } catch (e) {
        throw new Error(e.message)
    } finally {
        toggleLoader(false)
    }
})

catSearch.addEventListener("input", () => {
    clearTimeout(Cattimer);
    Cattimer = setTimeout(() => {
        let term = catSearch.value;
        filterContainer.innerHTML = rendercatBtns(filter(term, AllCat));
    }, 500)
})

filterContainer.addEventListener("click", async (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const category = btn.getAttribute("data-category");
    if (category === "all") {
        try {
            toggleLoader(true);
            skipValue = 0;
            const homeProducts = await getProducts(0, 20);
            productGrid.innerHTML = renderProducts(homeProducts);
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        } catch (err) {
            console.error(err.message);
        } finally {
            toggleLoader(false);
        }
    } else {
        try {
            toggleLoader(true);
            skipValue = 0;
            const Products = await getOneCatigory(category);
            productGrid.innerHTML = renderProducts(Products);
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        } catch (err) {
            console.error(err.message);
        } finally {
            toggleLoader(false);
        }
    }
});
