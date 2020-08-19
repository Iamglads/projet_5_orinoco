
/*-------------------variables-----------------*/
const deleteItemInCart = document.querySelector('.fa-trash-alt');
const btnClearCart = document.querySelector('.btn-clear-cart');
const cartItems = document.querySelector('.cart-items');
const formSubmit = document.querySelector('.contact-form');
const continueShopping = document.querySelector('.btn-payment');
const showForm = document.querySelector('.show-form');
const displayProductsIncart = document.querySelector('.products__cart--list');
const requiredInput = document.querySelector('.requiredInput');
const sectionInfosCart = document.querySelector('.section__infosCart');
const sectionForm = document.querySelector('.section-form');
const confirmOrder = document.querySelector('.confirm-order');
const confirmOrderBtn = document.querySelector('#confirm-btn');

const urlOrder = "http://localhost:3000/api/cameras/order";

document.addEventListener('DOMContentLoaded', () => {
    displayProductsSaveInCart()
})

/*---Display products saved in localStorage---*/
let products = JSON.parse(localStorage.getItem('cart'));
let totalPriceOrder = 0;

function displayProductsSaveInCart() {
    for (let i = 0; i < products.length; i++) {
        displayProductsIncart.innerHTML += ` 
        <article class="show-product">
            <div class="products-img">
                <img src="${products[i].img}" alt="image-${products[i].name}" class="img-camera">
            </div>
            <div class="show-product-infos"> 
                <div>
                    <h3 class="name-product">${products[i].name}</h3>
                </div>
                <div>
                    <h3> ${products[i].price}€ x ${products[i].quantity}</h3>
                </div>
            </div>
            <div class="price-product">
                <h3>${products[i].totalPrice}€</h3>
            </div>
            <div class="remove-item">
                <i class="fas fa-trash-alt"></i>
            </div>
        </article>`;
        totalPriceOrder += products[i].totalPrice;
        const cartTotal = document.querySelector('.cart-total');
        cartTotal.innerHTML = totalPriceOrder;
    }
}

// remove all products in cart 
btnClearCart.addEventListener('click', () => {
    localStorage.removeItem('cart');
    displayProductsIncart.innerHTML = `<p class="empty-cart">Votre panier est vide</p>`;
    sectionInfosCart.style.display = "none";
    continueShopping.style.display = "none";
    confirmOrder.style.display = "none";
    cartItems.innerHTML = "0";
    showForm.style.display = "none";
});


/*-------------------------------------------------------
            Display form and checking inputs
--------------------------------------------------------*/
// display form chen user clicks
continueShopping.addEventListener('click', () => {
    showForm.classList.remove('display-form');
    continueShopping.style.display = 'none';
});

// Data from form
const lastName = document.querySelector('#name').value;
const firstName = document.querySelector('#firstName').value;
const email = document.querySelector('#email').value;
const address = document.querySelector('#adress').value;
const city = document.querySelector('#city').value;

const contact = {
    'lastName': lastName,
    'firstName': firstName,
    'email': email,
    'address': address,
    'city': city,
}

// when user click for submit form, show a summary and Total price & a btn to confirm
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    if (!validateForm) {
        requiredInput.innerHTML = "Merci de completer le formulaire!";
        requiredInput.style.color = "red";
    } else {
        confirmOrder.innerHTML = `
        <h3>Résumé de la commande</h3>
        <div>
            <p>Nom: ${lastName}</p>
            <p>Prénom: ${firstName}</p>
            <p>Email: ${email}</p>
            <p>Adresse: ${address}</p>
        </div>
        <div>
            <h3>Total commande: ${totalPriceOrder}€</h3>
        </div>
       `;
        showForm.style.display = "none";
        continueShopping.style.display = "none"
        confirmOrderBtn.classList.remove('display-btn');
    }

});

const sendToApi = () => {
    fetch(urlOrder,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ contact: contact, products: products })
        })
        .then((res) => res.json())
        .then((res) => console.log(JSON.stringify(res)))
        .catch((res) => console.log(res))
}


confirmOrderBtn.addEventListener('click', () => {
    console.log('Commandé confirmée');
    console.log(contact);
    console.log(products);
    sendToApi();
})

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










