CREATE TABLE users (
  username TEXT PRIMARY KEY,
  full_name TEXT
);

CREATE TABLE languages (
  language_id SERIAL PRIMARY KEY,
  language_name TEXT
);

CREATE TABLE cvs (
  cv_id SERIAL PRIMARY KEY,
  username TEXT REFERENCES users(username) ON DELETE CASCADE,
  cv_name TEXT,
  language_id INTEGER REFERENCES languages(language_id),
  last_updated TIMESTAMP WITH TIME ZONE
);

CREATE INDEX username_idx ON cvs (username);

CREATE TABLE cv_sections (
  section_id INTEGER,
  language_id INTEGER REFERENCES languages(language_id),
  title TEXT,
  template TEXT,
  section_order INTEGER,
  PRIMARY KEY (section_id, language_id)
);

CREATE TABLE section_data (
  cv_id INTEGER REFERENCES cvs(cv_id) ON DELETE CASCADE,
  section_id INTEGER,
  text TEXT,
	PRIMARY KEY (cv_id, section_id)
);

CREATE INDEX cv_id_idx ON section_data (cv_id);

CREATE TABLE assets (
	filename TEXT PRIMARY KEY,
	filetype TEXT,
  base64 BOOLEAN,
	contents TEXT,
  last_updated TIMESTAMP WITH TIME ZONE
);

INSERT INTO users VALUES('korkkii', 'Henri Korhonen'),
('timovi', 'Timo Virtanen'),
('mattivi', 'Matti Virtanen'),
('mattija', 'Matti Järvinen'),
('karivi', 'Kari Virtanen'),
('timoko', 'Timo Korhonen'),
('timoma', 'Timo Mäkinen'),
('juhako', 'Juha Korhonen'),
('mattiko', 'Matti Korhonen'),
('mattima', 'Matti Mäkelä'),
('kariko', 'Kari Korhonen'),
('mikkovi', 'Mikko Virtanen'),
('mattimak', 'Matti Mäkinen'),
('karini', 'Kari Nieminen'),
('mattini', 'Matti Nieminen'),
('jarivi', 'Jari Virtanen'),
('makelmi', 'Mikko Mäkelä'),
('markkuvi', 'Markku Virtanen'),
('jukkavi', 'Jukka Virtanen'),
('karikos', 'Kari Koskinen'),
('juhani', 'Juha Nieminen'),
('mattiha', 'Matti Hämäläinen'),
('hannuko', 'Hannu Korhonen'),
('timoni', 'Timo Nieminen'),
('markkuma', 'Markku Mäkinen'),
('kariha', 'Kari Hämäläinen'),
('timomak', 'Timo Mäkelä'),
('juhama', 'Juha Mäkelä'),
('karila', 'Kari Laine'),
('timola', 'Timo Laine'),
('mattile', 'Matti Lehtinen'),
('mikkoma', 'Mikko Mäkinen'),
('mattihe', 'Matti Heikkinen'),
('pekkako', 'Pekka Korhonen'),
('juhavi', 'Juha Virtanen'),
('juhaha', 'Juha Hämäläinen'),
('markkumake', 'Markku Mäkelä'),
('timole', 'Timo Lehtonen'),
('mikkoni', 'Mikko Nieminen'),
('markkuni', 'Markku Nieminen'),
('seppoko', 'Seppo Korhonen'),
('jariko', 'Jari Korhonen'),
('jarini', 'Jari Nieminen'),
('sepponi', 'Seppo Nieminen'),
('jarima', 'Jari Mäkinen'),
('seppovi', 'Seppo Virtanen'),
('jukkama', 'Jukka Mäkelä'),
('anttima', 'Antti Mäkinen'),
('pekkavi', 'Pekka Virtanen'),
('jukkako', 'Jukka Korhonen'),
('karima', 'Kari Mäkinen'),
('mattinie', 'Matti Niemi'),
('mikkoko', 'Mikko Korhonen'),
('anttimak', 'Antti Mäkelä'),
('timokos', 'Timo Koskinen'),
('jariha', 'Jari Hämäläinen'),
('mikani', 'Mika Nieminen'),
('jukkani', 'Jukka Nieminen'),
('timoja', 'Timo Järvinen'),
('timoha', 'Timo Hämäläinen'),
('anttiko', 'Antti Korhonen'),
('markkuko', 'Markku Korhonen'),
('mikkokos', 'Mikko Koskinen'),
('juhaja', 'Juha Järvinen'),
('anttivi', 'Antti Virtanen'),
('timohe', 'Timo Heikkinen'),
('timosa', 'Timo Salminen'),
('karile', 'Kari Lehtonen'),
('mattikos', 'Matti Koskinen'),
('ritvavi', 'Ritva Virtanen'),
('villevi', 'Ville Virtanen'),
('jarimak', 'Jari Mäkelä'),
('juhakos', 'Juha Koskinen'),
('mattihei', 'Matti Heikkilä'),
('juhala', 'Juha Laine'),
('timora', 'Timo Rantanen'),
('anttini', 'Antti Nieminen'),
('timotu', 'Timo Tuominen'),
('hannuvi', 'Hannu Virtanen'),
('jarila', 'Jari Laine'),
('pekkama', 'Pekka Mäkelä'),
('timohei', 'Timo Heikkilä'),
('jukkamak', 'Jukka Mäkinen'),
('mattileh', 'Matti Lehtonen'),
('mattitu', 'Matti Turunen'),
('mattisa', 'Matti Salminen'),
('markkukos', 'Markku Koskinen'),
('karileh', 'Kari Lehtinen'),
('pirkkovi', 'Pirkko Virtanen'),
('jarija', 'Jari Järvinen'),
('tuulani', 'Tuula Nieminen'),
('mikavi', 'Mika Virtanen'),
('timosal', 'Timo Salonen'),
('hannuma', 'Hannu Mäkelä'),
('anttiha', 'Antti Hämäläinen'),
('jarileh', 'Jari Lehtonen'),
('anttihe', 'Antti Heikkilä'),
('jukkale', 'Jukka Lehtinen'),
('pekkamak', 'Pekka Mäkinen'),
('jukkakos', 'Jukka Koskinen');

