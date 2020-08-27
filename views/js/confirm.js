const sectionConfirm = document.querySelector('.section__confirm--bloc');
const dataServer = JSON.parse(sessionStorage.getItem('dataServer'));

document.addEventListener('DOMContentLoaded', () => {
    displayResumeOrder()
})

console.log(dataServer);

function displayResumeOrder() {
    sectionConfirm.innerHTML = `
    <p class="empty-cart">Bonjour ${dataServer.contact.firstName} ${dataServer.contact.lastName}, Votre commande d'un montant total de <b>${totalPriceFunction()/100}€</b> est enregistrée.
        Veuillez noter votre numéro de commande: <br /> <b>${dataServer.orderId}</b>, <br /> vous allez recevoir un email avec le résumé de la commande.
    </p>
    <div class="div-check"> <i class="fas fa-check"></i></div>`;
}

function totalPriceFunction() {
    let totalPrice = 0
    for (let i = 0; i < dataServer.products.length; i++) {
        totalPrice += dataServer.products[i].price;
        
    }
    return totalPrice
}

console.log('Montant total:' + totalPriceFunction()/100 + '€')




