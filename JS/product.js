// ---- LOGIQUE DU PANIER VIRTUEL ----
/*
// Éléments du DOM
const cartToggleBtn = document.getElementById("cartToggleBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartBadge = document.getElementById("cartBadge");
const cartDrawerItems = document.getElementById("cartDrawerItems");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

// Tableau pour stocker les articles du panier
let cart = [];

// Gestion de l'ouverture / la fermeture du panier
if (cartToggleBtn && cartDrawer && cartOverlay) {
  cartToggleBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("visible");
  });

  const closeCart = () => {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("visible");
  };

  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
}

// Écoute des clics sur les boutons "Réserver" des fiches produits
// Ciblage tous les articles de pain et écoute le clic sur leur bouton principal
const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
  const reserveBtn = card.querySelector(".product-footer button");
  const productName = card.querySelector(".product-meta h3").textContent;
  // On extrait le prix numérique (ex: "5,20 €" devient 5.2)
  const productPriceText = card.querySelector(".product-price").textContent;
  const productPrice = parseFloat(
    productPriceText.replace(",", ".").replace("€", "").trim()
  );

  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      addToCart(productName, productPrice);
      // Ouvre automatiquement le panier à l'ajout pour confirmer l'action visuellement
      cartDrawer.classList.add("open");
      cartOverlay.classList.add("visible");
    });
  }
});

// 3. Ajouter un pain au panier
function addToCart(name, price) {
  // Regarde si le pain est déjà présent dans le panier
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }
  updateCartUI();
}

// 4. Modifier la quantité (Plus / Moins)
window.changeQuantity = function (name, amount) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += amount;
    // Si la quantité tombe à 0, on retire le produit du panier
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.name !== name);
    }
  }
  updateCartUI();
};

// 5. Mettre à jour l'affichage visuel du panier
function updateCartUI() {
  // A. Mise à jour du badge compteur
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;

  // B. Rendu de la liste de produits
  if (cart.length === 0) {
    cartDrawerItems.innerHTML = `<p class="empty-cart-text">Votre panier est vide pour le moment. Laissez-vous tenter par une bonne miche !</p>`;
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    cartDrawerItems.innerHTML = ""; // On vide le texte de panier vide

    cart.forEach((item) => {
      const itemRow = document.createElement("div");
      itemRow.className = "cart-item";
      itemRow.innerHTML = `
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${(item.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")} €</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="changeQuantity('${
                          item.name
                        }', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity('${
                          item.name
                        }', 1)">+</button>
                    </div>
                `;
      cartDrawerItems.appendChild(itemRow);
    });
  }

  // C. Mise à jour du prix total cumulé
  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  cartTotalPrice.textContent = `${totalCost.toFixed(2).replace(".", ",")} €`;
}

// 6. Clic sur le bouton de confirmation final
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert(
      "🍞 Félicitations ! Votre demande de réservation a été enregistrée en boulangerie. Présentez votre nom lors de votre passage pour retirer vos pains chauds."
    );
    cart = []; // Vide le panier après validation
    updateCartUI();
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("visible");
  });
}
*/

const initVirtualCart = () => {
  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartBadge = document.getElementById("cartBadge");
  const cartDrawerItems = document.getElementById("cartDrawerItems");
  const cartTotalPrice = document.getElementById("cartTotalPrice");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Sécurité : On stoppe si les éléments du panier n'existent pas sur cette page
  if (!cartDrawer || !cartDrawerItems) return;

  // Récupération des données sauvegardées dans le navigateur
  let cart = JSON.parse(localStorage.getItem("boulangerie_cart")) || [];

  // --- Fonctions d'affichage ---
  const openCart = () => {
    cartDrawer.classList.add("open");
    // ?. => Le chaînage optionnel : C'est une sécurité. Elle dit au navigateur : "Vérifie si cartOverlay existe bien dans la page. S'il n'existe pas, ne fais rien et ne bloque pas tout le site avec une erreur."
    cartOverlay?.classList.add("visible");
  };

  const closeCart = () => {
    cartDrawer.classList.remove("open");
    cartOverlay?.classList.remove("visible");
  };

  // --- Logique métier ---
  const saveCart = () => {
    localStorage.setItem("boulangerie_cart", JSON.stringify(cart));
    updateCartUI();
  };

  const addToCart = (name, price) => {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    openCart(); // Retours d'expérience UX : ouvre le panier à l'ajout
  };

  const changeQuantity = (name, amount) => {
    const item = cart.find((item) => item.name === name);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.name !== name);
    }
    saveCart();
  };

  // --- Rendu visuel (UI) ---
  const updateCartUI = () => {
    // Badge du panier
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalItems;

    // Contenu du panier
    if (cart.length === 0) {
      cartDrawerItems.innerHTML = `<p class="empty-cart-text">Votre panier est vide pour le moment. Laissez-vous tenter par une bonne miche !</p>`;
      if (checkoutBtn) checkoutBtn.disabled = true;
      if (cartTotalPrice) cartTotalPrice.textContent = "0,00 €";
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    cartDrawerItems.innerHTML = "";

    // Génération dynamique sécurisée
    cart.forEach((item) => {
      const itemRow = document.createElement("div");
      itemRow.className = "cart-item";

      // Contenu textuel
      const details = document.createElement("div");
      details.className = "cart-item-details";
      details.innerHTML = `<h4></h4><p></p>`;
      details.querySelector("h4").textContent = item.name;
      details.querySelector("p").textContent = `${(item.price * item.quantity)
        .toFixed(2)
        .replace(".", ",")} €`;

      // Boutons de contrôle de quantité (Fin de l'attribut "onclick" insécurisé)
      const controls = document.createElement("div");
      controls.className = "cart-item-quantity";

      const btnMinus = document.createElement("button");
      btnMinus.className = "qty-btn";
      btnMinus.textContent = "-";
      btnMinus.addEventListener("click", () => changeQuantity(item.name, -1));

      const qtySpan = document.createElement("span");
      qtySpan.textContent = item.quantity;

      const btnPlus = document.createElement("button");
      btnPlus.className = "qty-btn";
      btnPlus.textContent = "+";
      btnPlus.addEventListener("click", () => changeQuantity(item.name, 1));

      controls.append(btnMinus, qtySpan, btnPlus);
      itemRow.append(details, controls);
      cartDrawerItems.appendChild(itemRow);
    });

    // Calcul du prix total
    const totalCost = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (cartTotalPrice)
      cartTotalPrice.textContent = `${totalCost
        .toFixed(2)
        .replace(".", ",")} €`;
  };

  // --- Écouteurs d'Événements du Panier ---
  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Détection des clics sur les fiches produits "Nos Pains"
  document.querySelectorAll(".product-card").forEach((card) => {
    const reserveBtn = card.querySelector(".product-footer button");
    const productName = card.querySelector(".product-meta h3")?.textContent;
    const priceText = card.querySelector(".product-price")?.textContent || "0";
    const productPrice = parseFloat(
      priceText.replace(",", ".").replace("€", "").trim()
    );

    if (reserveBtn && productName) {
      reserveBtn.addEventListener("click", () =>
        addToCart(productName, productPrice)
      );
    }
  });

  // Validation de la commande simulation
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(
        "🍞 Félicitations ! Votre demande de réservation a été enregistrée en boulangerie. Présentez votre nom lors de votre passage pour retirer vos pains chauds."
      );
      cart = [];
      saveCart();
      closeCart();
    });
  }

  // Chargement initial au démarrage
  updateCartUI();
};

initVirtualCart();
