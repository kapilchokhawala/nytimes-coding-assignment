import page from '../../helpers/page';

const _ = require('lodash');

var card = 'article';

export default class userHomePage extends page {

    /** 
     * This are list of getters and setters which are used to maintain Page Object Model (POM) 
     * This page object elements are for elements of the User Home Page that is displayed after the user is logged in.
    */

    get lblSavedRecipeName() { return '.nytc---cardbase---name' }
    get lblSavedRecipeBy() { return '.nytc---cardbase---cardByline' }
    get lblSavedRecipeCookingTime() { return '.nytc---cardbase---cookingTime' }

    get navTabSavedRecipes() { return 'span=Saved Recipes'; }

    /**
     * This function is used to navigate to the User's "Saved Recipe" page and 
     * check whether the said recipe is still avaialble under the "Saved Recipe" page.
     * @param {string} recipeName The name of the recipe that is to be verified
     * @param {string} recipeBy The name of the author of the said recipe that is to be verified
     * @param {string|time} cookingTime The duration it takes to cook the said recipe that is to be verified
     * This function returns a boolean value
     */
    async navigateToAndVerifySavedRecipe(recipeName, recipeBy, cookingTime) {
        let self = this;
        await browser.click(self.lblUserName);
        await browser.click(self.navTabSavedRecipes);

        let recipeDetails = await Promise.all([
            browser.isVisible(self.lblSavedRecipeName + '=' + recipeName),
            browser.isVisible(self.lblSavedRecipeBy + '=' + recipeBy),
            browser.isVisible(self.lblSavedRecipeCookingTime + '=' + cookingTime)
        ]);

        return _.every(recipeDetails);
    }
}