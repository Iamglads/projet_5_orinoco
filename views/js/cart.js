document.addEventListener('DOMContentLoaded', () => {
    //console.log('Chargé')
    let displayCart = new Cart()
    displayCart.displayProductsInCart();

    eventListeners()
})


class Cart {
    constructor() {
        this.cartItems = document.querySelector('.cart-items');
        this.cartItemsMobiles = document.querySelector('.cart-items-mobiles');
        this.showForm = document.querySelector('.show-form');
        this.displayProductsIncart = document.querySelector('.products__cart--list');
        this.requiredInput = document.querySelector('.requiredInput');
        this.sectionInfosCart = document.querySelector('.section__infosCart');
        this.sectionForm = document.querySelector('.section-form');
        this.confirmOrder = document.querySelector('.confirm-order');
        this.confirmOrderBtn = document.querySelector('#confirm-btn');
        this.continueShoppingBtn = document.querySelector('.btn-payment');
        this.formSubmitBtn = document.querySelector('.contact-form');
        this.sectionConfirm = document.querySelector('.section__confirm--bloc');

        // Data from form contact
        this.lastName = document.querySelector('#name');
        this.firstName = document.querySelector('#firstName');
        this.email = document.querySelector('#email');
        this.address = document.querySelector('#adress');
        this.city = document.querySelector('#city');
    }

    displayProductsInCart() {
        /*---Display products saved in localStorage---*/
        let itemsCart = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < itemsCart.length; i++) {
            this.displayProductsIncart.innerHTML += ` 
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
                    <h3>${this.calculateTotalPrice()}€</h3>
                </div>
                <div>
                    <i class="fas fa-trash-alt"></i>
                </div>
            </article>`;
        }
    }

    calculateTotalPrice() {
        let itemsCart = JSON.parse(localStorage.getItem('cart'));
        let totalPriceOrder = 0;
        for (let i = 0; i < itemsCart.length; i++) {
            totalPriceOrder += itemsCart[i].totalPrice;
        }
        const cartTotal = document.querySelector('.cart-total');
        cartTotal.innerHTML = totalPriceOrder;

        return totalPriceOrder
    }

    formSubmit() {
        this.validateForm();
        if (this.formSubmitBtn.checkValidity() === false) {
            this.requiredInput.innerHTML = "Merci de completer le formulaire!";
            this.requiredInput.style.color = "red";
        } else {
            this.displayOrderResume()
        }
    }

    displayOrderResume() {
        this.confirmOrder.innerHTML = `
        <h3>Résumé de la commande</h3>
        <div>
            <p>Nom: ${this.lastName.value}</p>
            <p>Prénom: ${this.firstName.value}</p>
            <p>Email: ${this.email.value}</p>
            <p>Adresse: ${this.address.value}</p>
        </div>
        <div>
            <h3>Total commande: ${this.calculateTotalPrice()}€</h3>
        </div>`;
        this.showForm.style.display = "none";
        this.continueShoppingBtn.style.display = "none"
        this.confirmOrderBtn.classList.remove('display-btn');
    }

    continueShopping() {
        this.showForm.classList.remove('display-form');
        this.continueShoppingBtn.style.display = 'none';
    }

    postObjectsContactProducts() {
        const urlOrder = "http://localhost:3000/api/cameras/order"
        let itemsCart = JSON.parse(localStorage.getItem('cart'));
        // array products 
        const products = [];

        for (let i = 0; i < itemsCart.length; i++) {
            products.push(itemsCart[i].id)
        }

        const contact = {
            'lastName': this.lastName.value,
            'firstName': this.firstName.value,
            'email': this.email.value,
            'address': this.address.value,
            'city': this.city.value,
        }
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

    responseServer() {
        this.postObjectsContactProducts()
            .then((response) => {
                response.json()
                    .then((dataServer) => {
                        sessionStorage.setItem('dataServer', JSON.stringify(dataServer))
                        console.log(dataServer)
                        if (response.status === 201) {
                            setTimeout(this.confirmPage(), 2000);
                        }
                    })
            })
            .catch((error) => console.log(error))
    }

    confirmOrder() {
        this.responseServer();
    }

    confirmPage() {
        location.href = "confirmation.html";
    }

    clearCart() {
        localStorage.removeItem('cart');
        this.displayProductsIncart.innerHTML = `<p class="empty-cart">Votre panier est vide</p>`;
        this.sectionInfosCart.style.display = "none";
        this.continueShoppingBtn.style.display = "none";
        this.confirmOrder.style.display = "none";
        this.cartItems.innerHTML = "0";
        this.cartItemsMobiles.innerHTML = "0";
        this.showForm.style.display = "none";
    }

    deleteItemInCart() {
        console.log('produits supprimé')
    }

    // check all inputs in this function
    validateForm() {
        let regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;

        if (this.lastName.value == "") {
            this.requiredInput.innerHTML = "Veuillez rentrez votre nom!";
            return false;
        }
        if (this.firstName.value == "") {
            this.requiredInput.innerHTML = "Veuillez rentrez votre prénom!";
            return false;
        }
        if (this.email.value == "") {
            this.requiredInput.innerHTML = "Veuillez rentrer votre e-mail!"
            return false;

        } else if (!regex.test(email)) {
            this.requiredInput.innerHTML = "Veuillez rentrer un e-mail valide";
            return false
        }
        if (this.adress.value == "") {
            this.requiredInput.innerHTML = "Veuillez rentrer une adresse";
            return false;
        }
        this.requiredInput.innerHTML = "En cours d'envoie..."
    }

}


function eventListeners() {

    const btnClearCart = document.querySelector('.btn-clear-cart');
    const deleteItemInCartIcon = document.querySelector('.fa-trash-alt');
    const confirmOrderBtn = document.querySelector('#confirm-btn');
    const formSubmitBtn = document.querySelector('.contact-form');
    const continueShoppingBtn = document.querySelector('.btn-payment');
    // new instance off cart
    const cart = new Cart()

    // remove all products in cart 
    btnClearCart.addEventListener('click', () => {
        cart.clearCart();
    })

    deleteItemInCartIcon.addEventListener('click', () => {
        cart.deleteItemInCart()
    })

    // display form when user clicks
    continueShoppingBtn.addEventListener('click', () => {
        cart.continueShopping()
    })

    confirmOrderBtn.addEventListener('click', () => {
        cart.responseServer()
    })

    // when user click for submit form, show a summary and Total price & a btn to confirm
    formSubmitBtn.addEventListener('submit', (e) => {
        e.preventDefault()
        cart.formSubmit()
    })

}





