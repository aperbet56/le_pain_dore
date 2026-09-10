// Récupération des éléments HTML
const year = document.querySelector(".year");

// Récupération de la date actuelle
const date = new Date();
const currentYear = date.getFullYear();

// Affichage dynamique de l'année en cours
year.textContent = `${currentYear}`;
