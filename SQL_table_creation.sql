DROP DATABASE cv_db;
CREATE DATABASE cv_db;

\c cv_db
CREATE TABLE   "public"."cv_table" (
      "id" text,
      "text" text,
      PRIMARY KEY ("id")
);
INSERT INTO   "public"."cv_table"("id", "text")   VALUES('0', 'DEFAULT CV') RETURNING "id", "text";
