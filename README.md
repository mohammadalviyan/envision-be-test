# Node Js Boilerplate

### Prerequisites
1. Node v12 or higher
2. NPM v6 or higher
3. Git and Git Bash installed
4. Any IDE with eslint plugin installed
5. Docker

### Cloning an existing repository : git clone

Run this step in order to clone of remote repositories:

1. Change directory to `/path/to/project`
2. Make sure Generate GIT Credentials and copy password
3. Clone a repository with ```git clone <url>``` and insert password if required
4. Remote repository is cloned

### Create A New Branch and Manage Branch

Before creating a new branch, pull the changes from upstream. ***Branch Master*** should be up to date.

1. Change branch to UAT ```git checkout master```and always update the latest changes ```git pull origin master```
2. Check with ```"feature/short description of your task"```

## Project structures

The nodejs boilerplate project contains following structures:

 - `src`
    - `controllers:`
      All the controllers logic such as accessing database, azure or 3rd party api should be placed inside this folder.
    - `models:`
      All database models, classes etc. should be placed inside this folder.
    - `routes:`
      All express Router routes or your api routes should be placed inside this folder.
    - `server:`
      Main server file is inside this folder.
    - `services:`
      All necessary service files should be placed inside this folder.
  - `tests`
      API test

By convention, if you are working on `Login` feature for example, you should create a sub-folder called `login` and put related loginController, loginModel js and test files etc. under respective folders.

For example,
 ```src > controllers > login > loginController.js & loginController.test.js```

 ```src > models > login > loginModel.js & loginModel.test.js```

### How to run locally from terminal

Install SQL Server from docker

1. Run docker compose inside project
2. Using this comment "docker compose up"

Run these steps in order.

1. Install all the modules: ```npm i```
2. Open a new terminal and run: ```npm run build:dev```. This will generate not only `dist` folder but also `.env` file in your root folder.
3. Open another terminal and run: ```npm run start:dev```
4. For database migration, ```npm run migrate:latest```

Every time you make changes to your `src` folder, webpack will automatically bundle and update your changes. You only have to refresh your browser to see the changes.

### Testing and Linting

1. Unit test: ```npm run test``` or ```./node_modules/.bin/jest --watch```
2. API test: ```npm run api-test```
3. Check code coverage: ```npm run coverage```
4. Check linting: ```npm run lint```

### Webpack and ES6+
All the files inside `src` folders are compiled with webpack. ES6+ syntaxes are supported and encouraged to use. Webpack will always automatically generate `dist` folder every time you make changes to your `src` files. You only have to refresh your browser to see changes.

## Env files
Put all the global static values such as database name, host, port etc. inside `.env.development` file under ```ops > env ```. By default, your `NODE_ENV` is set to `development` on your local machine.
