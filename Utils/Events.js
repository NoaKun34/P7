import { recipes } from "../Data/recipes.js";
import createSelectedFilterElement from "./FactoryFilter.js";
import displayRecipes from "./../script.js";

let selectedFilterItems = [];
let actualRecipes = recipes;

/* SEARCHBAR */

const searchInput = document.getElementById("searchInput");
const searchBtnClose = document.getElementById("searchBtnClose");
const searchBtnSearch = document.getElementById("searchBtnSearch");
const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = [searchInput.value];
  const searchedRecipes = recipesSearch(query);
  displayRecipes(searchedRecipes);
});

let previousValue = null;

searchInput.addEventListener("input", function () {
  if (this.value.length > 0) {
    searchBtnClose.classList.add("show");
    searchBtnClose.classList.remove("hide");

    if (this.value.length >= 3) {
      if (previousValue) {
        const index = selectedFilterItems.indexOf(previousValue);
        if (index > -1) {
          selectedFilterItems.splice(index, 1);
        }
      }

      selectedFilterItems.push(this.value);
      const searchedRecipes = recipesSearch(
        selectedFilterItems,
        actualRecipes
      );

      actualRecipes = searchedRecipes;
      displayRecipes(actualRecipes);
      previousValue = this.value;
    }
  } else if (this.value.length === 0) {
    searchBtnClose.classList.remove("show");
    searchBtnClose.classList.add("hide");
    selectedFilterItems = [];

    if (
      selectedFilterItems.length === 0 &&
      ingredientFiltersItems === 0 &&
      applianceFiltersItems === 0 &&
      ustensilFiltersItems === 0
    ) {
      displayRecipes(recipes);
    } else {
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

  displayRecipes(actualRecipes);
});

function recipesSearch(filtres, recipes) {
  let result = [];
  for (let i = 0; i < recipes.length; i++) {
    let recette = recipes[i];
    let filtresLower = [];
    for (let j = 0; j < filtres.length; j++) {
      filtresLower.push(filtres[j].toLowerCase());
    }

    let dansNom = false;
    for (let j = 0; j < filtresLower.length; j++) {
      if (recette.name.toLowerCase().indexOf(filtresLower[j]) !== -1) {
        dansNom = true;
        break;
      }
    }

    let dansDescription = false;
    for (let j = 0; j < filtresLower.length; j++) {
      if (recette.description.toLowerCase().indexOf(filtresLower[j]) !== -1) {
        dansDescription = true;
        break;
      }
    }

    let dansIngredients = false;
    for (let j = 0; j < filtresLower.length; j++) {
      for (let k = 0; k < recette.ingredients.length; k++) {
        if (recette.ingredients[k].ingredient.toLowerCase().indexOf(filtresLower[j]) !== -1) {
          dansIngredients = true;
          break;
        }
      }
      if (dansIngredients) {
        break;
      }
    }

    if (dansNom || dansDescription || dansIngredients) {
      result.push(recette);
    }
  }
  return result;
}

searchBtnSearch.addEventListener("click", () => {
  const query = [searchInput.value];
  const searchedRecipes = recipesSearch(query, actualRecipes);

  displayRecipes(searchedRecipes);
});

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

  const filterLowerCase = itemFilter.toLowerCase().replace(/ /g, ""); // Convertit le filtre en minuscules et supprime les espaces
  const selectedFilterElement = createSelectedFilterElement(
    filterLowerCase,
    itemFilter,
    "Assets/closeIconBlack.png"
  );
  selectedFilterContainer.appendChild(selectedFilterElement);
  const searchedRecipes = searchFilter(itemFilter, type, actualRecipes);
  actualRecipes = [...new Set(searchedRecipes)];
  displayRecipes(actualRecipes);
  clickedItem.push(itemID);
  if (clickedItem.length > 0) {
    clickedItem.map((item) => {
      const dropdownElement = document.getElementById(item);
      dropdownElement.classList.add("clicked-item");
    });
  }
}

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
    result = recipesSearch([searchInput.value], result);
  }

  actualRecipes = [...new Set(result)];
  displayRecipes(actualRecipes);
  let itemID = "dropdownElement-" + itemFilter.toLowerCase().replace(/ /g, "");
  let index = clickedItem.indexOf(itemID);
  if (index !== -1) {
    clickedItem.splice(index, 1);
  }
  if (clickedItem.length > 0) {
    clickedItem.map((item) => {
      const dropdownElement = document.getElementById(item);
      dropdownElement.classList.add("clicked-item");
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