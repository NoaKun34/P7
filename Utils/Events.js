import { recipes } from "../Data/recipes.js";
import createSelectedFilterElement from "./FactoryFilter.js";
import displayRecipes from "./../script.js";
import addItemsToDropdownList from './listSetup.js'

let selectedFilterItems = [];
let actualRecipes = recipes;

/* SEARCHBAR */

const searchInput = document.getElementById("searchInput");
const searchBtnClose = document.getElementById("searchBtnClose");
const recipesContainer = document.getElementById("recipesContainer");
const searchBtnSearch = document.getElementById("searchBtnSearch");
const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = [searchInput.value];
  const searchedRecipes = rechercherRecettes(query);

  /*const searchedCardFactory = new RecipeCardFactory();
    const cardsHTMLAfterSearch = searchedRecipes.map(recipe => searchedCardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTMLAfterSearch; */

  displayRecipes(searchedRecipes);
});

let previousValue = null;

searchInput.addEventListener("input", function () {
  if (this.value.length > 0) {
    searchBtnClose.classList.add("show");
    searchBtnClose.classList.remove("hide");
    console.log("selectedFilterItems dans input " + selectedFilterItems);

    if (this.value.length >= 3) {
      // Remove previous value from selectedFilterItems
      if (previousValue) {
        const index = selectedFilterItems.indexOf(previousValue);
        if (index > -1) {
          selectedFilterItems.splice(index, 1);
        }
      }

      // Add new value to selectedFilterItems
      selectedFilterItems.push(this.value);
      const searchedRecipes = rechercherRecettes(
        selectedFilterItems,
        actualRecipes
      );
      actualRecipes = searchedRecipes;
      console.log("selectedFilterItems dans input +3 " + selectedFilterItems);

      displayRecipes(actualRecipes);
      console.log("actualRecipes dans input" + actualRecipes);

      // Update previous value
      previousValue = this.value;
    }
  } else if (this.value.length === 0) {
    searchBtnClose.classList.remove("show");
    searchBtnClose.classList.add("hide");
    console.log("selectedFilterItems dans input " + selectedFilterItems);
    console.log(
      "selectedFilterItems length dans input " + selectedFilterItems.length
    );
    selectedFilterItems = [];

    if (
      selectedFilterItems.length === 0 &&
      ingredientFiltersItems === 0 &&
      applianceFiltersItems === 0 &&
      ustensilFiltersItems === 0
    ) {
      displayRecipes(recipes);
    } else {
      //const searchedRecipes = rechercherRecettes(
      //  selectedFilterItems,
      //  actualRecipes
      //);
      //actualRecipes = searchedRecipes;
      //displayRecipes(actualRecipes);
      let result = recipes;

      if (ingredientFiltersItems.length) {
        result = ingredientFilter(ingredientFiltersItems, result);
      }
      if (applianceFiltersItems.length) {
        result = applianceFilter(applianceFiltersItems, result);
      }
      if (ustensilFiltersItems.length) {
        result = utensilFilter(ustensilFiltersItems, result);
      }

      actualRecipes = [...new Set(result)];
      displayRecipes(actualRecipes);
    }
  }
});

searchBtnClose.addEventListener("click", function () {
  removeSelectedFilterItem(searchInput.value);
  searchInput.value = "";
  searchBtnClose.classList.remove("show");
  searchBtnClose.classList.add("hide");

  /*const cardFactory = new RecipeCardFactory();
    const cardsHTML = recipes.map(recipe => cardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTML;*/
  displayRecipes(actualRecipes);
});

/*
export function rechercherRecettes(query) {
    return recipes.filter(recette => {
        const queryLower = query.toLowerCase();

        // Vérifier dans le nom de la recette
        const dansNom = recette.name.toLowerCase().includes(queryLower);

        // Vérifier dans la description de la recette
        const dansDescription = recette.description.toLowerCase().includes(queryLower);

        // Vérifier dans les ingrédients de la recette
        const dansIngredients = recette.ingredients.some(ingredient => {
            return ingredient.ingredient.toLowerCase().includes(queryLower);
        });

        return dansNom || dansIngredients || dansDescription;
    });
}*/

