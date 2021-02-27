

const sectionConfirm = document.querySelector('.section__confirm--bloc');
const dataServer = JSON.parse(sessionStorage.getItem('dataServer'));
const totalPriceOrder = JSON.parse(sessionStorage.getItem('totalPriceOrder'))


document.addEventListener('DOMContentLoaded', () => {
    displayResumeOrder()
})

// display the resume of order, total price and the orderId sent by server 
function displayResumeOrder() {
    sectionConfirm.innerHTML = `
    <p class="empty-cart">Bonjour ${dataServer.contact.firstName} ${dataServer.contact.lastName}, Votre commande d'un montant total de <b>${totalPriceOrder}€</b> est enregistrée.
        Veuillez noter votre numéro de commande: <br /> <b>${dataServer.orderId}</b>, <br /> vous allez recevoir un email avec le résumé de la commande.
    </p>
    <div class="div-check"> <i class="fas fa-check"></i></div>`;

}


console.log(dataServer);
console.log('Montant total: ' + totalPriceOrder + '€');


