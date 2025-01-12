import { Analytics } from "@vercel/analytics/react"
document.addEventListener("DOMContentLoaded", function () {
  i18next.init(
    {
      lng: "pt-BR",
      resources: {
        "pt-BR": {
          translation: {
            // Adicione as traduções aqui
          },
        },
        en: {
          translation: {
            // Adicione as traduções em inglês aqui
          },
        },
        fr: {
          translation: {
            // Adicione as traduções em francês aqui
          },
        },
        es: {
          translation: {
            // Adicione as traduções em espanhol aqui
          },
        },
      },
    },
    function (err, t) {
      updateContent();
    }
  );

  function updateContent() {
    // Atualize o conteúdo traduzido aqui
  }

  // Detectar o idioma do navegador e atualizar o conteúdo
  const userLang = navigator.language || navigator.userLanguage;
  i18next.changeLanguage(userLang.split("-")[0]);

  // Carregamento progressivo
  const sections = document.querySelectorAll("section");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    section.classList.add("section-fade-in");
    observer.observe(section);
  });
});
// // Popup de privacidade
// const privacyPopup = document.getElementById("privacy-popup");
// const privacyAccept = document.getElementById("privacy-accept");
// const privacyDeny = document.getElementById("privacy-deny");
// const privacyMoreInfo = document.getElementById("privacy-more-info");

// function showPrivacyPopup() {
//   if (!localStorage.getItem("privacyChoice")) {
//     privacyPopup.classList.remove("hidden");
//   }
// }

// function hidePrivacyPopup() {
//   privacyPopup.classList.add("hiding");
//   setTimeout(() => {
//     privacyPopup.classList.add("hidden");
//     privacyPopup.classList.remove("hiding");
//   }, 300);
// }

// privacyAccept.addEventListener("click", () => {
//   localStorage.setItem("privacyChoice", "accepted");
//   hidePrivacyPopup();
// });

// privacyDeny.addEventListener("click", () => {
//   localStorage.setItem("privacyChoice", "denied");
//   hidePrivacyPopup();
// });

// privacyMoreInfo.addEventListener("click", () => {
//   // Adicione aqui a lógica para mostrar mais informações sobre a política de privacidade
//   console.log("Mostrar mais informações sobre a política de privacidade");
// });

// showPrivacyPopup();

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

// Menu toggle para dispositivos móveis
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
  updateMenuVisibility();
});

const menuLinks = menu.querySelectorAll("a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 900) {
      menu.classList.remove("show");
      updateMenuVisibility();
    }
  });
});

function updateMenuVisibility() {
  if (window.innerWidth >= 900) {
    menu.style.display = "flex";
  } else {
    menu.style.display = menu.classList.contains("show") ? "block" : "none";
  }
}

window.addEventListener("resize", updateMenuVisibility);
window.addEventListener("load", updateMenuVisibility);

// Função para carregar os posts do blog
async function loadBlogPosts() {
  try {
    const response = await fetch("blog-posts.json");
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error("Erro ao carregar os posts do blog:", error);
    return [];
  }
}

// Função para exibir os posts na página inicial
async function displayRecentPosts() {
  const recentPostsContainer = document.getElementById("recent-posts");
  if (!recentPostsContainer) return;

  const posts = await loadBlogPosts();
  const recentPosts = posts.slice(0, 3);

  recentPosts.forEach((post) => {
    const postElement = createPostElement(post);
    recentPostsContainer.appendChild(postElement);
  });
}

// Função para exibir todos os posts na página do blog
async function displayAllPosts() {
  const allPostsContainer = document.getElementById("all-posts");
  if (!allPostsContainer) return;

  const posts = await loadBlogPosts();

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    allPostsContainer.appendChild(postElement);
  });
}

// Função para criar um elemento de post
function createPostElement(post) {
    const article = document.createElement("article");
    article.className = "bg-gray-100 p-4 rounded-lg";
  
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover object-center mb-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
        <p class="mb-2 text-gray-600">${post.excerpt}</p>
        <a href="post-template.html?id=${post.id}" class="text-blue-600 hover:underline">Leia mais</a>
      `;
  
    return article;
  }
  

// Função para exibir um post individual
async function displaySinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) return;

  const posts = await loadBlogPosts();
  const post = posts.find((p) => p.id === parseInt(postId));

  if (!post) return;

  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-date").textContent = new Date(
    post.date
  ).toLocaleDateString();
  document.getElementById("post-image").src = post.image;
  document.getElementById("post-image").alt = post.title;
  document.getElementById("post-content").innerHTML = post.content;
}

// Chamar as funções apropriadas dependendo da página
if (document.getElementById("recent-posts")) {
  displayRecentPosts();
} else if (document.getElementById("all-posts")) {
  displayAllPosts();
} else if (document.getElementById("post-title")) {
  displaySinglePost();
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("post-title")) {
        displaySinglePost();
    }
});