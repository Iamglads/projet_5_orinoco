const log = console.log;
/*-------------------------------------------------------
    Nous récuperons les produits cameras et affichons tous 
    les produits dans l'index.html
    ----------------------------------------------------*/
const url = "http://localhost:3000/api/cameras";
const productsDOM = document.querySelector('.productsJs');

// get products (cameras) with fetch API
const getRessource = async () => {
    const res = await fetch(url);
    const cameras = await res.json()
    return cameras
}

class Products {
    getCameras(cameras) {
        getRessource(cameras)
            .then((cameras) => {
                this.displayCameras(cameras);
            })
            // if promise is reject log an error. 
            .catch(error => { console.log(error) })
    }
    // display all products in home page
    displayCameras(cameras) {
        cameras.forEach((camera) => {
            // nous recuperons les propriéte de notre objet que nous mettons dans notre ul
            productsDOM.innerHTML += `
            <li class="show-product">
                <div class="products-img">
                    <img src="${camera.imageUrl}" alt="image-${camera.name}" class="img-cameras">
                </div>
                <div class="show-product-infos">
                    <h2> ${camera.name}</h2>
                    <p> ${camera.description}</p>
                    <h3> ${camera.price/100} €</h3>
                    <a href="/views/pages/produit.html?id=${camera._id}" class="btn add-to-cart"> Personnaliser</a>
                </div>
            </li>`;
        })
        this.saveCamerasInStorage(cameras)
    }
    // save all product in local storage 
    saveCamerasInStorage(cameras) {
        cameras.map((camera) => {
            //log(camera)
            localStorage.setItem("camera", JSON.stringify(camera));
        })
    }

}
// Execute when Dom loaded
document.addEventListener("DOMContentLoaded", () => {
    // we create a new instance of Products Class and execute the method getCamera
    const products = new Products();
    products.getCameras()
});

















