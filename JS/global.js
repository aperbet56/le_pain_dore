// Récupération des éléments HTML
const year = document.querySelector(".year");
const burgerMenu = document.querySelector("#burgerMenu");
const navLinks = document.querySelector("#navLinks");
const menuLinks = navLinks.querySelectorAll("a");
const body = document.body;

// Ecoute de l'événement chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Ecoute de l'événement click sur le menu burger
  burgerMenu.addEventListener("click", () => {
    // Alterne la classe "open" pour afficher/masquer le menu mobile
    navLinks.classList.toggle("open");

    // Alterne une classe d'animation visuelle sur le bouton burger
    burgerMenu.classList.toggle("active");

    // Empêche le défilement de la page en arrière-plan quand le menu est ouvert
    body.classList.toggle("no-scroll");
  });

  // Fermeture automatique du menu lors d'un clic sur un lien
  menuLinks.forEach((link) => {
    // Ecoute de l'événement click sur le lien
    link.addEventListener("click", () => {
      // On retire toutes les classes actives si elles existent
      navLinks.classList.remove("open");
      burgerMenu.classList.remove("active");
      body.classList.remove("no-scroll");
    });
  });
});

// Récupération de la date actuelle
const date = new Date();
const currentYear = date.getFullYear();

// Affichage dynamique de l'année en cours
year.textContent = `${currentYear}`;
