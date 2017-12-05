DROP DATABASE CV_DB;

DROP TABLE "public"."cv_table";

CREATE DATABASE CV_DB;

CREATE TABLE   "public"."cv_table" (
      "id" serial,
      "text" text,
      PRIMARY KEY ("id")
);
INSERT INTO   "public"."cv_table"("id", "text")   VALUES(0, 'DEFAULT CV') RETURNING "id", "text";
