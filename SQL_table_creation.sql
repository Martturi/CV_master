CREATE TABLE   "public"."cv_table" (
      "id" text,
      "text" text,
      PRIMARY KEY ("id")
);
INSERT INTO   "public"."cv_table"("id", "text")   VALUES('0', 'DEFAULT CV') RETURNING "id", "text";

CREATE TABLE   "public"."cvs" (
      "username" text,
      "cv_name" text,
      "text" text,
      PRIMARY KEY ("username", "cv_name")
);

INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('user', 'cv', 'cv contents') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('Heikki Heikalainen', 'CV (not complete)', 'Hello') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text")   VALUES('Matti Meikalainen', 'CV 20.09.2015', 'DEFAULT CV') RETURNING "username", "cv_name", "text";
INSERT INTO   "public"."cvs"("username", "cv_name", "text") VALUES('Matti Meikalainen', 'CV final version', 'I know how to code') RETURNING "username", "cv_name", "text";

CREATE OR REPLACE FUNCTION copy_cv(uname TEXT, cvName TEXT)
RETURNS TEXT AS $$
DECLARE
    n INTEGER := 1;
    newCVName TEXT := '';
    cvContents TEXT := (SELECT text FROM cvs WHERE username = uname AND cv_name = cvName);
BEGIN
    LOOP
        newCVName := concat(cvName, '(', n::text, ')');
        EXIT WHEN NOT EXISTS (SELECT cv_name FROM cvs WHERE username = uname AND cv_name = newCVName);
        n := n + 1;
    END LOOP;
    INSERT INTO cvs VALUES (uname, newCVName, cvContents);
    RETURN newCVName;
END;
$$ LANGUAGE plpgsql;
