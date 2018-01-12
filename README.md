# CV_master
[![Build Status](https://travis-ci.org/Martturi/cv_master.svg?branch=master)](https://travis-ci.org/Martturi/cv_master)

CV management system

Master branch auto-deploys to <a href="http://cv-master.herokuapp.com">cv-master.herokuapp.com</a>


## Instructions to get the server running on your local machine:

### 1. Install and Configure Postgres
   [More detail in this guide](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx)

#### Mac:

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
