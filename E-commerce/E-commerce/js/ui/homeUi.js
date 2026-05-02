export function renderProducts(prductsObj) {
    const arr = prductsObj.products;
    if (!arr) return;
    let products = arr.map(({ id, discountPercentage, thumbnail, category, title, price, description }) => {
        return `
        <div class="product-card" data-id="${id}">
            <span class="discount-badge">${discountPercentage || 0}%</span>
            <div class="product-image-container">
                <img src="${thumbnail}"alt="Essence Mascara">
            </div>
            <div class="product-info">
                <span class="category-tag">${category || "Unknown"}</span>
                <h3 class="product-title">${title || "tilte"}</h3>
                <div class="product-price">${price || "price"}$</div>
                <p class="product-description">
                    ${description || "description"}
                </p>
                <div>
                    <button class="details-btn" data-id="${id}">
                        <i class="fa-solid fa-cart-plus"></i> Details 
                    </button>
                </div>
            </div>
        </div>
        `
    }).join("");
    return products;
}

export function rendercatBtns(arrOfCat) {
    if (!arrOfCat) return "";

    // ضيف زرار الـ All في أول الـ String
    let allBtn = `<button class="filter-btn active" data-category="all" id="All">All</button>`;

    let categoriesBtn = arrOfCat.map(({ slug, name }) => {
        return `
        <button class="filter-btn" data-category="${slug}">
            ${name}
        </button>
        `;
    }).join("");

    return allBtn + categoriesBtn;
}