export function rechercherRecettes(filtres, recipes) {
  return recipes.filter((recette) => {
    // Convertir chaque filtre en minuscules pour la comparaison
    const filtresLower = filtres.map((filtre) => filtre.toLowerCase());

    // Vérifier dans le nom de la recette
    const dansNom = filtresLower.some((filtre) =>
      recette.name.toLowerCase().includes(filtre)
    );

    // Vérifier dans la description de la recette
    const dansDescription = filtresLower.some((filtre) =>
      recette.description.toLowerCase().includes(filtre)
    );

    // Vérifier dans les ingrédients de la recette
    const dansIngredients = filtresLower.some((filtre) => {
      return recette.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(filtre)
      );
    });

    return dansNom || dansDescription || dansIngredients;
  });
}

searchBtnSearch.addEventListener("click", () => {
  const query = [searchInput.value];
  const searchedRecipes = rechercherRecettes(query, actualRecipes);

  /*const searchedCardFactory = new RecipeCardFactory();
    const cardsHTMLAfterSearch = searchedRecipes.map(recipe => searchedCardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTMLAfterSearch;*/
  displayRecipes(searchedRecipes);
});

/* --------------------------------------------------------------------- */

/* SELECTED FILTER ITEM */

const selectedFilterContainer = document.getElementById(
  "selectedFilterContainer"
);

let ingredientFiltersItems = [];
let applianceFiltersItems = [];
let ustensilFiltersItems = [];

let clickedItem = [];

export function addSelectedFilterItem(itemFilter, type, itemID) {
  if (searchInput.value.length > 0) {
    if (!selectedFilterItems.includes(searchInput.value)) {
      selectedFilterItems.push(searchInput.value);
    }
  }
  //selectedFilterItems.push(itemFilter);

  const filterLowerCase = itemFilter.toLowerCase().replace(/ /g, ""); // Convertit le filtre en minuscules et supprime les espaces
  const selectedFilterElement = createSelectedFilterElement(
    filterLowerCase,
    itemFilter,
    "Assets/closeIconBlack.png"
  );
  selectedFilterContainer.appendChild(selectedFilterElement);
  //const searchedRecipes = rechercherRecettes(selectedFilterItems, actualRecipes);
  //const searchedRecipes = searchFilter(selectedFilterItems, type, actualRecipes);
  const searchedRecipes = searchFilter(itemFilter, type, actualRecipes);
  actualRecipes = [...new Set(searchedRecipes)];
  displayRecipes(actualRecipes);
  //CHANGER LA COULEUR DE FILTRE ICI
  clickedItem.push(itemID);
  if (clickedItem.length > 0) {
    clickedItem.map((item) => {
      const dropdownElement = document.getElementById(item);
      dropdownElement.classList.add("clicked-item");
      console.log("clickedItem dans addSelectedFilterItem = ", item);
    });
  }
}

//export function removeSelectedFilterItem(itemFilter, type) {
//  const index = selectedFilterItems.indexOf(itemFilter);
//  if (index > -1) {
//    selectedFilterItems.splice(index, 1);
//  }
//
//  if (selectedFilterItems.length === 0) {
//    displayRecipes(recipes);
//  } else {
//    const searchedRecipes = rechercherRecettes(selectedFilterItems, recipes);
//    actualRecipes = searchedRecipes; // Update actualRecipes with the search results
//    displayRecipes(searchedRecipes);
//  }
//}

//export function removeSelectedFilterItem(itemFilter) {
//  console.log("ingredientItemsFilters dans removeSelectedFilterItem avant = ", ingredientFiltersItems);
//  console.log("applianceItemsFilters dans removeSelectedFilterItem avant = ", applianceFiltersItems);
//  console.log("ustensilItemsFilters dans removeSelectedFilterItem avant = ", ustensilFiltersItems);
//  [ingredientFiltersItems, applianceFiltersItems, ustensilFiltersItems].forEach(
//    (array) => {
//      let index = array.indexOf(itemFilter);
//      if (index !== -1) {
//        array.splice(index, 1);
//      }
//    }
//  );
//  console.log("ingredientItemsFilters dans removeSelectedFilterItem après = ", ingredientFiltersItems);
//  console.log("applianceItemsFilters dans removeSelectedFilterItem après = ", applianceFiltersItems);
//  console.log("ustensilItemsFilters dans removeSelectedFilterItem après = ", ustensilFiltersItems);
//
//  if (!ingredientFiltersItems.length && !applianceFiltersItems.length && !ustensilFiltersItems.length) {
//    displayRecipes(recipes);
//    console.log("test")
//  } else {
//    const searchedIngredient = ingredientFilter(ingredientFiltersItems, recipes);
//    const searchedAppliance = applianceFilter(applianceFiltersItems, recipes);
//    const searchedUtensil = utensilFilter(ustensilFiltersItems, recipes);
//    const result = searchedIngredient.concat(searchedAppliance, searchedUtensil);
//    console.log("result dans removeSelectedFilterItem = ", result.length);
//    actualRecipes = [...new Set(result)];
//    displayRecipes(actualRecipes);
//  }
//}

