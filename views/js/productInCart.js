const cartItems = document.querySelector('.cart-items');

document.addEventListener('DOMContentLoaded', () => {
    let getCart = JSON.parse(localStorage.getItem('cart'));
    let cartQuantity = getCart.length;
    cartItems.innerHTML = cartQuantity;
    //console.log(getCart.length);
});