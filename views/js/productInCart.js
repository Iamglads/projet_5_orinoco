const cartItems = document.querySelector('.cart-items');
const cartItemsMobiles = document.querySelector('.cart-items-mobiles');
const displayProductsIncart = document.querySelector('.products__cart--list');
const sectionInfosCart = document.querySelector('.section__infosCart');
const continueShopping = document.querySelector('.btn-payment');

document.addEventListener('DOMContentLoaded', () => {
    let getCart = JSON.parse(localStorage.getItem('cart'));
    if (getCart <= 0) {
       displayProductsIncart.innerHTML = `<p class="empty-cart">Votre panier est vide</p>`;
        sectionInfosCart.style.display = "none";
        continueShopping.style.display = "none";
    } else{
        let cartQuantity = getCart.length;
        cartItems.innerHTML = cartQuantity;
        cartItemsMobiles.innerHTML = cartQuantity;
        console.log(getCart.length);
    }
});