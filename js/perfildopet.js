const petForm = document.getElementById('petForm');
const petNameError = document.getElementById('petNameError');
const petGenderError = document.getElementById('petGenderError');
const petBreedError = document.getElementById('petBreedError');
const petDescriptionError = document.getElementById('petDescriptionError');
const petSubmitBtn = document.getElementById('petSubmitBtn');
const petLoading = document.getElementById('petLoading');
const petPlaceholder = document.getElementById('petPlaceholder');
const petCardContainer = document.getElementById('petCardContainer');


// EVENTO DE SUBMIT
petForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const petName = document.getElementById('petName').value.trim();
    const petGender = document.querySelector('input[name="petGender"]:checked')?.value;
    const petBreed = document.getElementById('petBreed').value.trim();
    const petDescription = document.getElementById('petDescription').value.trim();

    // Controla se o formulário passou em todas as validações
    let formValid = true;

    // --- Validação: Nome ---
    petNameError.innerHTML = "";
    if (petName === "") {
        petNameError.innerHTML = "Por favor, informe o nome do seu pet.";
        formValid = false;
    }

    // --- Validação: Gênero ---
    petGenderError.innerHTML = "";
    if (!petGender) {
        petGenderError.innerHTML = "Por favor, selecione o gênero do seu pet.";
        formValid = false;
    }

    // --- Validação: Raça ---
    petBreedError.innerHTML = "";
    if (petBreed === "") {
        petBreedError.innerHTML = "Por favor, informe a raça do seu pet.";
        formValid = false;
    }

    // --- Validação: Descrição ---
    petDescriptionError.innerHTML = "";
    if (petDescription === "") {
        petDescriptionError.innerHTML = "Conte um pouco sobre o seu pet para que a descrição fique especial!";
        formValid = false;
    }

    if (!formValid) return;


    // FORMULÁRIO VÁLIDO: inicia o fluxo de geração
    // 1. Desativa o botão para evitar cliques duplos
    petSubmitBtn.disabled = true;
    petSubmitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Gerando...`;

    // 2. Esconde o placeholder e mostra o loading
    petPlaceholder.classList.add('hidden');
    petCardContainer.innerHTML = ""; // Limpa card anterior, se houver
    petLoading.classList.remove('hidden');

    // 3. Chama a função que conversa com a API do Gemini
    const description = await generatePetDescription(petName, petGender, petBreed, petDescription);

    // 4. Esconde o loading
    petLoading.classList.add('hidden');

    // 5. Reativa o botão
    petSubmitBtn.disabled = false;
    petSubmitBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Gerar descrição`;

    // 6. Injeta o card com a descrição gerada (ou mensagem de erro)
    renderPetCard(petName, petGender, petBreed, description);
});


    // FUNÇÃO: CHAMA A API DO GEMINI (Google): Recebe os dados do pet, monta o prompt e retorna a descrição gerada pela IA como string
    async function generatePetDescription(name, gender, breed, details) {
    try {
        // fetch() faz a requisição HTTP para a API do Gemini
        const response = await fetch("https://petshop-melhor-amigo-api.onrender.com/gerar-perfil-pet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:        name,
                gender:      gender,
                breed:       breed,
                description: details
            })
        });

        const data = await response.json();
        return data.description;

    } catch (error) {
        // Se algo der errado
        console.error("Erro ao chamar a API:", error);
        return "Não foi possível gerar a descrição no momento. Por favor, tente novamente.";
    }
}


// FUNÇÃO: INJETA O CARD DE RESULTADO NO DOM: Recebe nome, raça e a descrição gerada pela IA e cria o HTML do card dinamicamente
function renderPetCard(name, gender, breed, description) {
    // Template literal: monta o HTML do card como string e injeta dentro do #petCardContainer
    petCardContainer.innerHTML = `
        <div class="pet-card">

            <!-- Cabeçalho: ícone + nome + raça -->
            <div class="pet-card__header">
                <div class="pet-card__icon">
                    <i class="fa-solid fa-paw"></i>
                </div>
                <div>
                    <p class="pet-card__name">${name}</p>
                    <p class="pet-card__gender">${gender === "macho" ? "Macho" : "Fêmea"}</p>
                    <p class="pet-card__breed">${breed}</p>
                </div>
            </div>

            <!-- Descrição gerada pela IA -->
            <p class="pet-card__description">${description}</p>

            <!-- Rodapé com assinatura do petshop -->
            <div class="pet-card__footer">
                <i class="fa-solid fa-heart"></i>
                <span>Criado com carinho pelo Petshop Melhor Amigo</span>
            </div>

            <!-- Botões de ação -->
            <div class="pet-card__actions">
                <button class="btn btn--secondary" id="printCardBtn">
                    <i class="fa-solid fa-download"></i> Salvar como imagem
                </button>
                <button class="btn btn--primary" id="regenerateBtn">
                    <i class="fa-solid fa-rotate"></i> Gerar novamente
                </button>
            </div>

        </div>
    `;

    // Evento do botão "Gerar novamente":
    // limpa o card e mostra o placeholder de volta
    document.getElementById('regenerateBtn').addEventListener('click', () => {
        petCardContainer.innerHTML = "";
        petPlaceholder.classList.remove('hidden');
        // Rola suavemente de volta ao formulário
        petForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Evento do botão "Salvar como imagem"
    document.getElementById('printCardBtn').addEventListener('click', () => {
        window.print();
    });
}
