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

INSERT INTO cv_table VALUES (1, 'user1', 'introduction1', 'esittely1');
