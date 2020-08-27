
import { getRessource } from './functions.js';
const productsDOM = document.querySelector('.productsJs');
/*-------------------------------------------------------
   get all produts rom API and display in main page
    ----------------------------------------------------*/

class Products {
    getCameras() {
        getRessource()
            .then((allCameras) => {
                this.displayCameras(allCameras);
            })
            // if promise is reject log an error. 
            .catch(error => { console.log(error) })
    }
    // display all products in home page
    displayCameras(cameras) {
        cameras.map((camera) => {
            // nous recuperons les propriéte de notre objet que nous mettons dans notre ul
            productsDOM.innerHTML += `
            <li class="show-product">
                <div class="products-img">
                    <img src="${camera.imageUrl}" alt="image-${camera.name}" class="img-cameras">
                </div>
                <div class="show-product-infos">
                    <h2> ${camera.name}</h2>
                    <p> ${camera.description}</p>
                    <h3> ${camera.price / 100} €</h3>
                    <a href="/views/pages/produit.html?id=${camera._id}" class="btn add-to-cart"> Personnaliser</a>
                </div>
            </li>`;
        })
    }
}
// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    // we create a new instance of Products Class and execute the method getCamera
    const products = new Products();
    products.getCameras()
});

















