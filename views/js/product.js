/*-----------------------------------------------------
When user click on personalize link, we display product 
with id on the product page
-------------------------------------------------------*/
const url = "http://localhost:3000/api/cameras";
const products = document.querySelector('.personalizeJs'); // page produit



// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    const getOneProduct = new Personalize();
    getOneProduct.getOneCameraInProductPage();
});

export class Personalize {
    async getOneCameraInProductPage() {
        let params = new URLSearchParams(window.location.search);
        params.has('id');
        let id = params.get('id');

        let res = await fetch(url+"/"+id);
        let product = await res.json()
            .then((product) => {
                     products.innerHTML = ` <article class="show-product">
                     <div class="products-img">
                         <img src="${product.imageUrl}" alt="image-${product.name}" class="img-camera">
                     </div>
                     <div class="infos-product">
                         <h2> ${product.name}</h2>
                         <p> ${product.description}</p>
                         <h3> ${product.price} €</h3>
                         <button type="button" id="${product.id}" class="btn btn-add-cart" data-id=${product.id}> Ajouter
                             au panier</button>
                     </div>
                 </article>`;
                 })
            .catch(error => { console.log(error) })

    }
}



 /*---------------------------------------------------
                ADD TO CART - LOCAL STORAGE
-----------------------------------------------------*/
let cart = [];
let buttonsDOM = [];

function addToCart() {
    let btnAddToCart = document.querySelectorAll('.btn-add-cart');
    buttonsDOM = btnAddToCart;


        if (inCart) {
            button.innerText = "Ajouté au panier";
            button.disabled = true;
        }

        button.addEventListener('click', () => {
            console.log('Ajouté au panier')
        })
    // le produit est ajouter au panier, on alert "Ajouté au panier"

    // produit est gardé dans la session storage
    
    // l'utilisateur reste sur la même page
}


//local storage
class Storage {
    static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
      let products = JSON.parse(localStorage.getItem("products"));
      return products.find(product => product.id === id);
    }
    static saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
      return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    }
  }


