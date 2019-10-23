import page from '../../../helpers/page';
let pageUsage = new page();

const assert = require('assert');
const randomString = require('randomstring');

var randStr = randomString.generate(6);
var userName = 'kapil.chokhawala+' + randStr.toLowerCase();
var emailId = userName + '@gmail.com';
var password = randStr;

//This is a test spec for testing different scenarios of "Creating a New Account"
describe('coding assisgnment test: Scenario 1', function() {

    before(async function() {
        await browser.url('/');
    });

    // Test to verify that a non registered user can create a new account
    it('create new user', async function() {
        await pageUsage.createNewUser(emailId, password);
        await browser.click(pageUsage.btnCloseModal);
        let uiUserName = await browser.getText(pageUsage.lblUserName);
        assert.equal(userName, uiUserName);
    });   
});