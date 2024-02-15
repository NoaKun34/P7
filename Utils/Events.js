import { recipes } from '../Data/recipes.js';
import RecipeCardFactory from './FactoryRecipe.js'
import createSelectedFilterElement from './FactoryFilter.js';

/* SEARCHBAR */

const searchInput = document.getElementById('searchInput');
const searchBtnClose = document.getElementById('searchBtnClose');
const recipesContainer = document.getElementById('recipesContainer');
const searchBtnSearch = document.getElementById('searchBtnSearch');
const numOfRecipes = document.getElementById('numOfRecipes');
const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = [searchInput.value];
    const searchedRecipes = rechercherRecettes(query);

    const searchedCardFactory = new RecipeCardFactory();
    const cardsHTMLAfterSearch = searchedRecipes.map(recipe => searchedCardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTMLAfterSearch;
    numOfRecipes.innerHTML = searchedRecipes.length + " recettes";
    console.log(recipesContainer);
});

searchInput.addEventListener('input', function () {
    if (this.value.length > 0) {
        searchBtnClose.classList.add('show');
        searchBtnClose.classList.remove('hide');

        if (this.value.length >= 3) {
            const query = [this.value];
            const searchedRecipes = rechercherRecettes(query);
            const searchedCardFactory = new RecipeCardFactory();
            const cardsHTMLAfterSearch = searchedRecipes.map(recipe => searchedCardFactory.createCard(recipe)).join('');
            recipesContainer.innerHTML = cardsHTMLAfterSearch;
            numOfRecipes.innerHTML = searchedRecipes.length + " recettes";
        }
    } else if (this.value.length === 0) {
        searchBtnClose.classList.remove('show');
        searchBtnClose.classList.add('hide');

        const cardFactory = new RecipeCardFactory();
        const cardsHTML = recipes.map(recipe => cardFactory.createCard(recipe)).join('');
        recipesContainer.innerHTML = cardsHTML;
        numOfRecipes.innerHTML = "1500 recettes";
    }
});

