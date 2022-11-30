# Team 22 CI/CD Pipeline

## Overview 

Our pipeline is designed to quickly and effenciently deploy new code while testing it for bugs. We have the following tools and processes outlined for our pipeline.
We want to implement the following tasks in the section below for our pipeline so that we are able to check the code that is being merged and make sure it is clean and neat and held to a standard. Using the features we list below we can continue development (CI) so that we have no hold ups in the development process.

# Identified 5 Pipeline Features
- linting and code style enforcement (may happen in pipeline and/or in editor)
- unit tests via automation (ex. Jest, Tape, Ava, Cypress, Mocha/Chai, etc.)*
- code quality via tool  (ex. Codeclimate, Codacy, etc.)
- code quality via human review (ex. Pull Requests)
- documentation generation via automation (ex. JSDocs)

### Linting
We are using **ESLint** to keep our javascript error-free and standardize our coding conventions.

**Methods of using ESLint:**
1. Install ESLint extension on VSCode for live error scan. We recommended everyone on our team to install this extension so we can view the error live and practice our coding conventions more efficiently.

2. Run `npm run lint` in terminal. We also implemented lint in npm scripts so it can scan the appropiate folders and files.

### Unit Testing
We are using **Jest** for unit testing.

**Procedure of using Jest:**
1. Create the unit tests for the function that you will work on in the Jest folder.
2. Implement the function.
3. Run `npm test -- [filename.test.js]` in terminal to test a single file.
- or -
3. Run `npm test` in terminal. We have already implemented test in npm scripts so it can test all unit tests.

## Pipeline Diagram

![pipeline diagram](phase1.png "Pipeline Diagram")
