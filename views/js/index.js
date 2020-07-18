/*-------------------------------------------------------
    Nous récuperons les produits cameras et affichons tous 
    les produits dans l'index.html
    ----------------------------------------------------*/
const url = "http://localhost:3000/api/cameras";
const products = document.querySelector('.productsJs');

// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    // we create a new instance of Products Class
    const products = new Products();
    products.getCamerasAsync();
});

 class Products {
    async getCamerasAsync() {
        // récuperation de la ressource avec l'API fetch
        // Nous attendons la résolution de la promesse avec await
        let res = await fetch(url);
        let cameras = await res.json()
            // si la promesse est tenue
            .then((cameras) => {
                cameras.map((allCamera) => {
                    let {
                        _id,
                        name,
                        price,
                        description,
                        imageUrl
                    } = allCamera;
                    // nous recuperons les propriéte de notre objet que nous mettons dans notre ul
                    products.innerHTML += `
                    <li class="show-product">
                        <div class="products-img">
                            <img src="${imageUrl}" alt="image-${name}" class="img-cameras">
                        </div>
                        <div>
                            <h2> ${name}</h2>
                            <a href="produit.html?id=${_id} ">Personnaliser</a>
                            <p> ${description}</p>
                            <h3> ${price} €</h3>
                            <button type="button" data-id="${_id}" class="btn btn-add-cart" data-id=${_id}> Ajouter au panier</button>
                        </div>
                    </li>`;
                })

                return cameras;
            })
            // if promise is reject log error 
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