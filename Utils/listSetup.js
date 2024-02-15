import addSelectedFilterItem from './Events.js';
import rechercherRecettes from './Events.js';

const recipesContainer = document.getElementById('recipesContainer');
const numOfRecipes = document.getElementById('numOfRecipes');

let selectedFilterItems = [];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* INGREDIENT DROPDOWN */
const dropdownListIngredients = document.getElementById('dropdownListIngredients');

function getUniqueIngredients(recipes) {
    let ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            let normalizedIngredient = capitalizeFirstLetter(ingredient.ingredient.trim());
            ingredientsSet.add(normalizedIngredient);
        });
    });
    return Array.from(ingredientsSet);
}

/*
function addItemsToDropdownList(dropdownElement, items) {

    const listItems = items.map(item => {
        const itemId = 'dropdownElement-' + item.toLowerCase().replace(/ /g,'');
        return `<li id="${itemId}" class="dropdownListItem">${item}</li>`;
    }).join('');

    dropdownElement.innerHTML = listItems;
} */

function addItemsToDropdownList(dropdownElement, items) {
    // Effacez d'abord le contenu actuel
    dropdownElement.innerHTML = '';

    // Parcourez chaque élément de la liste 'items'
    items.forEach(item => {
        // Créez un nouvel élément 'li'
        const li = document.createElement('li');
        li.textContent = item; // Définissez le texte de l'élément
        li.className = 'dropdownListItem'; // Ajoutez des classes si nécessaire
        li.id = 'dropdownElement-' + item.toLowerCase().replace(/ /g, ''); // Définissez l'ID
        // Ajoutez un écouteur d'événements à l'élément 'li'
        li.addEventListener('click', function () {
            // Gérez l'événement de clic ici
            addSelectedFilterItem(item);
            //const copy = item;
            const testTable = [];
            //const test = rechercherRecettes(testTable);
        });

        // Ajoutez l'élément 'li' au DOM, sous l'élément 'dropdownElement'
        dropdownElement.appendChild(li);
    });
}

/* APPAREIL DROPDOWN */
const dropdownListAppliances = document.getElementById('dropdownListAppliances');

function getUniqueAppliances(recipes) {
    let appliancesSet = new Set();
    recipes.forEach(recipe => {
        let normalizedAppliance = capitalizeFirstLetter(recipe.appliance.toLowerCase().trim());
        appliancesSet.add(normalizedAppliance);
    });
    return Array.from(appliancesSet);
}

/* USTENSILS DROPDOWN */
const dropdownListUstensils = document.getElementById('dropdownListUstensils');

function getUniqueUtensils(recipes) {
    let utensilsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
            let normalizedUtensil = capitalizeFirstLetter(utensil.toLowerCase().trim());
            utensilsSet.add(normalizedUtensil);
        });
    });
    return Array.from(utensilsSet);
}

export default function listSetup(data) {
    const ingredients = getUniqueIngredients(data);
    addItemsToDropdownList(dropdownListIngredients, ingredients);

    const appliances = getUniqueAppliances(data);
    addItemsToDropdownList(dropdownListAppliances, appliances);

    const utensils = getUniqueUtensils(data);
    addItemsToDropdownList(dropdownListUstensils, utensils);
}