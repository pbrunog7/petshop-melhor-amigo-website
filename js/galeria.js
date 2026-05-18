// GALERIA
const galleryInfos = [
    {
        image: "assets/images/pet1.webp",
        imageAlt: "Cão de pelagem curta marrom e branco tomando banho",
        name: "Thor",
        description: "Cliente • Banho Relaxante"
    },

    {
        image: "assets/images/pet2.webp",
        imageAlt: "Gato branco de pelo longo no textil vermelho",
        name: "Tigra",
        description: "Cliente • Ração Premium"
    },

    {
        image: "assets/images/pet3.webp",
        imageAlt: "Pequeno cão branco sendo tosado com uma tesoura",
        name: "Floquinho",
        description: "Cliente • Tosa Especializada"
    },

    {
        image: "assets/images/pet4.webp",
        imageAlt: "Gatinho laranja e molhado coberto por toalha branca",
        name: "Juca",
        description: "Cliente • Banho Relaxante"
    },

    {
        image: "assets/images/pet5.webp",
        imageAlt: "Filhote de cachorro Yorkshire Terrier marrom e preto na mesa branca",
        name: "Dodi",
        description: "Cliente • Banho e Tosa"
    },

    {
        image: "assets/images/pet6.webp",
        imageAlt: "Um cão marrom em pé em cima de um chão de madeira",
        name: "Caramelo",
        description: "Cliente • Ração Premium"
    },

    {   
        image: "assets/images/pet7.webp",
        imageAlt: "Filhote molhado sendo segurado nas maos durante o banho",
        name: "Pequena",
        description: "Cliente • Banho Relaxante"
    },

    {   
        image: "assets/images/pet8.webp",
        imageAlt: "Gato branco e preto deitado no tecido amarelo",
        name: "Tom",
        description: "Cliente • Ração Premium"
    },

    {
        image: "assets/images/pet9.webp",
        imageAlt: "Gato preto e branco deitado na cadeira de bambu marrom com um fundo verde",
        name: "Nina",
        description: "Cliente • Banho Relaxante"
    },

    {
        image: "assets/images/pet10.webp",
        imageAlt: "Golden Retriever com coleira preta",
        name: "Ernesto",
        description: "Cliente • Banho e Tosa"
    },

    {
        image: "assets/images/pet11.webp",
        imageAlt: "Um cão e um gato deitados juntos no piso",
        name: "Ramon & Olga",
        description: "Clientes • Banho, Tosa e Ração Premium"
    },

    {
        image: "assets/images/pet12.webp",
        imageAlt: "Gato branco, preto e marrom em um campo",
        name: "Lana",
        description: "Cliente • Ração Premium"
    },
];

const lightboxImg = document.getElementById('lightboxImg');
const lightboxName = document.getElementById('lightboxName');
const lightboxInfo = document.getElementById('lightboxInfo');

galleryInfos.forEach(item => {
    const galleryContainer = document.querySelector('.gallery__container');
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery__item');
    galleryContainer.appendChild(galleryDiv);
    galleryDiv.innerHTML += `
        <img src="${item.image}" alt="${item.imageAlt}" class="gallery__img">
    `
});

// LIGHTBOX
const galleryImg = document.querySelectorAll('.gallery__img');
const lightbox = document.getElementById('lightbox');
const bodyScroll = document.body;
let currentIndex = null;

// Abrir
galleryImg.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.classList.add('open');
        bodyScroll.classList.add('no-scroll');
        openLightbox(index);
    });
});

// Funções de touch
let touchstartX = null;
let touchendX = null;

lightbox.addEventListener('touchstart', (event) => {
    touchstartX = event.touches[0].clientX;
});

lightbox.addEventListener('touchend', (event) => {
    if (window.innerWidth < 760) {
        touchendX = event.changedTouches[0].clientX;
        if (touchendX < touchstartX && currentIndex < galleryInfos.length -1) {
            currentIndex += 1;
            openLightbox(currentIndex);
        } else if (touchendX > touchstartX  && currentIndex > 0) {
            currentIndex -= 1;
            openLightbox(currentIndex);
        };
    }    
});

// Seta: Próximo
const lightboxNext = document.getElementById('lightboxNext');
const lightboxPrev = document.getElementById('lightboxPrev');

lightboxNext.addEventListener('click', () => {
    if (currentIndex < galleryInfos.length -1) {
        currentIndex += 1;
        if (currentIndex === 11) {
            lightboxNext.classList.add('none');
        } else if (currentIndex === 1) {
            lightboxPrev.classList.remove('none');
        };
        openLightbox(currentIndex);
    };
});

//Seta: Anterior

lightboxPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        if (currentIndex === 0) {
            lightboxPrev.classList.add('none');
        } else if (currentIndex === 10) {
            lightboxNext.classList.remove('none');
        };
        openLightbox(currentIndex);
    };
});

// Fechar
const lightboxClose = document.getElementById('lightboxClose');

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
    bodyScroll.classList.remove('no-scroll');
});

// Função que insere as informações das imagens no lightbox
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryInfos[index].image;
    lightboxName.innerHTML = galleryInfos[index].name;
    lightboxInfo.innerHTML = galleryInfos[index].description;
};