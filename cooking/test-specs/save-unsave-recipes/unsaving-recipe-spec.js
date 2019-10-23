import recipeHomePage from '../../pages/recipe-home-page';
let recipeHomePageUsage = new recipeHomePage();

import userHomePage from '../../pages/user-home-page';
let userHomePageUsage = new userHomePage();

import recipeAPIs from '../../apis/recipe-apis';
let recipeAPIsUsage = new recipeAPIs();

const assert = require('assert');
const _ = require('lodash');

// This is a test spec for testing different scenarios of "UnSaving a Recipe"
describe('coding assisgnment test: Scenario 3', function() {

    before(async function() {
        await browser.url('/');
    });

    // Test to verify that the logged in user is able to unsave his saved recipe
    it('unsaving recipe', async function() {
        let userId = await recipeHomePageUsage.login('kapil.chokhawala+1@gmail.com', 'aBc@123');

        let [recipeName, recipeBy, cookingTime, recipeId, shouldSavedRecipeCardBePresent] = await recipeHomePageUsage.saveARandomActiveRecipeAndFetchDetails();

        let isSavedRecipeCardPresent = await userHomePageUsage.navigateToAndVerifySavedRecipe(recipeName, recipeBy, cookingTime);
        assert.equal(shouldSavedRecipeCardBePresent, isSavedRecipeCardPresent);

        await recipeAPIsUsage.deleteSavedRecipe(userId, recipeId);
        
        await browser.click(recipeHomePageUsage.iconSiteLogo);
        await browser.click(recipeHomePageUsage.lblUserName);

        shouldSavedRecipeCardBePresent = false;
        
        isSavedRecipeCardPresent = await userHomePageUsage.navigateToAndVerifySavedRecipe(recipeName, recipeBy, cookingTime);
        assert.equal(shouldSavedRecipeCardBePresent, isSavedRecipeCardPresent);

    });   
});