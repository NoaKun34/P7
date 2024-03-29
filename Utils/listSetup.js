import { addSelectedFilterItem, rechercherRecettes } from "./Events.js";
//import rechercherRecettes from "./Events.js";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* INGREDIENT DROPDOWN */
const dropdownListIngredients = document.getElementById(
  "dropdownListIngredients"
);

function getUniqueIngredients(recipes) {
  let ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      let normalizedIngredient = capitalizeFirstLetter(
        ingredient.ingredient.trim()
      );
      ingredientsSet.add(normalizedIngredient);
    });
  });
  return Array.from(ingredientsSet);
}

function addItemsToDropdownList(dropdownElement, items, itemType) {
  // Effacez d'abord le contenu actuel
  dropdownElement.innerHTML = "";

  // Parcourez chaque élément de la liste 'items'
  items.forEach((item) => {
    // Créez un nouvel élément 'li'
    const li = document.createElement("li");
    li.textContent = item; // Définissez le texte de l'élément
    li.className = "dropdownListItem"; // Ajoutez des classes si nécessaire
    li.id = "dropdownElement-" + item.toLowerCase().replace(/ /g, ""); // Définissez l'ID
    // Ajoutez un écouteur d'événements à l'élément 'li'
    li.addEventListener("click", function (event) {
      // Gérez l'événement de clic ici
      console.log("Clic sur l'élément", item);
      console.log("Type d'élément", itemType);
      addSelectedFilterItem(item, itemType, li.id);

      // Ajoutez la classe 'clicked-item' à l'élément cliqué
      event.target.classList.add('clicked-item');
    });

    // Ajoutez l'élément 'li' au DOM, sous l'élément 'dropdownElement'
    dropdownElement.appendChild(li);
  });
}

/* APPAREIL DROPDOWN */
const dropdownListAppliances = document.getElementById(
  "dropdownListAppliances"
);

function getUniqueAppliances(recipes) {
  let appliancesSet = new Set();
  recipes.forEach((recipe) => {
    let normalizedAppliance = capitalizeFirstLetter(
      recipe.appliance.toLowerCase().trim()
    );
    appliancesSet.add(normalizedAppliance);
  });
  return Array.from(appliancesSet);
}

/* USTENSILS DROPDOWN */
const dropdownListUstensils = document.getElementById("dropdownListUstensils");

function getUniqueUtensils(recipes) {
  let utensilsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
      let normalizedUtensil = capitalizeFirstLetter(
        utensil.toLowerCase().trim()
      );
      utensilsSet.add(normalizedUtensil);
    });
  });
  return Array.from(utensilsSet);
}

/* INGREDIENTS DROPDOWN */
const dropdownIngredientDIV = document.getElementById("dropdownIngredientDIV");
const dropdownIngredient = document.getElementById("dropdownIngredient");
const dropdownIngredientContent = document.getElementById(
  "dropdownIngredientContent"
);
const dropdownIngredientInput = document.getElementById(
  "dropdownIngredientInput"
);
const dropdownIngredientClose = document.getElementById(
  "dropdownIngredientClose"
);
const dropdownItems = document.getElementsByClassName("dropdownListItem");

let actualIngredient = [];

dropdownIngredientInput.addEventListener("input", function () {
  let inputValue = this.value.toLowerCase();
  if (inputValue.length > 0) {
    dropdownIngredientClose.classList.add("show");
    dropdownIngredientClose.classList.remove("hide");

    let matchingIngredients = actualIngredient.filter(ingredient => ingredient.toLowerCase().includes(inputValue));
    console.log(matchingIngredients);
    addItemsToDropdownList(dropdownListIngredients, matchingIngredients, "ingredient");

  } else if (inputValue.length === 0) {
    dropdownIngredientClose.classList.remove("show");
    dropdownIngredientClose.classList.add("hide");
    addItemsToDropdownList(dropdownListIngredients, actualIngredient, "ingredient");
  }
});

dropdownIngredientClose.addEventListener("click", function () {
  dropdownIngredientInput.value = "";
  dropdownIngredientClose.classList.remove("show");
  dropdownIngredientClose.classList.add("hide");
  addItemsToDropdownList(dropdownListIngredients, actualIngredient, "ingredient");
});

dropdownIngredient.addEventListener("click", function () {
  if (dropdownIngredientContent.classList.contains("hide")) {
    dropdownIngredientContent.classList.remove("hide");
    dropdownIngredientContent.classList.add("show");
    dropdownIngredientDIV.classList.add("filterDropdownOpen");
  } else {
    dropdownIngredientContent.classList.remove("show");
    dropdownIngredientContent.classList.add("hide");
    dropdownIngredientDIV.classList.remove("filterDropdownOpen");
  }
});

