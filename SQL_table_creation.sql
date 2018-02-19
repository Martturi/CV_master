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
  fin_template TEXT,
  eng_template TEXT,
  section_order INTEGER
);

CREATE TABLE section_data (
  cv_id INTEGER REFERENCES cvs(cv_id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES cv_sections(section_id) ON DELETE CASCADE,
  text TEXT,
	PRIMARY KEY (cv_id, section_id)
);

CREATE INDEX cv_id_idx ON section_data (cv_id);

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
('juhahe', 'Juha Heikkinen'),
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
('jukkakos', 'Jukka Koskinen'),
('defaultUser', 'Default User');


INSERT INTO cvs VALUES (DEFAULT, 'timovi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattivi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattija', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karivi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoma', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhako', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattiko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattima', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'kariko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkovi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattimak', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karini', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattini', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarivi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'makelmi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuvi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkavi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karikos', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhani', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattiha', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'hannuko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoni', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuma', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'kariha', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timomak', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhama', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karila', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timola', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattile', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkoma', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattihe', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkako', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhavi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhaha', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkumake', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timole', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkoni', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuni', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'seppoko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jariko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarini', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'sepponi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarima', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'seppovi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkama', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttima', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkavi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkako', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karima', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattinie', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkoko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttimak', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timokos', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jariha', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikani', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkani', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoja', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timoha', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttiko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkuko', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikkokos', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhaja', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttivi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhahe', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timohe', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timosa', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karile', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattikos', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'ritvavi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'villevi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarimak', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhakos', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattihei', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'juhala', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timora', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttini', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timotu', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'hannuvi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarila', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkama', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timohei', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkamak', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattileh', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattitu', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mattisa', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'markkukos','cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'karileh', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'pirkkovi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarija', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'tuulani', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'mikavi', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'timosal', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'hannuma', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttiha', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jarileh', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'anttihe', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkale', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'pekkamak', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'jukkakos', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'korkkii', 'cv', '2018-01-01 15:15:16+0'),
(DEFAULT, 'defaultUser', 'cv', '2018-01-01 15:15:16+0');


INSERT INTO cv_sections VALUES (DEFAULT, '', '', '',
'###Master of Science


######Senior Software Architect
The idea is that the bio is a summary of Heikki and the reader gets a good grip of Heikki and his talents only by reading this (some might not read further). You can write e.g. about: relevant industries with special experience, certificates, systems/languages/tools/etc. with special experience. Heikki is an extremely experienced senior software architect who designs functional and successful digital services. He is an experienced specialist of user-driven research and design methods, whose work is always based on determining the actual use and needs of the users. Heikki’s special skills also include conceptualising and user testing. Furthermore, Heikki is also a certified Scrum Master. Heikki has a lot of experience of development projects especially in finance and insurance sectors and his customers include e.g. OP-Pohjola, Luottokunta, DNA, and RAY. For example, he has designed the user interfaces of RAY’s Loyal Customers and Online Casino services.'
, 0);

INSERT INTO cv_sections VALUES (DEFAULT, 'TYÖKOKEMUS', 'WORK EXPERIENCE', '',
'#**Reaktor Innovations Oy, 1/2013-**
###Senior Software Architect


This space is reserved for some general information about Heikki’s Reaktor work experience. Heikki has been involved in various projects at Reaktor and played a significant role in creating solutions for customers, for example in relation to web services. Heikki’s tasks include software architecture, user interface design, and conceptualising, for example.


Projects include:


##**OP-Pohjola, VendorWeb, 6/2015-**
###Senior Software Architect
What was done? What is the big picture? What did Heikki do or be responsible for? Something else important? Reaktor has been developing OP’s web services. In the project in question, a new application for OP’s public web page was developed. In the application a person interested in investment activities can provide information related to his/her knowledge, as required by the legislation. Heikki’s tasks included e.g. programming, interface and database design, integrations, testing, specifications as well as user interface and architecture design. The application has received a lot of positive attention and it has X monthly unique users.
> Keywords: xxx, xxx, xxx (technologies, methods, tools, operation systems... Cross check with the last section “knowledge and experience of”)


##**Luottokunta, Transaction management system, 8/2014-5/2015**
###Senior UI Designer
Heikki was involved in a project, in which Luottokunta’s critical system for transaction monitoring and management was renewed and developed. Heikki’s responsibility was user interface design and his tasks included e.g. user interviews, use case descriptions, interaction design, and user testing. Heikki successfully acted as a Scrum Master.
> Keywords:


##**Slot Machine Association, Loyal Customers and Online Casino, 5/2013-5/2014**
###UI Designer
Reaktor is developing various RAY’s services and Heikki has been in a significant role as an UI designer in a number of these services. He did, for example, concept design and user interface design for Loyal Customers feature visible in the slot machines, critical internal information systems, as well as features dealing with money at Online Casino on ray.fi. His duties included e.g. desinging, testing, and documentation.<br>
Online Casino: www.ray.fi/en<br>
Loyal Customer: www.ray.fi/en/etuasiakas
> Keywords:


##**Reaktor R&D, Hours, 1-4/2013**
Hours is a Java based software for working time tracking. Development process also included some Scala. Heikki was responsible for the architecture and UI design of the application. Agile methods, such as Kanban, were used in the development process.
>Keywords:'
, 100);

INSERT INTO cv_sections VALUES (DEFAULT, 'AIKAISEMPI TYÖKOKEMUS', 'PREVIOUS EMPLOYMENT', '', '', 200);
INSERT INTO cv_sections VALUES (DEFAULT, 'KOULUTUS', 'EDUCATION', '', '', 300);
INSERT INTO cv_sections VALUES (DEFAULT, 'SERTIFIKAATIT', 'CERTIFICATES', '', '', 400);
INSERT INTO cv_sections VALUES (DEFAULT, 'KIELITAITO', 'LANGUAGE SKILLS', '', '', 500);
INSERT INTO cv_sections VALUES (DEFAULT, 'PALKINNOT', 'AWARDS', '', '', 600);
INSERT INTO cv_sections VALUES (DEFAULT, 'JULKAISUT', 'PUBLICATIONS', '', '', 700);
INSERT INTO cv_sections VALUES (DEFAULT, 'KONFERENSSIT', 'CONFERENCES', '', '', 800);
INSERT INTO cv_sections VALUES (DEFAULT, 'HARRASTUNEISUUS', 'OTHER ACTIVITIES', '', '', 900);
INSERT INTO cv_sections VALUES (DEFAULT, 'OSAAMINEN', 'ESSENTIAL SKILLS', '', '', 1000);
