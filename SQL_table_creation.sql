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

INSERT INTO section_data VALUES (2, 1,
'###Master of Science


######Senior Software Architect
The idea is that the bio is a summary of Heikki and the reader gets a good grip of Heikki and his talents only by reading this (some might not read further). You can write e.g. about: relevant industries with special experience, certificates, systems/languages/tools/etc. with special experience. Heikki is an extremely experienced senior software architect who designs functional and successful digital services. He is an experienced specialist of user-driven research and design methods, whose work is always based on determining the actual use and needs of the users. Heikki’s special skills also include conceptualising and user testing. Furthermore, Heikki is also a certified Scrum Master. Heikki has a lot of experience of development projects especially in finance and insurance sectors and his customers include e.g. OP-Pohjola, Luottokunta, DNA, and RAY. For example, he has designed the user interfaces of RAY’s Loyal Customers and Online Casino services.'
);

INSERT INTO section_data VALUES (2, 2,
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
);
