import { recipes } from './Data/recipes.js';
import RecipeCardFactory from './Utils/FactoryRecipe.js'
import listSetup from './Utils/listSetup.js'

const recipesContainer = document.getElementById('recipesContainer');
const numOfRecipes = document.getElementById("numOfRecipes");

export default function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    const cardFactory = new RecipeCardFactory();
    const cardsHTML = recipes.map(recipe => cardFactory.createCard(recipe)).join('');
    recipesContainer.innerHTML = cardsHTML;
    numOfRecipes.innerHTML = recipes.length + " recettes";
    listSetup(recipes);
}

function main() {
    displayRecipes(recipes);
}

main();