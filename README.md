# CV_master
[![Build Status](https://travis-ci.org/Martturi/cv_master.svg?branch=master)](https://travis-ci.org/Martturi/cv_master)

CV management system

Master branch auto-deploys to <a href="http://cv-master.herokuapp.com">cv-master.herokuapp.com</a>

##  Heroku setup
Heroku should be provisioned with a postgres-database, and sets up the tables automatically when deployed to heroku.

```
heroku create
heroku addons:create heroku-postgresql:hobby-dev -a {app name}
heroku git:remote -a {app name}
cat SQL_table_creation.sql | heroku pg:psql -a {app name}
git push heroku
heroku open
```

By default the template-styling for pdf-generation is loaded to the database on dyno startup, according to the files in /server/pdf/. You can opt to disable this and update templates to the database manually by setting the env flag UPDATE_PDF_FROM_FS to 0.

### Config variables for heroku deployment
```
  // Needed for authentication
  AUTH_ID:  
  AUTH_SECRET:
  CLIENT_URL: https://cv-master.herokuapp.com //Where the client redirects after login
  ALLOWED_LOGIN_DOMAINS: gmail.com,domain.com //What email domains are allowed to login

  UPDATE_PDF_FROM_FS: 0 // Optional. If disabled does not update the pdf from the repository. Defaults to 1 if not present.
```

## Instructions to get the server running on macOS:

### 1. Install and Configure Postgres
   [More detail in this guide](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx)

   1. Get Homebrew

     /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

   2. Install Postgres

     brew install postgresql  

   3. Start the postgres server

     pg_ctl -D /usr/local/var/postgres start && brew services start postgresql


Configure the database. In the project directory run

     ./init_db.sh


### 2. Start server

  Make sure you have npm installed

#### Run the following commands:

    npm install
    npm run watch //This runs a both the react app and the server, and restarts them on changes.

#### Run local tests:

    npm test

<br/>
<br/>

## Detailed instructions to get the server running on a freshly installed Ubuntu 16.04:

#### 1. Install PostgreSQL (installs version 9.5 as of March 1, 2018):

    sudo apt-get update
#####    
    sudo apt-get install postgresql postgresql-contrib

#### 2. Create a PostgreSQL user (replace yourusername with your Ubuntu username):

    sudo -u postgres createuser -s yourusername

#### 3. Configure PostgreSQL to trust local IPv4 connections (replace 9.5 with your PostgreSQL version):

    sudo nano /etc/postgresql/9.5/main/pg_hba.conf

1. Scroll down the file and change IPv4 local connections METHOD from *_md5_* to *_trust_*.
2. Exit and save file.
3. Reload PostgreSQL configurations:  
#####
    sudo /etc/init.d/postgresql reload

#### 4. Install curl:

    sudo apt install curl

#### 5. Install Node.js (includes npm):

    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

#### 6. Install Git:

    sudo apt install git

#### 7. Clone this project:

    git clone https://github.com/Martturi/cv_master.git

#### 8. Change to project directory:

    cd cv_master

#### 9. Install required node modules:

    npm install

#### 10. Initialize database (WARNING: possible pre-existing databases 'cv_db' and 'cv_db_test' will be destroyed):

    ./init_db.sh

#### 11. Start the server:

     npm run watch
