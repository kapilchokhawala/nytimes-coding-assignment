export default class Page {

    get btnCreateAccount() { return 'span=Create Account'; }
    get btnCloseModal() { return '.nytc---x---x.nytc---largepicturemodal---xBtn'; }
    get btnLogIn() { return 'span=Log in'; }
    get btnYes() { return '#confirmation-modal[style="display: block;"] .ok-btn'; }
    get btnSettings() { return '.nytc---signupbtn---loggedIn'; }

    get domDataUser() { return '.js-react-on-rails-component'; }

    get iconSiteLogo() { return '.nytc---sitelogo---logo'; }

    get lblUserName() { return '[data-reactid="47"]'}

    get linkLogIn() { return '[data-reactid="33"]'; }
    get linkSignUp() { return 'span=Sign up.'; }
    get linkLogOut() { return '[data-reactid="79"]'; }

    get txbRegisterEmail() { return '[name="email_address"]'; }
    get txbRegisterPassword() { return 'input[name="password1"].nytc---regimodal---regiInput'; }
    get txbRegisterConfirmPassword() { return 'input[name="password2"].nytc---regimodal---regiInput'; }
    get txbLogInEmail() { return '[name="userid"]'; }
    get txbLogInPassword() { return 'input[name="password"].nytc---regimodal---regiInput'; }

    async createNewUser(emailId, password) {
        let self = this;
        try {
            await browser.click(self.linkLogIn);
            await browser.click(self.linkSignUp);
            await browser.setValue(self.txbRegisterEmail, emailId);
            await browser.setValue(self.txbRegisterPassword, password);
            await browser.setValue(self.txbRegisterConfirmPassword, password);
            await browser.click(self.btnCreateAccount);
        }
        catch(error) {
            throw error;
        }
    };

    async logout() {
        let self = this;
        try {
            await browser.click(self.btnSettings);
            await browser.click(self.linkLogOut);
            await browser.refresh();
        }
        catch(error) {
            throw error;
        }
    };

    async login(emailId, password) {
        let self = this;
        try {
            await browser.click(self.linkLogIn);
            await browser.setValue(self.txbLogInEmail, emailId);
            await browser.setValue(self.txbLogInPassword, password);
            await browser.click(self.btnLogIn);
            return self.getUserId();
        }
        catch(error) {
            throw error;
        }
    };

    async getUserId() {
        let self = this;
        let userData = await browser.getAttribute(self.domDataUser, 'data-props');
        return JSON.parse(userData).user.id;
    };

}