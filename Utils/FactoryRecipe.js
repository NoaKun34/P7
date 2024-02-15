export default class RecipeCardFactory {
    createCard({ id, image, name, ingredients, time, description }) {
        const ingredientItems = ingredients.map(ingredient =>
            `<li class="recipeCardIngredientsItem">
                <p class="ingredientItem">${ingredient.ingredient}</p>
                ${ingredient.quantity ? `<br><span class="ingredientCount">${ingredient.quantity}${ingredient.unit ? ` ${ingredient.unit}` : ''}</span>` : ''}
            </li>`
        ).join('');

        return `
            <div class="recipeCard" id="recipe-${id}">
                <div class="recipeCardHeader" style="background-image: url('/Assets/recipesImages/${image}');">
                    <div class="time"><p class="timeText">${time} min</p></div>
                </div>
                <div class="recipeCardDesc">
                    <h3 class="recipeCardTitle">${name}</h3>
                    <div class="recipeCardCatRecipe">
                        <h4 class="recipeCardCatTitle">RECETTE</h4>
                        <p class="recipeCardRecipeContent">${description}</p>
                    </div>
                    <div class="recipeCardCatIngredients">
                        <h4 class="recipeCardCatTitle">INGRÉDIENTS</h4>
                        <ul class="recipeCardIngredientsList">${ingredientItems}</ul>
                    </div>
                </div>
            </div>`;
    }
}