import recipeHomePage from '../../pages/recipe-home-page';
let recipeHomePageUsage = new recipeHomePage();

import userHomePage from '../../pages/user-home-page';
let userHomePageUsage = new userHomePage();

import recipeAPIs from '../../apis/recipe-apis';
let recipeAPIsUsage = new recipeAPIs();

const assert = require('assert');


// This is a test spec for testing different scenarios of "Saving a Recipe"
describe('coding assisgnment test: Scenario 2', function() {

    before(async function() {
        await browser.url('/');
    });

    // Test to verify that the logged in user is able to save a recipe
    it('saving recipe', async function() {
        let shouldSavedRecipeCardBePresent = true;
        let userId = await recipeHomePageUsage.login('kapil.chokhawala+1@gmail.com', 'aBc@123');
        
        let [recipeName, recipeBy, cookingTime, recipeId] = await recipeHomePageUsage.saveARandomActiveRecipeAndFetchDetails();

        let isSavedRecipeCardPresent = await userHomePageUsage.navigateToAndVerifySavedRecipe(recipeName, recipeBy, cookingTime);

        assert.equal(shouldSavedRecipeCardBePresent, isSavedRecipeCardPresent);

        await recipeAPIsUsage.deleteSavedRecipe(userId, recipeId);
    });   
});