/* APPAREILS DROPDOWN */
const dropdownAppareilDIV = document.getElementById("dropdownAppareilDIV");
const dropdownAppareil = document.getElementById("dropdownAppareil");
const dropdownAppareilContent = document.getElementById(
  "dropdownAppareilContent"
);
const dropdownAppareilInput = document.getElementById("dropdownAppareilInput");
const dropdownAppareilClose = document.getElementById("dropdownAppareilClose");

let actualAppliance = []; // Votre tableau d'appareils

dropdownAppareilInput.addEventListener("input", function () {
  let inputValue = this.value.toLowerCase();
  if (inputValue.length > 0) {
    dropdownAppareilClose.classList.add("show");
    dropdownAppareilClose.classList.remove("hide");

    let matchingAppliances = actualAppliance.filter(appliance => appliance.toLowerCase().includes(inputValue));
    console.log(matchingAppliances); // Affiche les appareils correspondants dans la console
    addItemsToDropdownList(dropdownListAppliances, matchingAppliances, "appliance");

  } else if (inputValue.length === 0) {
    dropdownAppareilClose.classList.remove("show");
    dropdownAppareilClose.classList.add("hide");
    addItemsToDropdownList(dropdownListAppliances, actualAppliance, "appliance");
  }
});

dropdownAppareilClose.addEventListener("click", function () {
  dropdownAppareilInput.value = "";
  dropdownAppareilClose.classList.remove("show");
  dropdownAppareilClose.classList.add("hide");
  addItemsToDropdownList(dropdownListAppliances, actualAppliance, "appliance");
});

dropdownAppareil.addEventListener("click", function () {
  if (dropdownAppareilContent.classList.contains("hide")) {
    dropdownAppareilContent.classList.remove("hide");
    dropdownAppareilContent.classList.add("show");
    dropdownAppareilDIV.classList.add("filterDropdownOpen");
  } else {
    dropdownAppareilContent.classList.remove("show");
    dropdownAppareilContent.classList.add("hide");
    dropdownAppareilDIV.classList.remove("filterDropdownOpen");
  }
});

/* USTENSILS DROPDOWN */
const dropdownUstensilsDIV = document.getElementById("dropdownUstensilsDIV");
const dropdownUstensils = document.getElementById("dropdownUstensils");
const dropdownUstensilsContent = document.getElementById(
  "dropdownUstensilsContent"
);
const dropdownUstensilsInput = document.getElementById(
  "dropdownUstensilsInput"
);
const dropdownUstensilsClose = document.getElementById(
  "dropdownUstensilsClose"
);

let actualUtensil = []; // Votre tableau d'ustensiles

dropdownUstensilsInput.addEventListener("input", function () {
  let inputValue = this.value.toLowerCase();
  if (inputValue.length > 0) {
    dropdownUstensilsClose.classList.add("show");
    dropdownUstensilsClose.classList.remove("hide");

    let matchingUtensils = actualUtensil.filter(utensil => utensil.toLowerCase().includes(inputValue));
    console.log(matchingUtensils); // Affiche les ustensiles correspondants dans la console
    addItemsToDropdownList(dropdownListUstensils, matchingUtensils, "utensil");

  } else if (inputValue.length === 0) {
    dropdownUstensilsClose.classList.remove("show");
    dropdownUstensilsClose.classList.add("hide");
    addItemsToDropdownList(dropdownListUstensils, actualUtensil, "utensil");
  }
});

dropdownUstensilsClose.addEventListener("click", function () {
  dropdownUstensilsInput.value = "";
  dropdownUstensilsClose.classList.remove("show");
  dropdownUstensilsClose.classList.add("hide");
  addItemsToDropdownList(dropdownListUstensils, actualUtensil, "utensil");
});

dropdownUstensils.addEventListener("click", function () {
  if (dropdownUstensilsContent.classList.contains("hide")) {
    dropdownUstensilsContent.classList.remove("hide");
    dropdownUstensilsContent.classList.add("show");
    dropdownUstensilsDIV.classList.add("filterDropdownOpen");
  } else {
    dropdownUstensilsContent.classList.remove("show");
    dropdownUstensilsContent.classList.add("hide");
    dropdownUstensilsDIV.classList.remove("filterDropdownOpen");
  }
});

export default function listSetup(data) {
  const ingredients = getUniqueIngredients(data);
  actualIngredient = ingredients;
  console.log("ingredient = " + ingredients);
  addItemsToDropdownList(dropdownListIngredients, ingredients, "ingredient");

  const appliances = getUniqueAppliances(data);
  actualAppliance = appliances;
  console.log("appliance = " + appliances);
  addItemsToDropdownList(dropdownListAppliances, appliances, "appliance");

  const utensils = getUniqueUtensils(data);
  actualUtensil = utensils;
  addItemsToDropdownList(dropdownListUstensils, utensils, "utensil");
}
