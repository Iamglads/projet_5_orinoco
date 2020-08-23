const sectionConfirm = document.querySelector('.section__confirm--bloc');
const dataServer = JSON.parse(sessionStorage.getItem('dataServer'));

//console.log(dataServer);

sectionConfirm.innerHTML = `
    <p class="empty-cart">Bonjour ${dataServer.contact.firstName} ${dataServer.contact.lastName}, Votre commande est enregistrée.
        Veuillez noter votre numéro de commande: <br /> <mark>${dataServer.orderId}</mark>, <br /> vous allez recevoir un email avec le résumé de la commande.
    </p>
    <div class="div-check"> <i class="fas fa-check"></i></div>`;