INSERT INTO languages VALUES
  (DEFAULT, 'English'),
  (DEFAULT, 'suomi');

INSERT INTO cvs VALUES (DEFAULT, 'timovi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattivi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattija', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karivi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoma', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhako', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattiko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattima', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'kariko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkovi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattimak', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karini', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattini', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarivi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'makelmi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuvi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkavi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karikos', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhani', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattiha', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'hannuko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoni', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuma', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'kariha', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timomak', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhama', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karila', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timola', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattile', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkoma', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattihe', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkako', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhavi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhaha', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkumake', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timole', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkoni', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuni', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'seppoko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jariko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarini', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'sepponi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarima', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'seppovi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkama', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttima', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkavi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkako', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karima', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattinie', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkoko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttimak', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timokos', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jariha', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikani', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkani', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoja', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoha', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttiko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuko', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkokos', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhaja', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttivi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timohe', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timosa', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karile', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattikos', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'ritvavi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'villevi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarimak', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhakos', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattihei', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhala', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timora', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttini', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timotu', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'hannuvi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarila', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkama', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timohei', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkamak', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattileh', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattitu', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattisa', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkukos','cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'karileh', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'pirkkovi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarija', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'tuulani', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikavi', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'timosal', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'hannuma', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttiha', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarileh', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttihe', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkale', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkamak', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkakos', 'cv', 1, '2018-01-01 15:15:16+0'),
(DEFAULT, 'korkkii', 'cv', 1, '2018-01-01 15:15:16+0');


INSERT INTO cv_sections VALUES (1, 1, 'INTRODUCTION',
'######Degree


##Job title
```
This bio is a summary that gives the reader a general understanding of you and your talents. Some might not read further, so make sure to include enough information about yourself. You can write e.g. about: relevant industries with special experience, certificates, systems/languages/tools/etc. with special experience.
```
'
, 0);



INSERT INTO cv_sections VALUES (2, 1, 'WORK EXPERIENCE',
'####Current company, XX/20XX-
######Job title


This space is reserved for some general information about your work experience at your current company.


Projects include:


#####Company X, Name of the project, XX/20XX-XX/20XX
######Job title
What was done? What is the big picture? What did you do or be responsible for? Something else important?
> Keywords: xxx, xxx, xxx'
, 100);



INSERT INTO cv_sections VALUES (3, 1, 'PREVIOUS EMPLOYMENT',
'####Company A, XX/20XX-XX/20XX
######Job title
Summary of position, responsibilities, projects etc.
> Keywords: xxx, xxx, xxx


Projects include:


#####Company Y, Role in project, XX/20XX-XX/20XX

- Description of role, project, etc.
- Keywords: xxx, xxx, xxx


#####Company Z, Role in project, XX/20XX-XX/20XX

- Description of role, project, etc.
- Keywords: xxx, xxx, xxx'
, 200);



INSERT INTO cv_sections VALUES (4, 1, 'EDUCATION',
'####Degree, University, 20XX-20XX
Degree Programme

Major: xxx

Minor: xxx

Master’s thesis: xxx'
, 300);



INSERT INTO cv_sections VALUES (5, 1, 'CERTIFICATES',
'Certificate, Month 20XX

Certificate, Month 20XX'
, 400);



INSERT INTO cv_sections VALUES (6, 1, 'LANGUAGE SKILLS',
'Language 1 - skill level

Language 2 - skill level'
, 500);



INSERT INTO cv_sections VALUES (7, 1, 'AWARDS',
'Award, Month 20XX

Award, Month 20XX'
, 600);



INSERT INTO cv_sections VALUES (8, 1, 'PUBLICATIONS',
'Article: Writer(s), 20XX, Article name, Journal name, Page numbers

Book: Writer(s), 20XX, Book name, Publisher, ISBN

Patent: Creator(s), 20XX, Patent name, EU patent number, US patent number'
, 700);



INSERT INTO cv_sections VALUES (9, 1, 'CONFERENCES',
'20XX Name of the Conference, City, Country, speaker/participant

20XX Name of the Conference, City, Country, speaker/participant'
, 800);



INSERT INTO cv_sections VALUES (10, 1, 'OTHER ACTIVITIES',
'- GitHub/Bitbucket: www.xxxx.fi
- Portfolio: www.xxxx.fi',
900);



INSERT INTO cv_sections VALUES (11, 1, 'ESSENTIAL SKILLS',
'- Concrete, higher level skills and areas of knowledge are listed here (cross-check with bio)
- Long experience in xxx


####Knowledge and experience of:

- Specific technologies are listed here under various categories, no sentences
- ** Programming languages **: xxx, xxx, xxx'
, 1000);



INSERT INTO cv_sections VALUES
(1, 2, 'ESITTELY',
'######Tutkinto


##Tehtävänimike
```
Tarkoituksena on, että lukija saa jo pelkästään bion lukemalla hyvän käsityksen huippiksesta ja hänen osaamisestaan (kaikki eivät edes lue pidemmälle). Tähän voi kirjoittaa esimerkiksi seuraavista aiheista: toimialat, joista erityistä kokemusta, sertifikaatit, käyttöjärjestelmät/kielet/työkalut/ ym., joista erityistä kokemusta.
```'
, 0),
(2, 2, 'TYÖKOKEMUS',
'####Nykyinen työpaikka, XX/20XX-
######Tehtävänimike


Tähän voi kirjoittaa jotain yleistä työkokemuksesta tämän hetkisessä työpaikassa.


Esimerkkejä projekteista:


#####Yritys X, Projektin nimi, XX/20XX-XX/20XX
######Tehtävänimike
Mitä tehtiin? Mihin liittyi/kokonaiskuva? Mitä teit/olit vastuussa? Lopputulokset? Jotain muuta tärkeää?
> Avainsanat: xxx, xxx, xxx'
, 100),
(3, 2, 'AIKAISEMPI TYÖKOKEMUS',
'####Yritys A, XX/20XX-XX/20XX
######Tehtävänimike
Yhteenveto, vastuualueet, projektit jne.
> Avainsanat: xxx, xxx, xxx


Esimerkkejä projekteista:


#####Yritys Y, Rooli projektissa, XX/20XX-XX/20XX

• Kuvaus roolista, projektista, jne.

• Avainsanat: xxx, xxx, xxx


#####Yritys Z, Rooli projektissa, XX/20XX-XX/20XX

• Kuvaus roolista, projektista, jne.

• Avainsanat: xxx, xxx, xxx'
, 200),
(4, 2, 'KOULUTUS',
'####Tutkinto, Yliopisto, 20XX-20XX
Tutkinto-ohjelma

Pääaine: xxx

Sivuaine: xxx

Diplomityö: xxx'
, 300),
(5, 2, 'SERTIFIKAATIT', '', 400),
(6, 2, 'KIELITAITO', '', 500),
(7, 2, 'PALKINNOT', '', 600),
(8, 2, 'JULKAISUT', '', 700),
(9, 2, 'KONFERENSSIT', '', 800),
(10, 2, 'HARRASTUNEISUUS', '', 900),
(11, 2, 'OSAAMINEN', '', 1000);
