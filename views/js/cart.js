
/*-------------------variables-----------------*/
//const deleteItemInCart = document.querySelector('.remove-item');
const btnClearCart = document.querySelector('.btn-clear-cart');
const cartItems = document.querySelector('.cart-items');
const cartItemsMobiles = document.querySelector('.cart-items-mobiles');
const formSubmit = document.querySelector('.contact-form');
const continueShopping = document.querySelector('.btn-payment');
const showForm = document.querySelector('.show-form');
const displayProductsIncart = document.querySelector('.products__cart--list');
const requiredInput = document.querySelector('.requiredInput');
const sectionInfosCart = document.querySelector('.section__infosCart');
const sectionForm = document.querySelector('.section-form');
const confirmOrder = document.querySelector('.confirm-order');
const confirmOrderBtn = document.querySelector('#confirm-btn');

const sectionConfirm = document.querySelector('.section__confirm--bloc');

let products = [];
const urlOrder = "http://localhost:3000/api/cameras/order";

document.addEventListener('DOMContentLoaded', () => {
    displayProductsSaveInCart();
})

/*---Display products saved in localStorage---*/
let itemsCart = JSON.parse(localStorage.getItem('cart'));
let totalPriceOrder = 0;

function displayProductsSaveInCart() {
    for (let i = 0; i < itemsCart.length; i++) {
        displayProductsIncart.innerHTML += ` 
        <article class="show-product">
            <div class="products-img">
                <img src="${itemsCart[i].img}" alt="image-${itemsCart[i].name}" class="img-camera">
            </div>
            <div class="show-product-infos"> 
                <div>
                    <h3 class="name-product"> <a href="panier.html/?id=${itemsCart[i].id}">${itemsCart[i].name} </a></h3>
                </div>
                <div>
                    <h3> ${itemsCart[i].price}€ x ${itemsCart[i].quantity}</h3>
                </div>
            </div>
            <div class="price-product">
                <h3>${itemsCart[i].totalPrice}€</h3>
            </div>
            <div>
                <i class="fas fa-trash-alt"></i>
            </div>
        </article>`;

        totalPriceOrder += itemsCart[i].totalPrice;
        const cartTotal = document.querySelector('.cart-total');
        cartTotal.innerHTML = totalPriceOrder;
    }
}


// remove all products in cart 
btnClearCart.addEventListener('click', () => {
    clearCart();
});

/*-------------------------------------------------------
            Display form and checking inputs
--------------------------------------------------------*/
// display form when user clicks
continueShopping.addEventListener('click', () => {
    showForm.classList.remove('display-form');
    continueShopping.style.display = 'none';
});

confirmOrderBtn.addEventListener('click', () => {
    for (let i = 0; i < itemsCart.length; i++) {
        products.push(itemsCart[i].id)
    }
    responseServer();
})


const contact = {
    'lastName': lastName.value,
    'firstName': firstName.value,
    'email': email.value,
    'address': address.value,
    'city': city.value,
}

// when user click for submit form, show a summary and Total price & a btn to confirm
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    if (formSubmit.checkValidity() === false) {
        requiredInput.innerHTML = "Merci de completer le formulaire!";
        requiredInput.style.color = "red";
    } else {
        displayOrderResume()
    }
});

function displayOrderResume() {
    confirmOrder.innerHTML = `
        <h3>Résumé de la commande</h3>
        <div>
            <p>Nom: ${lastName.value}</p>
            <p>Prénom: ${firstName.value}</p>
            <p>Email: ${email.value}</p>
            <p>Adresse: ${address.value}</p>
        </div>
        <div>
            <h3>Total commande: ${totalPriceOrder}€</h3>
        </div>`;
    showForm.style.display = "none";
    continueShopping.style.display = "none"
    confirmOrderBtn.classList.remove('display-btn');
}

function postObjectsContactProducts() {
    let result = fetch(urlOrder,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ contact, products })
        })
    return result
}

function responseServer() {
    postObjectsContactProducts()
        .then((response) => {
            response.json()
                .then((dataServer) => {
                    sessionStorage.setItem('dataServer', JSON.stringify(dataServer))
                    if (response.status === 201) {
                        setTimeout(confirmPage, 2000);
                    }
                })
        })
        .catch((error) => console.log(error))
}

function confirmPage() {
    location.href = "confirmation.html";
}

function clearCart() {
    localStorage.removeItem('cart');
    displayProductsIncart.innerHTML = `<p class="empty-cart">Votre panier est vide</p>`;
    sectionInfosCart.style.display = "none";
    continueShopping.style.display = "none";
    confirmOrder.style.display = "none";
    cartItems.innerHTML = "0";
    cartItemsMobiles.innerHTML = "0";
    showForm.style.display = "none";
}

// check all inputs in this function
function validateForm() {
    let regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;

    if (name.value == "") {
        requiredInput.innerHTML = "Veuillez rentrez votre nom!";
        return false;
    }
    if (firstName.value == "") {
        requiredInput.innerHTML = "Veuillez rentrez votre prénom!";
        return false;
    }
    if (email.value == "") {
        requiredInput.innerHTML = "Veuillez rentrer votre e-mail!"
        return false;

    } else if (!regex.test(email)) {
        requiredInput.innerHTML = "Veuillez rentrer un e-mail valide";
        return false
    }
    if (adress.value == "") {
        requiredInput.innerHTML = "Veuillez rentrer une adresse";
        return false;
    }
    requiredInput.innerHTML = "En cours d'envoie..."
}
