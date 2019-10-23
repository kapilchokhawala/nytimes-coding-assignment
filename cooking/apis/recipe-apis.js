import utility from '../../helpers/utility';
let util = new utility();

const service = 'api/v2/';

export default class recipeAPIs {

    /**
     * This function is used to make a "DELETE" htttp api call to 
     * remove a recipe from Saved Recipe
     * @param {number} userId The id of the user for whom you want to perform this action
     * @param {number} recipeId The id of the recipe that is saved by the above said user, that needs to be unsaved
     */
    async deleteSavedRecipe(userId, recipeId) {
        let uri = service + 'users/' + userId + '/collectables/recipe/' + recipeId;
        return await util.makeAPIRequest('DELETE', uri);        
    }

}