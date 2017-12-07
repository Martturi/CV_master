DROP DATABASE CV_DB;

CREATE DATABASE CV_DB;

\connect cv_db;

CREATE TABLE cv_table (
      "cv_nr" serial PRIMARY KEY,
      "username" text,
      "eng_introduction" text,
      "fin_introduction" text
);

CREATE TABLE sections (
      "cv_nr" serial,
      "section_nr" serial,
      "eng_body" text,
      "fin_body" text,
      PRIMARY KEY ("cv_nr", "section_nr")
);

CREATE TABLE projects (
      "cv_nr" serial,
      "project_nr" serial,
      "company_name" text,
      "eng_title" text,
      "fin_title" text,
      PRIMARY KEY ("cv_nr", "project_nr")
);

CREATE TABLE employees (
      "username" text PRIMARY KEY,
      "name" text,
      "photo" bytea,
      "eng_title" text,
      "fin_title" text
);

CREATE TABLE companies (
      "company_name" text PRIMARY KEY,
      "logo" bytea
);

CREATE TABLE section_headers (
       "section_nr" serial PRIMARY KEY,
       "eng_header" text,
       "fin_header" text
);

INSERT INTO cv_table VALUES (1, 'user1', 'introduction1', 'esittely1');

INSERT INTO sections VALUES (1, 1, 'Some text in English', 'Suomenkielistä tekstiä');
