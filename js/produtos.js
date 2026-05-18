// CONTROLE DOS CARDS DE PRODUTOS
const openBtn = document.querySelectorAll('.products__btn');

openBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const div = btn.closest('.products__section').querySelector('.products__container');
        div.classList.toggle('open');
        if (div.classList.contains('open')) {
            btn.innerHTML = `Ver menos <i class="fa-solid fa-chevron-up"></i>`;
        } else {
            btn.innerHTML = `Ver mais <i class="fa-solid fa-chevron-down"></i>`;
        }
    });
});