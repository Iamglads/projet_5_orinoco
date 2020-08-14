//variables
const deleteItem = document.querySelector('.remove-item');
const btnClearCart = document.querySelector('.btn-clear-cart');
const formSubmit = document.querySelector('.submit-btn');
const continueShopping = document.querySelector('.btn-payment');
const showForm = document.querySelector('.show-form');
const displayProductsIncart = document.querySelector('.products__cart--list');
const requiredInput = document.querySelector('.requiredInput');
const cartTotal = document.querySelector('.cart-total');
const sectionInfosCart = document.querySelector('.section__infosCart');
const sectionForm = document.querySelector('.section-form');

document.addEventListener('DOMContentLoaded', () => {
    displayProductsSaveInCart()
})

// afficher les produits sauvegarder dans le storage
function displayProductsSaveInCart() {
    let itemsInStorage = JSON.parse(localStorage.getItem('cart'));
    let sum = 0;
    for (let i = 0; i < itemsInStorage.length; i++) {
        // get products save in storage
        displayProductsIncart.innerHTML += `
        <article class="show-product">
            <div class="products-img">
                <img src="${itemsInStorage[i].img}" alt="image-${itemsInStorage[i].name}" class="img-camera">
            </div>
            <div> 
                <div>
                    <h3>${itemsInStorage[i].name}</h3>
                </div>
                <div>
                    <h3> ${itemsInStorage[i].price} * ${itemsInStorage[i].quantity}</h3>
                </div>
            </div>
            <div class="remove-item">
            <h3>${itemsInStorage[i].totalPrice}€</h3>
            </div>
            <div class="remove-item">
                <i class="fas fa-trash-alt"></i>
            </div>
        </article>`;
        sum += itemsInStorage[i].totalPrice;
        cartTotal.innerHTML = sum;
    }

deleteItem.addEventListener('click', () => {
    console.log('remove item')
});

}


btnClearCart.addEventListener('click', () => {
    localStorage.removeItem('cart');
    displayProductsIncart.innerHTML = `<p class="empty-cart">Votre panier est vide</p>`;
    sectionInfosCart.style.display = "none";
    continueShopping.style.display = "none"
});

/*-------------------------------------------------------
            Display form and checking inputs
--------------------------------------------------------*/
continueShopping.addEventListener('click', () => {
    showForm.classList.remove('display-form');
    console.log('display')
});
// Data from form
const name = document.querySelector('#name');
const firstName = document.querySelector('#firstName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const adress = document.querySelector('#adress');
const city = document.querySelector('#city');
const postCard = document.querySelector('#postCard');

// when user click for submit form, we get array products and all form data
formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const contact = {
        'name': name.value,
        'firstName': firstName.value,
        'email': email.value,
        'phone': phone.value,
        'adress': adress.value,
        'city': city.value,
        'postCard': postCard.value
    }

    if (validateForm()) {
        console.log(contact)
    } else {
        requiredInput.innerHTML = "Merci de completer le formulaire!";
        requiredInput.style.color = "red";
    }
});

// check all inputs in this function
function validateForm() {
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
    } else {
        let regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
        if (!regex.test(email)) {
            requiredInput.innerHTML = "Veuillez rentrer un e-mail valide";
        }
    }
    if (phone.value == "") {
        requiredInput.innerHTML = "Veuillez rentrer un numéro de téléphone";
        return false;
    }
    if (adress.value == "") {
        requiredInput.innerHTML = "Veuillez rentrer une adresse";
        return false;
    }
    if (city.value == "") {
        requiredInput.innerHTML = "Veuillez completer votre adresse avec la ville";
        return false;
    }
    if (postCard.value == "") {
        requiredInput.innerHTML = "Veuillez completer votre adresse avec le code postale";
        return false;
    }

    requiredInput.innerHTML = "En cours d'envoie..."
}







