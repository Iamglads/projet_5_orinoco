window.onscroll = () => {
    fixeNavBar();
}
let nav = document.querySelector('.menu-nav');

let sticky = nav.offsetTop;

function fixeNavBar(){
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
    } else  {
        nav.classList.remove("sticky");
    }
}