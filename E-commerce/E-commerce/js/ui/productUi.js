export const mainImage = document.getElementById("mainImage");
const titleEL = document.getElementById("productTitle");
const priceEl = document.getElementById("productPrice");
const descriptionEl = document.getElementById("productDesc");
const productDetailCont = document.getElementById("productDetails")
export const thumbnailRow = document.getElementById("thumbnailList");

export function renderProduct(product) {
    const { id, discountPercentage, images, category, title, price, description } = product;
    productDetailCont.setAttribute("data-id",id)
    titleEL.textContent = title;
    descriptionEl.textContent = description;
    priceEl.textContent = price;
    const thumbnails = images.map(img => {
        return `
        <div class="thumbnail">
            <img src="${img}" alt="img"> 
        </div>
        `
    }).join("");
    mainImage.querySelector("img").src = images[0];
    thumbnailRow.innerHTML = thumbnails;
    thumbnailRow.querySelector(".thumbnail:first-child").classList.add("active");
}