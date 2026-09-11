// Récupéarion des éléments HTML5
const elementsToAnimate = document.querySelectorAll(".fade-in-element");

/** ANIMATION FLUIDE AU DÉFILEMENT (SCROLL) */

// Création de l'objet options qui va définir les options de mon intersectionObserver
const options = {
  root: null,
  rootMargin: "0px", // marges sur les 4 côtés de la zone d'affichage
  threshold: 0.15,
};

// Déclaration de la fonction handleIntersect ayant comme paramètres entries et observer
const handleIntersect = (entries, observer) => {
  // Pour chaque entrée
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      // La méthode unobserve() de l'interface IntersectionObserver indique à l'objet IntersectionObserver courant de cesser d'observer l'élément cible spécifié.
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
};

// Création d'un nouvel observateur en appelant le constructeur IntersectionObserver() en précisant une fonction callback à appeler quand l'intersection franchit l'un de des paliers, handleIntersect(), et mon ensemble d'options.
const observer = new IntersectionObserver(handleIntersect, options);

// // Surveiller l'évolution de la visibilité de l'intersection de plusieurs éléments par rapport au viewport en appelant observer.observe() pour chacun de ces éléments.
elementsToAnimate.forEach((element) => observer.observe(element));
