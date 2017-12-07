DROP DATABASE CV_DB;

CREATE DATABASE CV_DB;

\connect cv_db;

CREATE TABLE cv_table (
      "cv_nr" serial,
      "username" text,
      "eng_introduction" text,
      "fin_introduction" text,
      PRIMARY KEY ("cv_nr")
);

CREATE TABLE cv_sections (
      "cv_nr" serial,
      "section_nr" serial,
      "eng_body" text,
      "fin_body" text,
      PRIMARY KEY ("cv_nr", "section_nr")
);

INSERT INTO cv_table VALUES (1, 'user1', 'introduction1', 'esittely1');

INSERT INTO cv_sections VALUES (1, 1, 'Some text in Eglish', 'Suomenkielistä tekstiä');
