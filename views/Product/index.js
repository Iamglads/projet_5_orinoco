import { getRessource } from '../API/callApi.js'
const sectionProducts = document.querySelector('.productsJs')

//get all produts from API and display in main page
class Products {
    // in this method we get the result from getRessource with then to display all cameras or catch errors

    async getAllCamerasFromApi() {
        try {
            let cameras = await getRessource();
            if (cameras.length > 0) {
                this.displayCameras(cameras)
            } else {
                alert('Error')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // display all products available in API in home page
    displayCameras(cameras) {
        cameras.map((camera) => {
            // for each camera, we passed variables in this template string with html code
            sectionProducts.innerHTML += `
            <li class="show-product">
                <div class="products-img">
                    <img src="${camera.imageUrl}" alt="image-${camera.name}" class="img-cameras">
                </div>
                <div class="show-product-infos">
                    <h2> ${camera.name}</h2>
                    <p> ${camera.description}</p>
                    <h3> ${camera.price / 100} €</h3>
                    <a href="/views/Product/produit.html?id=${camera._id}" class="btn add-to-cart"> Personnaliser</a>
                </div>
            </li>`
        })
    }
}


// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    // we create a new instance of Products Class and execute the method getCameras
    const products = new Products();
    products.getAllCamerasFromApi()
})

















