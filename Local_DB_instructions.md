# Local Postgres database setup instructions

## 1. Install Postgres
[Follow this guide](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx)
### Only do steps I, II, III:1-2

## 2. Setup database
Instructions work for MacOS, probably Linux.

  ### Open the database interface. In terminal:
    psql postgres

  ### Create database and table. Enter commands:

    CREATE DATABASE CV_DB;  
    \connect cv_db  
    CREATE TABLE   "public"."cv_table" (  
      "id" serial,  
      "text" text,  
      PRIMARY KEY ("id")  
    );  
    INSERT INTO   "public"."cv_table"("id", "text")   VALUES(0, 'DEFAULT CV') RETURNING "id", "text";

 Exit with ctrl+d

### Rename .env.example to .env in this folder

  cp .env.example .env

