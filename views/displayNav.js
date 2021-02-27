
window.onscroll = () => {
    fixeNavBar();
}

function fixeNavBar() {
    let nav = document.querySelector('.menu-nav');
    let sticky = nav.offsetTop;

    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}