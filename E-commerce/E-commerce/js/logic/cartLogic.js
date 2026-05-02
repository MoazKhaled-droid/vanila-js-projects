export function addToCart(cart, product, quantity) {
    const { id, price, title, thumbnail } = product;
    const cartProduct = {
        "id": id,
        "price": price,
        "thumbnail": thumbnail,
        "title": title,
        "quantity": +quantity,
    }
    let isExistingInCart = cart.find(product => product["id"] === id);
    if (cart.find(product => product["id"] === id)) {
        isExistingInCart.quantity += +quantity;
    } else {
        cart.push(cartProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function removeFromCart(cart, id) {
    const updatedCart = cart.filter(({ "id": pId }) => pId !== id);
    return updatedCart;
}
export function calcInvoice(subTotalField, totalField, cartData) {
    // نستخدم الـ cartData المبعوتة مباشرة بدل ما نقرأ من الـ storage كل شوية
    const total = cartData.reduce((acc, { quantity, price }) => {
        return acc + price * quantity;
    }, 0);
    subTotalField.textContent = total.toFixed(2); // إضافة كسور عشرية لشكل أنضف
    totalField.textContent = total.toFixed(2);
}