CREATE TABLE users (
	  username TEXT PRIMARY KEY,
	  full_name TEXT
);

CREATE TABLE cvs (
  cv_id SERIAL PRIMARY KEY,
  username TEXT REFERENCES users(username) ON DELETE CASCADE,
  cv_name TEXT,
  last_updated TIMESTAMP WITH TIME ZONE
);

CREATE INDEX username_idx ON cvs (username);

CREATE TABLE cv_sections (
  section_id SERIAL PRIMARY KEY,
  fin_title TEXT,
  eng_title TEXT,
  section_order INTEGER
);

CREATE TABLE section_data (
  cv_id INTEGER REFERENCES cvs(cv_id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES cv_sections(section_id) ON DELETE CASCADE,
  text TEXT,
	PRIMARY KEY (cv_id, section_id)
);

CREATE INDEX cv_id_idx ON section_data (cv_id);

INSERT INTO users VALUES('korkkii', 'Henri Korhonen');
INSERT INTO users VALUES('heikki', 'Heikki Heikalainen');
INSERT INTO users VALUES('matti', 'Matti Meikalainen');
INSERT INTO users VALUES('pikkumatti', 'Matti Meikalainen');

INSERT INTO cvs VALUES (DEFAULT, 'korkkii', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'heikki', 'CV (not complete)', '2018-01-15 11:08:12+0');
INSERT INTO cvs VALUES (DEFAULT, 'matti', 'CV 20.09.2015', '2015-09-20 22:53:46+0');
INSERT INTO cvs VALUES (DEFAULT, 'matti', 'CV final version', '2015-09-27 07:58:06+0');
INSERT INTO cvs VALUES (DEFAULT, 'pikkumatti', 'Pikku-Matin CV', '2017-12-27 17:00:22+0');

INSERT INTO cv_sections VALUES (DEFAULT, '', '', 0);
INSERT INTO cv_sections VALUES (DEFAULT, 'TYÖKOKEMUS', 'WORK EXPERIENCE', 100);
INSERT INTO cv_sections VALUES (DEFAULT, 'AIKAISEMPI TYÖKOKEMUS', 'PREVIOUS EMPLOYMENT', 200);
INSERT INTO cv_sections VALUES (DEFAULT, 'KOULUTUS', 'EDUCATION', 300);
INSERT INTO cv_sections VALUES (DEFAULT, 'SERTIFIKAATIT', 'CERTIFICATES', 400);
INSERT INTO cv_sections VALUES (DEFAULT, 'KIELITAITO', 'LANGUAGE SKILLS', 500);
INSERT INTO cv_sections VALUES (DEFAULT, 'PALKINNOT', 'AWARDS', 600);
INSERT INTO cv_sections VALUES (DEFAULT, 'JULKAISUT', 'PUBLICATIONS', 700);
INSERT INTO cv_sections VALUES (DEFAULT, 'KONFERENSSIT', 'CONFERENCES', 800);
INSERT INTO cv_sections VALUES (DEFAULT, 'HARRASTUNEISUUS', 'OTHER ACTIVITIES', 900);
INSERT INTO cv_sections VALUES (DEFAULT, 'OSAAMINEN', 'ESSENTIAL SKILLS', 1000);