export function removeSelectedFilterItem(itemFilter) {
  [ingredientFiltersItems, applianceFiltersItems, ustensilFiltersItems].forEach(
    (array) => {
      let index = array.indexOf(itemFilter);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  );

  let result = recipes;

  if (ingredientFiltersItems.length) {
    result = ingredientFilter(ingredientFiltersItems, result);
  }
  if (applianceFiltersItems.length) {
    result = applianceFilter(applianceFiltersItems, result);
  }
  if (ustensilFiltersItems.length) {
    result = utensilFilter(ustensilFiltersItems, result);
  }
  if (searchInput.value.length) {
    result = rechercherRecettes([searchInput.value], result);
  }

  actualRecipes = [...new Set(result)];
  displayRecipes(actualRecipes);
  console.log("filterTitle dans removeSelectedFilterItem = ", itemFilter);
  //CHANGER LA COULEUR DE FILTRE ICI
  let itemID = "dropdownElement-" + itemFilter.toLowerCase().replace(/ /g, "");
  let index = clickedItem.indexOf(itemID);
  if (index !== -1) {
    clickedItem.splice(index, 1);
  }
  if (clickedItem.length > 0) {
    clickedItem.map((item) => {
      const dropdownElement = document.getElementById(item);
      dropdownElement.classList.add("clicked-item");
      console.log("clickedItem dans addSelectedFilterItem = ", item);
    });
  }
}

function searchFilter(filterItems, filterType, recipes) {
  if (filterType === "ingredient") {
    ingredientFiltersItems.push(filterItems);
    let filteredIngredients = ingredientFilter(ingredientFiltersItems, recipes);
    return filteredIngredients;
  }

  if (filterType === "appliance") {
    applianceFiltersItems.push(filterItems);
    let filteredAppliances = applianceFilter(applianceFiltersItems, recipes);
    return filteredAppliances;
  }

  if (filterType === "utensil") {
    ustensilFiltersItems.push(filterItems);
    let filteredUtensils = utensilFilter(ustensilFiltersItems, recipes);
    return filteredUtensils;
  }
}

//function ingredientFilter(filters, recipes) {
//  console.log("typeof" + filters);
//  return recipes.filter((recipe) => {
//    const filtersLower = filters.map((filter) => filter.toLowerCase());
//
//    const dansIngredients = filtersLower.some((filter) => {
//      return recipe.ingredients.every((ingredient) =>
//        ingredient.ingredient.toLowerCase().includes(filter)
//      );
//    });
//
//    return dansIngredients;
//  });
//}

function ingredientFilter(filters, recipes) {
  return recipes.filter((recipe) => {
    const filtersLower = filters.map((filter) => filter.toLowerCase());

    const dansIngredients = filtersLower.every((filter) => {
      return recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(filter)
      );
    });

    return dansIngredients;
  });
}

function applianceFilter(filters, recipes) {
  return recipes.filter((recipe) => {
    const filtersLower = filters.map((filter) => filter.toLowerCase());

    const dansAppliances = filtersLower.every((filter) =>
      recipe.appliance.toLowerCase().includes(filter)
    );

    return dansAppliances;
  });
}

function utensilFilter(filters, recipes) {
  return recipes.filter((recipe) => {
    const filtersLower = filters.map((filter) => filter.toLowerCase());

    const dansUtensils = filtersLower.every((filter) =>
      recipe.ustensils.some((utensil) => utensil.toLowerCase().includes(filter))
    );

    return dansUtensils;
  });
}

//function applianceFilter(filters) {
//  return recipes.filter((recipe) => {
//    const filtersLower = filters.map((filter) => filter.toLowerCase());
//
//    const dansAppliances = filtersLower.some((filter) =>
//      recipe.appliance.toLowerCase().includes(filter)
//    );
//
//    return dansAppliances;
//  });
//}
//
//function utensilFilter(filters) {
//  return recipes.filter((recipe) => {
//    const filtersLower = filters.map((filter) => filter.toLowerCase());
//
//    const dansUtensils = filtersLower.some((filter) =>
//      recipe.ustensils.some((utensil) => utensil.toLowerCase().includes(filter))
//    );
//
//    return dansUtensils;
//  });
//}
