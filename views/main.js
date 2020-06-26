



const url = "http://localhost:3000/api/cameras";
const products = document.querySelector('.productsJs')


 async function getCamerasAsync() {
    let res = await fetch(url);
    let cameras = await res.json()
        .then((cameras) => {
            cameras.forEach(camera => {
                let { _id, name, colors, price, description, imageUrl } = camera
                products.innerHTML += `
                <li class="show-product">
                    <div class="products-img">
                        <img src="${imageUrl}" alt="" class="img-cameras">
                    </div>
                    <div>
                        <h2> ${name}</h2>
                        <p> ${description}</p>
                        <h3> ${price} €</h3>
                        <button type="button" id="btn-add-cart" class="btn"> Ajouter au panier</button>
                    </div>
                </li>`;
            })

            return cameras; 
        })
       
        }

        window.onload = () => {
            getCamerasAsync();
        }


