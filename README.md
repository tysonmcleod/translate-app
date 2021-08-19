# Translate App

This is a web application developed using React.js to translate words from spoken English to American Sign Language. The app has a login page where the user must input their name to access the page, a translation page where words and sentences up to 40 characters can be translated, as well as a profile page where the user's most recent translations are listed.

## Setup

To run the app in your local environment, do the following:

- Clone the repo.
- Cd to the root of the project.
- Run `npm install` to install dependencies.
- Run `npm install -g json-server` to install dependencies for the API used in the app. Link to documentation: [JSON Server](https://github.com/typicode/json-server)
- Run `npm start` to start the application on port 3000.
- [Configure the routes](data/README.md)  
- Run `json-server -p 3010 data/db.json` to start the API on port 3010, which the application expects.

## Deployed application

The app can be accessed at: [Translate App](https://translate-app-deluxe.herokuapp.com/)

## Contributors

Tyson McLeod & Albin Ljungdahl
