# Appsta 

## Description 
Duration: 2 week sprint 

Appsta is an easy to use web development marketplace for Startups. Startups can browse a variety of web development features, interact with these features, and select those relevant to their project. This application will help Startups plan, budget, and review their web development needs in a non-threatening environment. 
  
To see the fully functioning site, please visit: DEPLOYED VERSION OF APP (HEROKU - coming soon)

## Screenshots 

Login View 
![Log in](./public/Login.png)

Quotes View
![Quotes](./public/Quotes.png)

Review Saved Quotes 
![Saved Quotes](./public/SavedQuotes.png)

# Getting Started
Please see these instructions for how to get a copy of this project up and running on your local machine.  

# Prerequisites 

[Node.js](https://nodejs.org/en/)

[Postgres](https://www.postgresql.org/)

[Nodemon](https://nodemon.io/)

# Installation 

1. Create a database named "appsta"
2. The queries in the database.sql file are set up to create and populate all of the needed tables for your application to run correctly. This project was built on [Postgres](https://www.postgresql.org/), so be sure to have it installed. We used `Postico` and highly recommend that do too, to run the queries.
3. Open your choice of edit and run an npm install
4. Run `npm run server` in your terminal 
5. Run `npm run client` in your terminal 
6. The npm run client command will open up a new browser tab, where your app will spin up. 

# Development Setup Instructions

- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`

# Usage 

1.  New Buyer will use the application by clicking "Get Started" 



# Built with 

JavaScript 

React 

Redux 

Saga

Express 

Passport

Node.js

HTML

CSS

Material UI 

PostgreSQL

Postman- for testing 

Postico- for the database



## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal.This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App
This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
