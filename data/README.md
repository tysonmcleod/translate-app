## Test the application locally 


### Step 1 - Install json-server

- After cloning the project, from the root:
  - Run `npm install -g json-server`
  - Run `npm start` to start the application on port 3000
  - Now open a new terminal and run `json-server -p 3010 data/db.json` 

### Step 2 -  [Change the routes in API/index.js](../src/utils/API/index.js), 

- Replace every occurence of `'https://translate-app-deluxe-db.herokuapp.com' ` with  `'http://localhost:3010' ` 
