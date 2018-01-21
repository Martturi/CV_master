CREATE TABLE   "public"."cv_table" (
      "id" text,
      "text" text,
      PRIMARY KEY ("id")
);

CREATE TABLE   "public"."cvs" (
      "username" text,
      "cv_name" text,
      "text" text,
      PRIMARY KEY ("username", "cv_name")
);

INSERT INTO "public"."cv_table"("id", "text") VALUES('0', 'DEFAULT CV') RETURNING "id", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('user', 'cv', 'cv contents') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('Heikki Heikalainen', 'CV (not complete)', 'Hello') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('Matti Meikalainen', 'CV 20.09.2015', 'DEFAULT CV') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('Matti Meikalainen', 'CV final version', 'I know how to code') RETURNING "username", "cv_name", "text";
