const texts = [
    "Tecnologia ",
    "Carbono ",
    "Energia ",
    "Inovação ",
    "Sustentabilidade ",
    "Banking "
];
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100; // Velocidade de digitação
const delayBetweenTexts = 2000; // Pausa entre as frases completas
const targetElement = document.getElementById('dynamic-text');

function type() {
    const currentText = texts[currentTextIndex];

    // Verifica se está apagando ou escrevendo
    if (isDeleting) {
        // Apaga o texto
        targetElement.innerHTML = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            // Quando todo o texto foi apagado, passa para o próximo
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(type, speed); // Começa a digitar o próximo texto
        } else {
            setTimeout(type, speed); // Continua apagando
        }
    } else {
        // Escreve o texto
        targetElement.innerHTML = currentText.substring(0, charIndex++);
        if (charIndex === currentText.length) {
            // Quando a frase foi escrita por completo, faz uma pausa e começa a apagar
            setTimeout(() => isDeleting = true, delayBetweenTexts);
            setTimeout(type, delayBetweenTexts); // Inicia o processo de apagar após a pausa
        } else {
            setTimeout(type, speed); // Continua escrevendo
        }
    }
}

// Inicia o efeito de escrita
type();
