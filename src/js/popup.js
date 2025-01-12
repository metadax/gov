document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href=""]');
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
  
    // Adiciona o evento de clique em links com href=""
    links.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault(); // Previne o comportamento padrão
        popup.classList.remove("hidden"); // Mostra o popup
      });
    });
  
    // Fecha o popup ao clicar no botão "Fechar"
    closePopup.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  
    // Fecha o popup ao clicar fora da área do popup
    popup.addEventListener("click", event => {
      if (event.target === popup) {
        popup.classList.add("hidden");
      }
    });
  });
  