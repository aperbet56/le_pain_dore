// Récupération des éléments HTML5
const contactForm = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const selct = document.querySelector("#subject");
const textarea = document.querySelector("#message");
const submitBtn = document.querySelector("form button");

// Regex
const regexName = /^[A-Z][A-Za-z\é\è\ê\ô\-]+$/;
const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

/**
 * Déclaration de la fonction lastNameValidation pour la validation du champ nom
 *  @param {String} lastNameame
 */
const lastNameValidation = (lastName) => {
  // Ecoute de l'événement "input" sur l'input lastName
  lastName.addEventListener("input", (e) => {
    e.preventDefault();
    if (regexName.test(lastName.value) === false) {
      document.querySelector("#lastNameErrorMsg").textContent =
        "Veuillez saisir un nom valide, ex : Dupont";
      return false;
    } else {
      document.querySelector("#lastNameErrorMsg").textContent = " ";
      return true;
    }
  });
};
// Appel de la fonction lastNameValidation
lastNameValidation(lastName);

/**
 * Fonction firstNameValidation pour la validation du champ prénom
 * @param {String} firstName
 */
const firstNameValidation = (firstName) => {
  // Ecoute de l'événement "input" sur l'input firstName
  firstName.addEventListener("input", (e) => {
    e.preventDefault();
    if (regexName.test(firstName.value) === false) {
      document.querySelector("#firstNameErrorMsg").textContent =
        "Veuillez saisir un prénom valide, ex : Pierre";
      return false;
    } else {
      document.querySelector("#firstNameErrorMsg").textContent = " ";
      return true;
    }
  });
};
// Appel de la fonction firstNameValidation
firstNameValidation(firstName);

/**
 * Déclaration de la fonction emailValidation pour la validation du champ nom
 *  @param {String} email
 */
const emailValidation = (email) => {
  // Ecoute de l'événement "input" sur l'input email
  email.addEventListener("input", (e) => {
    e.preventDefault();
    if (regexEmail.test(email.value) === false) {
      document.querySelector("#emailErrorMsg").textContent =
        "Veuillez saisir un email valide, ex : exemple@contact.com";
      return false;
    } else {
      document.querySelector("#emailErrorMsg").textContent = " ";
      return true;
    }
  });
};
// Appel de la fonction emailValidation
emailValidation(email);

/*
// On vérifie d'abord si le formulaire existe sur la page actuelle
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    // 1. On empêche le rechargement par défaut de la page
    event.preventDefault();

    // 2. On récupère le prénom de l'utilisateur pour personnaliser le message
    const nameInput = document.getElementById("name").value;
    const firstName = nameInput.split(" ")[0]; // Récupère juste le premier mot

    // 3. On crée le bloc de message de succès de manière dynamique
    const successAlert = document.createElement("div");
    successAlert.className = "success-message";
    successAlert.innerHTML = `✨ Merci ${firstName} ! Votre message a bien été envoyé. Notre équipe vous répondra très vite.`;

    // 4. On affiche le message tout en haut du formulaire
    contactForm.insertBefore(successAlert, contactForm.firstChild);

    // 5. On vide tous les champs du formulaire pour le laisser propre
    contactForm.reset();

    // 6. Optionnel : On fait disparaître le message automatiquement après 8 secondes
    setTimeout(() => {
      successAlert.style.opacity = "0";
      successAlert.style.transition = "opacity 0.5s ease";
      setTimeout(() => successAlert.remove(), 500);
    }, 8000);
  });
}
*/
