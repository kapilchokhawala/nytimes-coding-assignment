import page from '../../helpers/page';
let pageUsage = new page();

import recipeHomePage from '../pages/recipe-home-page';
let recipeHomePageUsage = new recipeHomePage();

import userHomePage from '../pages/user-home-page';
let userHomePageUsage = new userHomePage();

import recipeAPIs from '../apis/recipe-apis';
let recipeAPIsUsage = new recipeAPIs();

const _ = require('lodash');
const assert = require('assert');
const randomString = require('randomstring');

var randStr = randomString.generate(6);
var userName = 'kapil.chokhawala+' + randStr.toLowerCase();
var emailId = userName + '@gmail.com';
var password = randStr;
var cookieValue;

describe('coding asssignment', function() {

    before(async function() {
        await browser.url('/');
    });

    afterEach(async function() {
        await browser.click(pageUsage.iconSiteLogo);
        await pageUsage.logout();
    });

    after(async function() {
        await browser.deleteCookie('NYT-S');
    });

    // Test for "Creating a New Account"
    describe('Scenario 1: Creating a New Account', function() {

        // Test to verify that a non registered user can create a new account
        it('create new user', async function() {
            await pageUsage.createNewUser(emailId, password);
            await browser.click(pageUsage.btnCloseModal);
            let uiUserName = await browser.getText(pageUsage.lblUserName);
            cookieValue = (await browser.getCookie('NYT-S')).value;
            assert.equal(userName, uiUserName);
        });   
    });

    // Test for "Saving a Recipe"
    describe('Scenario 2: Saving a Recipe', function() {

        // Test to verify that the logged in user is able to save a recipe
        it('saving recipe', async function() {
            let shouldSavedRecipeCardBePresent = true;
            let userId = await recipeHomePageUsage.login(emailId, password);
            
            let [recipeName, recipeBy, cookingTime, recipeId] = await recipeHomePageUsage.saveARandomActiveRecipeAndFetchDetails();

            let isSavedRecipeCardPresent = await userHomePageUsage.navigateToAndVerifySavedRecipe(recipeName, recipeBy, cookingTime);

            assert.equal(shouldSavedRecipeCardBePresent, isSavedRecipeCardPresent);
        });   
    });

    // Test for "UnSaving a Recipe"
    describe('Scenario 3: UnSaving a Recipe', function() {

        // Test to verify that the logged in user is able to unsave his saved recipe
        it('unsaving recipe', async function() {
            let self = this;
            await browser.customLogin(cookieValue, pageUsage.lblUserName, userName);

            let userId = pageUsage.getUserId();

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

});