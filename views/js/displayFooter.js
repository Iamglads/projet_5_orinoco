const footer = document.querySelector('.page-footer');

document.addEventListener('DOMContentLoaded', () => {
    footer.innerHTML = `
    <!-- Footer Elements -->
    <div class="footer-element col-md-12 py-2">
    <div class="footer-text">
        <ul>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Mentions légales</a></li>
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