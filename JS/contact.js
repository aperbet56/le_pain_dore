// Récupération des éléments HTML5
const contactForm = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const select = document.querySelector("#subject");
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

// Déclaration de la fonction submitForm qui va gérer la soumission du formulaire
const submitForm = () => {
  // Ecoute de l'événement "click" sur le bouton "Envoyer le message"
  submitBtn.addEventListener("click", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    if (
      regexName.test(firstName.value) === false ||
      regexName.test(lastName.value) === false ||
      regexEmail.test(email.value) === false ||
      select.value === "" ||
      textarea.value === ""
    ) {
      alert("Veuillez remplir correctement tous les champs");
    } else {
      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        select: select.value,
        textarea: textarea.value,
      };
      console.log(contact);
      // Création du bloc de message de succès de manière dynamique
      const successAlert = document.createElement("div");
      successAlert.className = "success-message";
      successAlert.textContent = `✨ Merci ${firstName.value} ! Votre message a bien été envoyé. Notre équipe vous répondra très vite.`;

      // Afiichage du message tout en haut du formulaire
      contactForm.insertBefore(successAlert, contactForm.firstChild);

      // Vide tous les champs du formulaire pour le laisser propre
      contactForm.reset();

      // Disparition du message automatiquement après 8 secondes
      setTimeout(() => {
        successAlert.style.opacity = "0";
        successAlert.style.transition = "opacity 0.5s ease-in-out";
        setTimeout(() => successAlert.remove(), 500);
      }, 8000);
    }
  });
};

// Appel de la fonction submitForm()
submitForm();
