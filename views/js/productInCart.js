const cartItems = document.querySelector('.cart-items');


document.addEventListener('DOMContentLoaded', () => {
    let getCart = JSON.parse(localStorage.getItem('cart'));
    if (getCart <= 0) {
        emptyCart.innerHTML = "Votre panier est vide";
    } else{
        let cartQuantity = getCart.length;
        cartItems.innerHTML = cartQuantity;
        //console.log(getCart.length);
    }
});