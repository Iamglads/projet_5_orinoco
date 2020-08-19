
/*-----------------------------------------------------
When user click on personalize link, we display product  with id on the product page
-------------------------------------------------------*/
const url = "http://localhost:3000/api/cameras";
const productsDOM = document.querySelector('.personalizeJs');
const addToCart = document.querySelector('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const emptyCart = document.querySelector('.products__cart--list');

// array to save product in localStorage
let cart = []

// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    const getOneProduct = new Personalize();
    getOneProduct.displayOneCamera();

});

// this class get the camera selected in home page and display it with his id (in url)
class Personalize {
    async displayOneCamera() {
        // get the id and asign to params variable 
        let params = new URLSearchParams(window.location.search);
        params.has('id');
        let id = params.get('id');

        let res = await fetch(url + "/" + id);
        let product = await res.json()
            .then((camera) => {
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
                // get lenses of camera, it is an array, so we run in this array with for  
                //console.log(camera.lenses.length) test if we get the array
                for (let i = 0; i < camera.lenses.length; i++) {
                    const selectLenses = document.querySelector('.camera-lenses');
                    selectLenses.innerHTML += `<option id="lenses" value="${camera.lenses[i]}">${camera.lenses[i]}</option>`;
                }

                const quantity = document.querySelector('#quantity');
                const lenses = document.querySelector('#lenses');

                // when users click on button add to cart, we push the product information in cart array and save this cart in local storage
                addToCart.addEventListener('click', () => {

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
                   /*  const doubleId = cartJSON.parse(objetWithAllInfo.id);
                    console.log(doubleId); */

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
            .catch(error => { console.log(error) })
    }
}




