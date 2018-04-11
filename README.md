# CV_master
[![Build Status](https://travis-ci.org/Martturi/cv_master.svg?branch=master)](https://travis-ci.org/Martturi/cv_master)

CV management system

Master branch auto-deploys to <a href="http://cv-master.herokuapp.com">cv-master.herokuapp.com</a>

##  Heroku setup

This creates a new Heroku app, adds a database, initializes it, and pushes the app to the repo.
You need to have the Heroku CLI installed

```
heroku create
heroku addons:create heroku-postgresql:hobby-dev -a {app name}
heroku git:remote -a {app name}
cat SQL_table_creation.sql | heroku pg:psql -a {app name}
git push heroku
heroku open
```

### Config variables for heroku deployment
```
  // Needed for authentication,
  AUTH_ID:  // The server looks for this variable, and does not use authentication if it doesn’t exist.
  AUTH_SECRET:  // ID and SECRET are gotten from the OAUTH provider
  CLIENT_URL: https://cv-master.herokuapp.com // The URL for the application
  ALLOWED_LOGIN_DOMAINS: gmail.com,domain.com //What email domains are allowed to login

  UPDATE_PDF_FROM_FS: 0 // Optional. If disabled does not update the pdf from the repository. Defaults to 1 if not present.
```

## Updating the template

By default the template-styling for pdf-generation is loaded to the database on dyno startup, according to the files in /server/pdf/. You can opt to disable this and update templates to the database manually by setting an env flag UPDATE_PDF_FROM_FS to 0.

## Running the app locally

To run the app locally you need npm and node installed. You also need a postgres-database running with a user called postges configured with priviledges.

```
git clone https://github.com/Martturi/cv_master.git
cd cv_master
npm install
./init_db.sh
npm run watch
```

### Config variables locally

The app uses a .env -file, which can be configured with optional environment variables.
Example:
```
AUTH_ID/233998639985-i5o8sbo7p1a2qtr9eu6cis37atvv9l28.apps.googleusercontent.com
AUTH_SECRET=W5W12E8XEKseYE86vyaLyUzn
ALLOWED_LOGIN_DOMAINS=gmail.com
```


## Running tests

There are a small amount of api-tests configured for the server. Make sure to have a database running when you run them.

```
./init_db.sh
npm install
npm run test
```
