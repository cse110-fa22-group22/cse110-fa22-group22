# Team 22 CI/CD Pipeline Phase 2

## Overview 

Our pipeline is designed to quickly and effenciently deploy new code while testing it for bugs. We have the following tools and processes outlined for our pipeline.
We want to implement some more of the following tasks in the section below for our pipeline so that we are able to check the code that is being merged and make sure it is clean and neat and held to a standard. Using the features we list below we can continue development (CI) so that we have no hold ups in the development process. We already have a few features set up, but this phase irons out everything and gets everything set up.

# Identified New Pipeline Features
- CSS linting and code style enforcement
- Documentation generation via automation (ex. JSDocs)
- Pull Requests need to be talked about more with members of team
- Demonstrate ESLint and Unit Test to team as well so they understand it better
- Minification needs to be properly shown to the team as well as well as described and integrated. 

### CSS and ES Linting
We have also implemented CSSLinting since our phase 1 to go along with our ESLint that we had done. 

**Methods of using CSSLinting**
1. The purpose of CSSLint is to format the CSS codes written in this project.  

2. Firstly, installing CSSLint for NodeJS by running `npm install --save-dev csslint` in terminal. Then, implementing `csslint` in npm scripts of package.json to scan appropriate CSS file. Finally, adding `csslint` in yml file to get it into our workflow/pipeline.

3. Run `npm run csslint` in terminal to get it to work.

**Methods of using JSDocs** 
1. Follow the example comment below and this will allow us to use the configuration file made to auto-generate documentation based on the comments after they are done. Have members of the team write these comments for each function they write so that we can generate documentation for it. 
   
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

 1. Run `jsdoc file.js` in terminal to get it to work.

**Pull Requests**
1. These are manual and need to be done by individual members of the team. Go to github and check on pull requests that are waiting to be merged. Take these requests and view the changes made to the main code-base and see if there are any errors. Once you have combed through the request and identified any bugs, you can submit your review so that it can be approved or fixed before it is pushed to the main branch. 

**Minification**
***What is minification?***
Minification is basically the process of conducing the text in JavaScript, html, CSS files. Code is restructured so that text can fit together as tightly as possible. Almost all whitespace is gotten rid of. This is done so that the program can run much quicker. If there is less white space to read then the application will run a bit faster. The downside of this is that the result code from minification is very unreadable to programmers.

***How do we minify?***
To minify the code we can copy and paste are code into a free online JS, html, and CSS minifier. Since the text becomes very unreadable it is best to keep two different directories of files. One directory is for the human readable file that will be modified like normal. The other directory will contain the minified version of the code. The application should be deployed from the minified directory. Anytime there are changes in the readable directory those changes should be be copied and minified into minify directory.

***When will we minify?***
Once basically all the code for this CRUD application is done, we will copy all the files into a minify directory, minify the code, then deploy the website from that directory. This will lessen the amount of times we need to minify our code.

**Phase 2 Pipeline Diagram**


**Review from last time**

**Methods of using ESLinting:**
1. Install ESLint extension on VSCode for live error scan. We recommended everyone on our team to install this extension so we can view the error live and practice our coding conventions more efficiently.

2. Run `npm run lint` in terminal. We also implemented lint in npm scripts so it can scan the appropiate folders and files.


### Unit Testing
We are continuing on using **Jest** for unit testing.

**Procedure of using Jest:**
1. Create the unit tests for the function that you will work on in the Jest folder.
2. Implement the function.
3. Run `npm test -- [filename.test.js]` in terminal to test a single file.
- or -
3. Run `npm test` in terminal. We have already implemented test in npm scripts so it can test all unit tests.

## Pipeline Diagram

![pipeline diagram](phase1.png "Pipeline Diagram")
