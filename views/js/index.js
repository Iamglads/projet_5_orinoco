/*-------------------------------------------------------
    Nous récuperons les produits cameras et affichons tous 
    les produits dans l'index.html
    ----------------------------------------------------*/
const url = "http://localhost:3000/api/cameras";
const productsDOM = document.querySelector('.productsJs');


const getRessource = async () => {
    // récuperation de la ressource avec l'API fetch
    const res = await fetch(url);
    const cameras = await res.json()
    return cameras
}

class Products {
    getCameras() {
        getRessource()
            .then( (cameras) => {
                this.displayCameras(cameras);
            })
            .then( (cameras) => {
                this.saveCamerasInStorage(cameras)
            })
            // if promise is reject log error 
            .catch(error => { console.log(error) })
    }

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
                <a href="produit.html?id=${camera._id} ">Personnaliser</a>
                <p> ${camera.description}</p>
                <h3> ${camera.price} €</h3>
                <button onclick="addToCart()" type="button" id="${camera._id}" class="btn add-to-cart">
                    Ajouté au panier
                    </button>
            </div>
        </li>`;
        })
    }

        saveCamerasInStorage(cameras){
            cameras.map((camera) => {
                localStorage.setItem("camera", JSON.stringify(camera));
            })
        }

}

    /*---------------------------------------------------
                   ADD TO CART - LOCAL STORAGE
    -----------------------------------------------------*/
    const addToCart = () => {
        // get all buttons 
        const cartBtn = document.querySelectorAll('.add-to-cart');
        let cart = {
            'itemsCart': []
        }

        cartBtn.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                //console.log(event.target)
                if (event.target.parentElement.classList.contains('show-product-infos')) {
                    let id = btn.id;
                    //let name = ;
                    let items = {
                        'id': id,
                        'name': 'name',
                        'price': 'price',
                        'image': 'image'
                    }
                    cart.itemsCart.items = items;
                    console.log(cart);

                    localStorage.setItem('itemsCart', JSON.stringify(cart.itemsCart));
                    let getItems = JSON.parse(localStorage.getItem(cart.itemsCart));

                    console.log(getItems)
                }
            })
        })

    }




    // Execute when Dom loaded
    document.addEventListener("DOMContentLoaded", () => {
        // we create a new instance of Products Class
        const products = new Products();
        products.getCameras()

    });

















