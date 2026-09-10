// Récupéarion des éléments HTML5
const elementsToAnimate = document.querySelectorAll(".fade-in-element");

/** ANIMATION FLUIDE AU DÉFILEMENT (SCROLL) */

// On configure le détecteur visuel
const observerOptions = {
  root: null, // Utilise la fenêtre du navigateur comme zone de détection
  rootMargin: "0px",
  threshold: 0.15, // L'animation se déclenche quand 15% de la carte est visible
};

// On crée le détecteur (Observer)
const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // Si l'élément entre dans l'écran
    if (entry.isIntersecting) {
      // On lui ajoute la classe qui le rend visible
      entry.target.classList.add("is-visible");
      // On arrête de le surveiller pour économiser de la batterie/performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// On lance la surveillance sur chaque carte de pain
elementsToAnimate.forEach((element) => {
  scrollObserver.observe(element);
});
