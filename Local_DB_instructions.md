# Local Postgres database setup instructions

## 1. Install Postgres
[Follow this guide](https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx)
### Only do steps I, II, III:1-2

## 2. Setup database

Instructions work for MacOS, probably Linux.

  ### In terminal, enter commands: 
    cd cv_master
    psql postgres
    \i SQL_table_creation.sql

 Exit with ctrl+d



### Rename .env.example to .env in this folder

  cp .env.example .env
