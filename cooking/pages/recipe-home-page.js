import page from '../../helpers/page';

const _ = require('lodash');
const randomstring = require('randomstring');

var card = '';

export default class recipeHomePage extends page {

    /** This are list of getters and setters which are used to maintain Page Object Model (POM) 
     *  This page object elements are for elements of the Recipe Home Page that is displayed after the user is logged in.
    */
    
    get btnBookmark() { return card + ' .control-save-btn'; }
    get btnUnBookmark() { return '.nytc---cardcontrols---iconIndicator'; }

    get cardRecipesActivelyDisplayed() { return '#sams-suggestions .owl-item.active .recipe-card'; }

    get domDataRecipeId() { return browser.getAttribute(card, 'data-id'); }

    get lblRecipeName() { return card + ' .name'; }
    get lblRecipeBy() { return card + ' .card-byline'; }
    get lblCookingTime() { return card + ' .cooking-time'; }

    set cardOfInterest(index) {
        card = '#sams-suggestions .owl-item:nth-child(' + index + ').active .recipe-card';
    }

    /**
     * This reusuable function find the count of the actively displayed recipes, then selects a random one from it, 
     * fetches recipe details (recipe name, author of the recipe and time it takes to cook the recipe), saves/bookmarks it.
     * In addition to the above 3 fetched values, the function also returns Recipe Id 
     * and boolean value indicating that the recipe was saved.
     */
    async saveARandomActiveRecipeAndFetchDetails() {
        let self = this;
        let shouldSavedRecipeCardBePresent = true;
        let recipeCardsActive = await browser.getText(self.cardRecipesActivelyDisplayed);
        recipeCardsActive = _.compact(recipeCardsActive);
        let index = _.random(1, recipeCardsActive.length);
        self.cardOfInterest = index > 2 ? index + 1 : index;
        
        let recipeDetails = await Promise.all([
            browser.getText(self.lblRecipeName),
            browser.getText(self.lblRecipeBy),
            browser.getText(self.lblCookingTime),
            self.domDataRecipeId,
            shouldSavedRecipeCardBePresent
        ]);

        await browser.click(self.btnBookmark);
        return recipeDetails;
    }
    
}