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

CREATE TABLE Sections (
  username TEXT,
  cv_name TEXT,
  section_nr INTEGER,
  text TEXT,
  PRIMARY KEY (username, cv_name, section_nr)
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

INSERT INTO Sections VALUES ('korkkii', 'cv', 0, 'section 0 contents');
INSERT INTO Sections VALUES ('korkkii', 'cv', 1, 'section 1 contents');
INSERT INTO Sections VALUES ('korkkii', 'cv', 2, 'section 2 contents');
INSERT INTO Sections VALUES ('heikki', 'CV (not complete)', 0, 'Hello');
INSERT INTO Sections VALUES ('heikki', 'CV (not complete)', 1, 'Hey');
INSERT INTO Sections VALUES ('heikki', 'CV (not complete)', 2, 'Hi');
INSERT INTO Sections VALUES ('matti', 'CV 20.09.2015', 0, 'DEFAULT FIRST SECTION');
INSERT INTO Sections VALUES ('matti', 'CV 20.09.2015', 10, 'DEFAULT LAST SECTION');
INSERT INTO Sections VALUES ('matti', 'CV final version', 0, 'I know how to code...');
INSERT INTO Sections VALUES ('matti', 'CV final version', 10, '... NOT');
INSERT INTO Sections VALUES ('pikkumatti', 'Pikku-Matin CV', 0, 'cv cv');
INSERT INTO Sections VALUES ('pikkumatti', 'Pikku-Matin CV', 1, 'cv cv cv');
INSERT INTO Sections VALUES ('pikkumatti', 'Pikku-Matin CV', 2, 'cv cv cv cv');
INSERT INTO Sections VALUES ('pikkumatti', 'Pikku-Matin CV', 3, 'cv cv cv cv cv');
