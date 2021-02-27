import { getOneCameraById } from '../API/callApi.js'


// this variable will be used to store the products objects in the array and we will save this array in localStorage
let cart = []


// this class get the camera selected in home page and display it with his id (in url)
class PersonalizeCamera {
    constructor() {
        this.addToCart = document.querySelector('.add-to-cart')
    }

    displayOneCamera() {

        getOneCameraById()
            .then((camera) => {
                this.displayOneCameraToPersonalize(camera)
                return camera
            })
            .catch(error => { console.log(error) })

        this.addCameraInCartAfterPersonalize()
    }

    // display the product in thml tags
    displayOneCameraToPersonalize(camera) {
        const productsDOM = document.querySelector('.personalizeJs')

        productsDOM.innerHTML = ` <article class="show-product">
                     <div class="products-img">
                         <img src="${camera.imageUrl}" alt="image-${camera.name}" class="img-camera">
                     </div>
                     <div class="infos-product">
                         <h2 id="${camera._id}"> ${camera.name}</h2>
                         <h3> ${camera.price / 100} €</h3>
                         <p> ${camera.description}</p>

                         <label for="lenses"> Objectifs</label>
                         <br />
                         <select name="lenses" id="lenses" class="camera-lenses">
                             <!-- options-->
                         </select>
                         <br />
                         <label for="lenses"> Quantité</label>
                         <br />
                         <input type="number" name="quantity" id="quantity" placeholder="Quantité" value="1"/>
                     </div>
                 </div>
                 </article>`;
        this.displayLenseCameras(camera)
    }
    displayLenseCameras(camera) {
        // get lenses of camera, it is an array, so we run in this array with for  
        for (let i = 0; i < camera.lenses.length; i++) {
            const selectLenses = document.querySelector('.camera-lenses');
            selectLenses.innerHTML += `<option id="lenses" value="${camera.lenses[i]}">${camera.lenses[i]}</option>`
        }
    }

    addCameraInCartAfterPersonalize() {
        getOneCameraById()
            .then((camera) => {
                // when users click on button add to cart, we push the product object in cart array and save this cart in localStorage
                this.addToCart.addEventListener('click', () => {
                    const quantity = document.querySelector('#quantity')
                    const lenses = document.querySelector('#lenses')

                    let objetWithAllInfo = {
                        "id": camera._id,
                        "name": camera.name,
                        "img": camera.imageUrl,
                        "price": camera.price / 100,
                        "quantity": quantity.value,
                        "lense": lenses.value,
                    }
                    // calculate total price and add to object
                    const totalPrice = (camera.price / 100) * quantity.value
                    objetWithAllInfo.totalPrice = totalPrice;

                    // getItem and push the product object in cart
                    cart = JSON.parse(localStorage.getItem('cart')) || []

                    cart.push(objetWithAllInfo);
                    localStorage.setItem('cart', JSON.stringify(cart))
                    //console.log(objetWithAllInfo)

                    this.disabledBtnAddToCart()
                    this.updateCartItems()
                })
            })
            .catch((error) => console.log(error))
    }

    // update the cart item to show the number of products in cart
    updateCartItems() {
        const cartItems = document.querySelector('.cart-items')
        let getCart = JSON.parse(localStorage.getItem('cart'))
        let cartQuantity = getCart.length;
        cartItems.innerHTML = cartQuantity;
    }

    // disable button when this product is adding
    disabledBtnAddToCart() {
        // trouver si l'identifiant du produit affiché correspond à unn identifiant d'un produit existant dans le tableau
        this.addToCart.innerText = "Ajouté"
        this.addToCart.disabled = true
    }
}



// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    // we create a instance of product and execute the method displayOneCamera()
    const getOneProduct = new PersonalizeCamera()
    getOneProduct.displayOneCamera()

});
