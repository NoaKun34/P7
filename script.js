import { recipes } from './Data/recipes.js';
import RecipeCardFactory from './Utils/FactoryRecipe.js'
import listSetup from './Utils/listSetup.js'

/* SI BESOIN DE CORELER LES FILTRES ET LA SEARCHBAR
let filterArray = [];
*/

const recipesContainer = document.getElementById('recipesContainer');
const numOfRecipes = document.getElementById("numOfRecipes");

export default function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    const cardFactory = new RecipeCardFactory();
    console.trace()
    const cardsHTML = recipes.map(recipe => cardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTML;
    numOfRecipes.innerHTML = recipes.length + " recettes";
    listSetup(recipes);
}

function main() {
    displayRecipes(recipes);
}

main();