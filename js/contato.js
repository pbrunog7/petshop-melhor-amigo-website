const contactForm = document.getElementById('contactForm');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formName = document.getElementById('name').value;
    const formPhone = document.getElementById('phone').value;
    const formEmail = document.getElementById('email').value;
    const formSubject = document.getElementById('subject').value;
    const formMessage = document.getElementById('message').value;
    const formNewsletter = document.getElementById('newsletter').checked ? "Sim" : "Não";
    const formFeedback = document.getElementById('formFeedback');
    let formValidation = true;

    nameError.innerHTML = "";
    if (formName === "") {
        nameError.innerHTML = "O campo nome está vazio. Favor preencher.";
        formValidation = false;
    };

    emailError.innerHTML = "";
    if (formEmail === "") {
        emailError.innerHTML = "O campo e-mail está vazio. Favor preencher.";
        formValidation = false;
    };

    subjectError.innerHTML = "";
    if (formSubject === "") {
        subjectError.innerHTML = "O campo assunto está vazio. Favor selecionar uma opção.";
        formValidation = false;
    };

    messageError.innerHTML = "";
    if (formMessage === "") {
        messageError.innerHTML = "O campo mensagem está vazio. Favor preencher.";
        formValidation = false;
    };

    const templateParams = {
        title: formSubject,
        name: formName,
        phone: formPhone,
        email: formEmail,
        message: formMessage,
        newsletter: formNewsletter,
    };

    if (formValidation === true) {
        emailjs.send("service_q88agho", "template_spy72t7", templateParams)
        .then(() => {
            formFeedback.innerHTML = "Formulário enviado com sucesso!";
        })
        .catch(() => {
            formFeedback.innerHTML = "Algo deu errado. Formulário não enviado. Tente novamente.";
        });
    };
});