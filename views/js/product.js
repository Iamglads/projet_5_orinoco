/*-----------------------------------------------------
When user click on personalize link, we display product 
with id on the product page
-------------------------------------------------------*/
const url = "http://localhost:3000/api/cameras";
const productsDOM = document.querySelector('.personalizeJs'); // page produit



// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    const getOneProduct = new Personalize();
    getOneProduct.getOneCameraInProductPage();
});

class Personalize {
    async getOneCameraInProductPage() {
        let params = new URLSearchParams(window.location.search);
        params.has('id');
        let id = params.get('id');

        let res = await fetch(url+"/"+id);
        let product = await res.json()
            .then((product) => {
                     productsDOM.innerHTML = ` <article class="show-product">
                     <div class="products-img">
                         <img src="${product.imageUrl}" alt="image-${product.name}" class="img-camera">
                     </div>
                     <div class="infos-product">
                         <h2> ${product.name}</h2>
                         <p> ${product.description}</p>
                         <h3> ${product.price} €</h3>
                         <button type="button" id="${product.id}" class="btn add-to-cart" data-id=${product.id}> Ajouter
                             au panier</button>
                     </div>
                 </article>`;
                 })
            .catch(error => { console.log(error) })
    }
}





