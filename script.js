import { recipes } from './Data/recipes.js';
import RecipeCardFactory from './Utils/FactoryRecipe.js'
import listSetup from './Utils/listSetup.js'

/* SI BESOIN DE CORELER LES FILTRES ET LA SEARCHBAR
let filterArray = [];
*/

const recipesContainer = document.getElementById('recipesContainer');

function main() {
    const cardFactory = new RecipeCardFactory();
    const cardsHTML = recipes.map(recipe => cardFactory.createCard(recipe)).join('');

    recipesContainer.innerHTML = cardsHTML;

    listSetup(recipes);

    /*
    const test = recipesContainer.childNodes;
    const tableauTest = Array.from(test).filter(e => e.nodeType === Node.ELEMENT_NODE);
    console.log(tableauTest);*/
}

main();