searchBtnClose.addEventListener('click', function () {
    searchInput.value = '';
    searchBtnClose.classList.remove('show');
    searchBtnClose.classList.add('hide');

    const cardFactory = new RecipeCardFactory();
    const cardsHTML = recipes.map(recipe => cardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTML;
    numOfRecipes.innerHTML = "1500 recettes";
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

export function rechercherRecettes(filtres) {
    return recipes.filter(recette => {
        // Convertir chaque filtre en minuscules pour la comparaison
        const filtresLower = filtres.map(filtre => filtre.toLowerCase());

        // Vérifier dans le nom de la recette
        const dansNom = filtresLower.some(filtre => recette.name.toLowerCase().includes(filtre));

        // Vérifier dans la description de la recette
        const dansDescription = filtresLower.some(filtre => recette.description.toLowerCase().includes(filtre));

        // Vérifier dans les ingrédients de la recette
        const dansIngredients = filtresLower.some(filtre => {
            return recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filtre));
        });

        return dansNom || dansDescription || dansIngredients;
    });
}

searchBtnSearch.addEventListener('click', () => {
    const query = [searchInput.value];
    const searchedRecipes = rechercherRecettes(query);
    console.log(searchedRecipes); // Traiter les résultats comme vous le souhaitez

    const searchedCardFactory = new RecipeCardFactory();
    const cardsHTMLAfterSearch = searchedRecipes.map(recipe => searchedCardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTMLAfterSearch;
    numOfRecipes.innerHTML = searchedRecipes.length + " recettes";
});



/* --------------------------------------------------------------------- */

/* INGREDIENTS DROPDOWN */
const dropdownIngredientDIV = document.getElementById('dropdownIngredientDIV');
const dropdownIngredient = document.getElementById('dropdownIngredient');
const dropdownIngredientContent = document.getElementById('dropdownIngredientContent');
const dropdownIngredientInput = document.getElementById('dropdownIngredientInput');
const dropdownIngredientClose = document.getElementById('dropdownIngredientClose');
const dropdownItems = document.getElementsByClassName('dropdownListItem');

dropdownIngredientInput.addEventListener('input', function () {
    if (this.value.length > 0) {
        dropdownIngredientClose.classList.add('show');
        dropdownIngredientClose.classList.remove('hide');
    } else if (this.value.length === 0) {
        dropdownIngredientClose.classList.remove('show');
        dropdownIngredientClose.classList.add('hide');
    }
});

dropdownIngredientClose.addEventListener('click', function () {
    dropdownIngredientInput.value = '';
    dropdownIngredientClose.classList.remove('show');
    dropdownIngredientClose.classList.add('hide');
});

dropdownIngredient.addEventListener('click', function () {
    if (dropdownIngredientContent.classList.contains('hide')) {
        dropdownIngredientContent.classList.remove('hide');
        dropdownIngredientContent.classList.add('show');
        dropdownIngredientDIV.classList.add('filterDropdownOpen');
    } else {
        dropdownIngredientContent.classList.remove('show');
        dropdownIngredientContent.classList.add('hide');
        dropdownIngredientDIV.classList.remove('filterDropdownOpen');
    }
});

/* APPAREILS DROPDOWN */
const dropdownAppareilDIV = document.getElementById('dropdownAppareilDIV');
const dropdownAppareil = document.getElementById('dropdownAppareil');
const dropdownAppareilContent = document.getElementById('dropdownAppareilContent');
const dropdownAppareilInput = document.getElementById('dropdownAppareilInput');
const dropdownAppareilClose = document.getElementById('dropdownAppareilClose');

dropdownAppareilInput.addEventListener('input', function () {
    if (this.value.length > 0) {
        dropdownAppareilClose.classList.add('show');
        dropdownAppareilClose.classList.remove('hide');
    } else if (this.value.length === 0) {
        dropdownAppareilClose.classList.remove('show');
        dropdownAppareilClose.classList.add('hide');
    }
});

dropdownAppareilClose.addEventListener('click', function () {
    dropdownAppareilInput.value = '';
    dropdownAppareilClose.classList.remove('show');
    dropdownAppareilClose.classList.add('hide');
});

dropdownAppareil.addEventListener('click', function () {
    if (dropdownAppareilContent.classList.contains('hide')) {
        dropdownAppareilContent.classList.remove('hide');
        dropdownAppareilContent.classList.add('show');
        dropdownAppareilDIV.classList.add('filterDropdownOpen');
    } else {
        dropdownAppareilContent.classList.remove('show');
        dropdownAppareilContent.classList.add('hide');
        dropdownAppareilDIV.classList.remove('filterDropdownOpen');
    }
});

/* USTENSILS DROPDOWN */
const dropdownUstensilsDIV = document.getElementById('dropdownUstensilsDIV');
const dropdownUstensils = document.getElementById('dropdownUstensils');
const dropdownUstensilsContent = document.getElementById('dropdownUstensilsContent');
const dropdownUstensilsInput = document.getElementById('dropdownUstensilsInput');
const dropdownUstensilsClose = document.getElementById('dropdownUstensilsClose');

dropdownUstensilsInput.addEventListener('input', function () {
    if (this.value.length > 0) {
        dropdownUstensilsClose.classList.add('show');
        dropdownUstensilsClose.classList.remove('hide');
    } else if (this.value.length === 0) {
        dropdownUstensilsClose.classList.remove('show');
        dropdownUstensilsClose.classList.add('hide');
    }
});

dropdownUstensilsClose.addEventListener('click', function () {
    dropdownUstensilsInput.value = '';
    dropdownUstensilsClose.classList.remove('show');
    dropdownUstensilsClose.classList.add('hide');
});

dropdownUstensils.addEventListener('click', function () {
    if (dropdownUstensilsContent.classList.contains('hide')) {
        dropdownUstensilsContent.classList.remove('hide');
        dropdownUstensilsContent.classList.add('show');
        dropdownUstensilsDIV.classList.add('filterDropdownOpen');
    } else {
        dropdownUstensilsContent.classList.remove('show');
        dropdownUstensilsContent.classList.add('hide');
        dropdownUstensilsDIV.classList.remove('filterDropdownOpen');
    }
});

/* SELECTED FILTER ITEM */

const selectedFilterContainer = document.getElementById('selectedFilterContainer');

export default function addSelectedFilterItem(itemFilter) {
    const selectedFilterElement = createSelectedFilterElement(itemFilter.toLowerCase().replace(/ /g, ''), itemFilter, 'Assets/closeIconBlack.png');
    console.log(typeof itemFilter);
    selectedFilterContainer.appendChild(selectedFilterElement);
}