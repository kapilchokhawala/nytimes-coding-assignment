# Introduction 
This project is a solution to the coding assisgnement given to the canditate, in this case Kapil Chokhawala, as part of the inteview process for the position on the SET team at the prestigous **New York Times**.



## Getting Started
Let's dive straight into it.

### Things that matter

Considering Node/NPM is already installed on your system.
(user command line/terminal)
1. Get the project on your system.
2. Navigate into the project
```
cd (your path to this project)/nytimes-coding-assignment
```
3. To install all the packages that are used or needed in the project, do
```
npm install
```
4. Once app packages are installed, run the command 
```
npm run seqExecution
```
5. Elaboration on what's done and will happen
    - 3 scenarios are listed in the sequential order
    - There are 3 hooks that are used
        -   before: before running any test case in that scope, we launch the brower and navigate to url
        -   afterEach: 
            -   after each test case, we click the cooking logo. this is done to set the state to a predictable start for the next scenario
            -   and we logout, this was done to check make sure we do legitimately login each time in the way expected 
                -   using username and password in scenario 2 and 
                -   using cookie in scenario 3
        -   after: to make sure we delete the cookie we were setting, just to take care of cache or anything like that
    -   Scenario 1: 
        -   a random emailId and passwords are generated everytime to create a new account
        -   the cookie is captured and stored at this time
    -   Scenario 2:
        -   user is logged in using the above emailId and password
        -   a random recipe is picked from all the actively displayed recipe's (usually 4 are displayed at anytime, in the normal browser window size)
        -   the recipe's name, author and the duration it takes to cook it are noted
        -   the recipe is saved 
        -   we navigate to the user's Saved Recipe section and look for recipe with those 3 credentials
    - Scenario 3:
        -   In wdio.conf, we are creating a customLogin function
        -   the customLogin function is setting the cookie, refreshing the page to make sure we are logged in
        -   we do assert that the username is displayed on the top right
        -   using "request" node module, we make an api call, passing the method "DELETE", the url with userId and recipeId and most importantly cookie
            **To Be Noted:** This api call was working till yesterday morning, then it has started giving me 403 error.
        -   Once we make the api call, we navigate back again to the user's Saved Recipe to validate if the recipe is deleted.
            **This was working fine till yesterday**

5. Folders:
    -   helpers:  
        -   page.js:  it contains page objects and page interaction functions that will be required by all projects
                example: login, user navigation related 
        -   utility.js: it mainly manages interfaces to 3rd Party Tools
            -   this is where we have a function that creates the request with cookies and other authentication and     makes a api call using "request" node module
            -   this is also where we can create a function to make db call using "mssql" or other dbs
    -   (project)/apis:
        -   This is where we create functions to make different HTTP calls to various resources
        -   We can create JSON in case we are doing POST and PUT
        -   We are creating url based on parameters passed userId and recipeId
    -   (project)/pages:
        -   all page object element identifiers and custom functions related to that specific page can be places here

6. To use ES6, I am using Babel to transpile the new type to old style, since Node.js still hasn't started supporting ES6.

### Prerequisites
To begin using this solution, you will need the following softwares installed.
1. Node.js 
    -You can download this from [Node.js Website](https://nodejs.org/en/) and install it.
    - This solution was developed using Node v8.9.4
    - Installing Node will also install NPM (Node Package Manager)
2. Git
    - To install Git you can checkout the [Atlassian's Tutorial](https://www.atlassian.com/git/tutorials/install-git)
        - There are different steps to follow depending on the OS that you are using
            - [Mac OS X](https://www.atlassian.com/git/tutorials/install-git#mac-os-x)
            - [Windows](https://www.atlassian.com/git/tutorials/install-git#windows)
            - [Linux](https://www.atlassian.com/git/tutorials/install-git#linux)
    - If you are new to Git, go throught this [Git Cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

### Setup
To setup this project and getting started is just few simple steps
1. Clone this repository on your system
    - To do so, follow the steps for [Cloning a Git repository](https://confluence.atlassian.com/bitbucket/clone-a-repository-223217891.html)
2. Navigate into the project folder or the repo as you may say that you just cloned and excute the command 
        ```
        npm i or npm install
        ```
    This will install all the node modules that are used/needed to run this solution succesfully. 

### Running Scenarios
This solution has mainly 3 scenarios
1. Creating a new user/account
2. Saving a recipe/Bookmarking it for future reference
3. Unsaving the saved recipe

Each of these scenarios can be ran independently or together (in parallel or sequentially).

Command to run tests:
```
npm run <keyword>
```
Example:
```
npm run seqExecution
```
This solution has following 5 keywords
1. seqExecution: run all 3 scenrios in order of Scenario 1, Scenario 2 and Scenario 3.
    It has the bonus point/cookie related implementation.
2. allScenarios: runs all scenarios in parallel 
3. scenario1: runs "Verify Creating New User" scenario, also called "Scenario 1"
4. scenario2: runs "Verify Saving Recipe" scenario, also called "Scenario 2"
5. scenario3: runs "Verify Unsaving Recipe" scenario, also called "Scenario 3"

Refer package.json to know or defined more keywords to run various suites. These suites are defined in wdio/conf. You can add more based on how you wanna group your tests. 

The groups can be based on 
1. Teams: cooking.nytimes, finance.nytimes, etc.
2. Features: creating new users, logging in, watch a stock, bookmark a recipe, etc.
3. Impact Areas: change in api http error codes that are returned, or the authentication system, etc.

### Test Case Management/Organization
Template:
- subdomain
    - apis: functions taking care of methods of a resource go together
    - pages: page objects of a particular page/category go together
    - test-specs: this is where all test scenarios go
        -   fetures: test cases of a particular feature/functionality go in same folder

Example:
- cooking
    - apis
        - recipe-api.js
        - *-api.js
    - pages
        - user-home-page.js
        - *-page.js
    - test-specs
        - save-unsave-recipes
            - saving-recipe-spec.js
            - *-spec.js


### Contributing
To contribute to this project you will need a good understanding of 
1. [Javascript](https://javascript.info/)
2. [Node.js](https://blog.codeship.com/node-js-tutorial/)
3. [Selenium Webdriver](http://www.seleniumeasy.com/selenium-webdriver-tutorials)
4. [Webdriver.io](http://webdriver.io/guide.html)
    - [Selectors](http://webdriver.io/guide/usage/selectors.html)
    - [APIs](http://webdriver.io/api.html)

### Contact The Author
In case you have any questions or issues related to this solution, feel free to reach out to me. 
```
Kapil Chokhawala    |   (716) 795 - 2745    |   kapil.chokhawala@gmail.com
```