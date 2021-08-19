## Test the application locally 


### Step 1 - Install json-server

- After cloning the project, from the root:
  - Run `npm install -g json-server`
  - Run `npm start` to start the application on port 3000
  - Now open a new terminal and run `json-server -p 3010 data/db.json` 

### Step 2 - Change the routes in following files, 

- In `Startup.js`
  - Set `BASE_URL = 'http://localhost:3010/users' `
  - Set `USER_URL = 'http://localhost:3010/users?name=' + getStorage('name');`    

- In `Profile.js`
  - Set `POST_URL = 'http://localhost:3010/translations/' `
  - Set `FILTERED_POST_URL = 'http://localhost:3010/translations?_sort=id&_order=desc&_limit=10&status=active&author=' ` 

- In `Translation.js`
  - Set `TRANSLATION_URL = 'http://localhost:3010/translations' ` 
