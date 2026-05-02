export function renderCart(cart, inputField) {
    if (cart.length === 0) {
        inputField.innerHTML = "<h2>Your cart is empty</h2>";
        return;
    }
    
    const cartItems = cart.map(({ id, thumbnail, price, title, quantity }) => {
        return `
        <div class="cart-item" id="${id}">
            <div class="cart-item-image">
                <img src="${thumbnail}" alt="${title}">
            </div>
            
            <div class="cart-item-details">
                <a href="product.html?id=${id}">
                    <h3 class="cart-item-title">${title}</h3>
                </a>
                <div class="cart-item-price">$${price}</div>
            </div> <div class="cart-item-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="decCart${id}"><i class="fa-solid fa-minus"></i></button>
                    <span class="quantity-value" id="qtyCart${id}">${quantity}</span>
                    <button class="quantity-btn" id="incCart${id}"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="remove-btn" id="removeBtn${id}"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
        </div>
        `;
    }).join("");
    
    inputField.innerHTML = cartItems;
}