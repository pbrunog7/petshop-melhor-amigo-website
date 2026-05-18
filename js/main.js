// HEADER
const header = document.getElementById('header');

header.innerHTML = `
    <header class="navbar">
        <div class="navbar__logo">
            <img src="assets/images/logo.svg" class="navbar__img">
            <a href="index.html" class="navbar__title">Melhor Amigo</a>
        </div>
        <nav class="navbar__links">
            <a href="index.html" class="navbar__link">Home</a>
            <a href="produtos.html" class="navbar__link">Produtos</a>
            <a href="galeria.html" class="navbar__link">Galeria</a>
            <a href="perfildopet.html" class="navbar__link">Perfil do Pet</a>
            <a href="contato.html" class="navbar__link">Contato</a>
        </nav>
        <input type="checkbox" id="checkbox" class="checkbox visuallyHidden">
        <label for="checkbox" class="menu__hamburger">
            <div class="hamburger hamburger2">
                <span class="bar bar1"></span>
                <span class="bar bar2"></span>
                <span class="bar bar3"></span>
                <span class="bar bar4"></span>
            </div>
        </label>
    </header>

    <!-- Menu mobile -->
    <div class="navbar__mobile" id="mobileMenu">
        <a href="index.html" class="navbar__mobile-link">Início<i class="fa-solid fa-chevron-right"></i></a>
        <a href="produtos.html" class="navbar__mobile-link">Produtos<i class="fa-solid fa-chevron-right"></i></a>
        <a href="galeria.html" class="navbar__mobile-link">Galeria<i class="fa-solid fa-chevron-right"></i></a>
        <a href="perfildopet.html" class="navbar__mobile-link">Perfil do Pet<i class="fa-solid fa-chevron-right"></i></a>
        <a href="contato.html" class="navbar__mobile-link">Contato<i class="fa-solid fa-chevron-right"></i></a>
    </div>
    
    <div class="overlay" id="overlay"></div>
`;


// LINK ATIVO NO MENU DESKTOP
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.navbar__link');

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('navbar__link--active');
  };
});


// MENU MOBILE TOGGLE + OVERLAY
const hamburgerBtn = document.getElementById('checkbox');
const menu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const menuScroll = document.body;

hamburgerBtn.addEventListener('click', () => {
    toggleClasses();
});

// Fecha o menu ao clicar fora
overlay.addEventListener('click', () => {
    toggleClasses();
});

//Fecha ao clicar em um link
const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleClasses();
  });
});

function toggleClasses() {
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    menuScroll.classList.toggle('no-scroll');
};

// Garante que o menu hamburger volte ao seu estado inicial
window.addEventListener('pageshow', () => {
    let checkboxState = document.querySelector('.checkbox');
    checkboxState.checked = false;
    menu.classList.remove('open');
    overlay.classList.remove('active');
});


// FOOTER
const footer = document.getElementById('footer');

footer.innerHTML = `
    <footer class="footer">
        <div class="footer__logo">
            <img src="assets/images/logo-white.webp" class="footer__logo-img">
            <span class="footer__logo-span">Melhor Amigo</span>
        </div>
        <p  class="footer__text">© 2026 Petshop Melhor Amigo. Todos os direitos reservados.</p>
        <div>
            <p  class="footer__text">Rua dos Animais, 123 - São Paulo, SP<br>
            (11) 98765-4321<br>
            contato@melhoramigo.com.br</p>
        </div>
    </footer>
`;