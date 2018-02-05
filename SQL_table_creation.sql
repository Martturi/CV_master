CREATE TABLE   "public"."cvs" (
      "username" text,
      "cv_name" text,
      "text" text,
      PRIMARY KEY ("username", "cv_name")
);

CREATE TABLE "public"."users" (
	  "username" text,
	  "full_name" text,
	  PRIMARY KEY ("username")
);

INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('korkkii', 'cv', 'cv contents') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('heikki', 'CV (not complete)', 'Hello') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('matti', 'CV 20.09.2015', 'DEFAULT CV') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text") VALUES('matti', 'CV final version', 'I know how to code') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text") VALUES('pikkumatti', 'Pikku-Matin CV', 'cv cv') RETURNING "username", "cv_name", "text";

INSERT INTO   "public"."users"("username", "full_name")   VALUES('korkkii', 'Henri Korhonen') RETURNING "username", "full_name";
INSERT INTO   "public"."users"("username", "full_name")   VALUES('heikki', 'Heikki Heikalainen') RETURNING "username", "full_name";
INSERT INTO   "public"."users"("username", "full_name")   VALUES('matti', 'Matti Meikalainen') RETURNING "username", "full_name";
INSERT INTO   "public"."users"("username", "full_name")   VALUES('pikkumatti', 'Matti Meikalainen') RETURNING "username", "full_name";
