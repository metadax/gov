$(document).ready(function () {

    // toggle mobile menu
    $('[data-toggle="toggle-nav"]').on('click', function () {
        $(this).closest('nav').find($(this).attr('data-target')).toggleClass('hidden');
        return false;
    });

    // feather icons
    feather.replace();

    // smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]');

    // tiny slider
    $('#slider-1').slick({
        infinite: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    $('#slider-2').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        customPaging: function (slider, i) {
            return '<div class="bg-white br-round w-1 h-1 opacity-50 mt-5" id=' + i + '> </div>'
        },
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }, ]
    });
});

// Botão de voltar ao topo
const backToTopButton = document.getElementById("back-to-top");

//Função que valida a rolagem da página
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // Se o usuário rolou a página
    backToTopButton.classList.remove('opacity-0');
    backToTopButton.classList.add('opacity-100');
  } else {
    // Se o usuário não rolou a página
    backToTopButton.classList.remove('opacity-100');
    backToTopButton.classList.add('opacity-0');
  }
};

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const texts = [
  "Transparência ",
  "Informação ",
  "Sustentabilidade ",
  "Compromisso ",
  "Futuro "
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
