const footer = document.querySelector('.page-footer');

document.addEventListener('DOMContentLoaded', () => {
    footer.innerHTML = `
    <!-- Footer Elements -->
    <div">
        <div class="footer-first-bloc">
            <div class="secure-payment">
                <i class="fas fa-credit-card"></i>
                <p class="bold">PAIEMENT SECURISE</p>
                <p>Commandez en toute sécurité</p>
            </div>
            <div class="delivery">
                <i class="fas fa-truck"></i>
                <p class="bold">LIVRAISON RAPIDE</p>
                <p>Expédition & Livraison rapide</p>
            </div>
            <div class="satisfy">
                <i class="fas fa-sync-alt"></i>
                <p class="bold">SATISFAIT OU REMBOURSE</p>
                <p>14 jours pour changer d'avis</p>
            </div>
        </div>
    </div>
    <div class="footer-element col-md-12 py-2 footer-second-bloc">
        <div class="footer-text">
            <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Mentions légales</a></li>
                <li><a href="#">Conditions d'utilisation</a></li>
            </ul>
        </div>
        <div>
            <!-- Facebook -->
            <a class="fb-ic">
                <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <!-- Twitter -->
            <a class="tw-ic">
                <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <!--Instagram-->
            <a class="ins-ic">
                <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <!--Pinterest-->
            <a class="pin-ic">
                <i class="fab fa-pinterest fa-lg white-text fa-2x"> </i>
            </a>
        </div>
        <div>
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-amex"></i>
            <i class="fab fa-cc-paypal"></i>
        </div>
    </div>
<!-- Copyright -->
<div class="footer-copyright text-center py-3">
    <span>© 2020 Copyright - <a href="#"> Orinoco</a></span>
</div>
<!-- Copyright -->`;
});