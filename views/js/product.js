import { getOneCameraById } from './functions.js'
/*-----------------------------------------------------
When user click on personalize link, we display product  with id on the product page
-------------------------------------------------------*/
const productsDOM = document.querySelector('.personalizeJs');
const addToCart = document.querySelector('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const emptyCart = document.querySelector('.products__cart--list');
let cart = []

// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    const getOneProduct = new PersonalizeCamera();
    getOneProduct.displayOneCamera();

});

// this class get the camera selected in home page and display it with his id (in url)
class PersonalizeCamera {
    displayOneCamera() {
        getOneCameraById()
            .then((camera) => {
                this.displayOneCameraToPersonalize(camera)
                return camera
            })
            .catch(error => { console.log(error) })
        this.addCameraInCartAfterPersonalize()
    }
    displayOneCameraToPersonalize(camera) {
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
        //console.log(camera.lenses.length) test if we get the array
        for (let i = 0; i < camera.lenses.length; i++) {
            const selectLenses = document.querySelector('.camera-lenses');
            selectLenses.innerHTML += `<option id="lenses" value="${camera.lenses[i]}">${camera.lenses[i]}</option>`;
        }
    }

    addCameraInCartAfterPersonalize() {
        // when users click on button add to cart, we push the product information in cart array and save this cart in local storage
        getOneCameraById()
            .then((camera) => {
                addToCart.addEventListener('click', () => {
                    const quantity = document.querySelector('#quantity');
                    const lenses = document.querySelector('#lenses');

                    let objetWithAllInfo = {
                        "id": camera._id,
                        "name": camera.name,
                        "img": camera.imageUrl,
                        "price": camera.price / 100,
                        "quantity": quantity.value,
                        "lense": lenses.value,
                    }
                    const totalPrice = (camera.price / 100) * quantity.value
                    objetWithAllInfo.totalPrice = totalPrice;


                    cart = JSON.parse(localStorage.getItem('cart')) || [];

                    cart.push(objetWithAllInfo);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    console.log(objetWithAllInfo)

                    // update the cart item to show the number of products in cart
                    let getCart = JSON.parse(localStorage.getItem('cart'));
                    let cartQuantity = getCart.length;
                    cartItems.innerHTML = cartQuantity;

                    // disable the button if this product is already in cart
                    addToCart.innerText = "Ajouté";
                    addToCart.disabled = true;
                })
            })
            .catch((error) => console.log(error))

    }
}


