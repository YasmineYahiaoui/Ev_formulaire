// Validation et gestion du formulaire createAccount
if (
  document.querySelector("form") &&
  window.location.pathname.includes("createAnAccount.html")
) {
  const createAccountForm = document.querySelector("form"); // Sélectionne le formulaire

  // Préremplir les données uniquement si elles existent dans le localStorage
  const storedData =
    JSON.parse(localStorage.getItem("accountInformations")) || {};
  if (storedData.nom) document.getElementById("Nom").value = storedData.nom;
  if (storedData.prenom)
    document.getElementById("Prenom").value = storedData.prenom;
  if (storedData.prenom2)
    document.getElementById("Prenom2").value = storedData.prenom2;

  // Validation et gestion du bouton "Suivant"
  createAccountForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupération des valeurs des champs
    const nom = document.getElementById("Nom").value.trim();
    const prenom = document.getElementById("Prenom").value.trim();
    const prenom2 = document.getElementById("Prenom2").value.trim();

    // Efface les messages d'erreur précédents
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    let isValid = true;

    // Validation des champs
    if (!nom) {
      document.getElementById("nomError").textContent = 'Le champ "Nom" est requis.';
      isValid = false;
    }
    if (!prenom) {
      document.getElementById("prenomError").textContent = 'Le champ "Prénom" est requis.';
      isValid = false;
    }
    if (!prenom2) {
      document.getElementById("prenom2Error").textContent = 'Le deuxième champ "Prénom" est requis.';
      isValid = false;
    }

    if (isValid) {
      // Stocker uniquement les données partiellement renseignées
      localStorage.setItem(
        "accountInformations",
        JSON.stringify({ nom, prenom, prenom2 })
      );
      // Redirection vers le formulaire suivant
      window.location.href = "continueWidh.html";
    }
  });
}

// Validation et gestion du formulaire continueCreateAccount
if (window.location.pathname.includes("continueWidh.html")) {
  const continueAccountForm = document.querySelector("form"); // Sélectionne le formulaire

  // Validation et gestion du bouton "Confirmer"
  continueAccountForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupération des valeurs des champs
    const motDePasse = document.getElementById("Mot-de-passe").value.trim();
    const confirmerMotDePasse = document
      .getElementById("confirmer-Mot-de-passe")
      .value.trim();

    // Efface les messages d'erreur précédents
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    let isValid = true;

    // Validation des champs
    if (!motDePasse) {
      document.getElementById("motDePasseError").textContent =
        'Le champ "Mot de passe" est requis.';
      isValid = false;
    }
    if (!confirmerMotDePasse) {
      document.getElementById("confirmerMotDePasseError").textContent =
        'Le champ "Confirmer le mot de passe" est requis.';
      isValid = false;
    }
    if (motDePasse !== confirmerMotDePasse) {
      document.getElementById("confirmerMotDePasseError").textContent =
        "Les mots de passe ne correspondent pas.";
      isValid = false;
    }

    if (isValid) {
      // Récupérer les données existantes
      const storedData =
        JSON.parse(localStorage.getItem("accountInformations")) || {};

      // Ajouter les mots de passe
      storedData.motDePasse = motDePasse;

      // Stocker les données complètes
      localStorage.setItem("accountInformations", JSON.stringify(storedData));

      // Afficher l'objet JSON dans la console
      console.log("accountInformations:", storedData);

      // Affiche un message ou effectue une autre action après confirmation
      alert("Formulaire confirmé avec succès.");
    }
  });

  // Gestion du bouton "Retour"
  const btnRetour = document.getElementById("btnRetour");
  if (btnRetour) {
    btnRetour.addEventListener("click", function () {
      // Retourner à la page précédente (createAnAccount.html)
      window.location.href = "createAnAccount.html";
    });
  }
}

// Fonction pour afficher ou masquer le mot de passe
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId); // Sélectionne le champ mot de passe
  const icon = document.getElementById(iconId); // Sélectionne l'icône associée

  if (input.type === "password") {
    input.type = "text"; // Change le type à "text" pour afficher le mot de passe
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash"); // Change l'icône pour "masquer"
  } else {
    input.type = "password"; // Change le type à "password" pour masquer le mot de passe
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye"); // Change l'icône pour "afficher"
  }
}
