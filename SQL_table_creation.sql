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
INSERT INTO users VALUES('timovi', 'Timo Virtanen');
INSERT INTO users VALUES('mattivi', 'Matti Virtanen');
INSERT INTO users VALUES('mattija', 'Matti Järvinen');
INSERT INTO users VALUES('karivi', 'Kari Virtanen');
INSERT INTO users VALUES('timoko', 'Timo Korhonen');
INSERT INTO users VALUES('timoma', 'Timo Mäkinen');
INSERT INTO users VALUES('juhako', 'Juha Korhonen');
INSERT INTO users VALUES('mattiko', 'Matti Korhonen');
INSERT INTO users VALUES('mattima', 'Matti Mäkelä');
INSERT INTO users VALUES('kariko', 'Kari Korhonen');
INSERT INTO users VALUES('mikkovi', 'Mikko Virtanen');
INSERT INTO users VALUES('mattimak', 'Matti Mäkinen');
INSERT INTO users VALUES('karini', 'Kari Nieminen');
INSERT INTO users VALUES('mattini', 'Matti Nieminen');
INSERT INTO users VALUES('jarivi', 'Jari Virtanen');
INSERT INTO users VALUES('makelmi', 'Mikko Mäkelä');
INSERT INTO users VALUES('markkuvi', 'Markku Virtanen');
INSERT INTO users VALUES('jukkavi', 'Jukka Virtanen');
INSERT INTO users VALUES('karikos', 'Kari Koskinen');
INSERT INTO users VALUES('juhani', 'Juha Nieminen');
INSERT INTO users VALUES('mattiha', 'Matti Hämäläinen');
INSERT INTO users VALUES('hannuko', 'Hannu Korhonen');
INSERT INTO users VALUES('timoni', 'Timo Nieminen');
INSERT INTO users VALUES('markkuma', 'Markku Mäkinen');
INSERT INTO users VALUES('kariha', 'Kari Hämäläinen');
INSERT INTO users VALUES('timomak', 'Timo Mäkelä');
INSERT INTO users VALUES('juhama', 'Juha Mäkelä'); 
INSERT INTO users VALUES('karila', 'Kari Laine');
INSERT INTO users VALUES('timola', 'Timo Laine');
INSERT INTO users VALUES('mattile', 'Matti Lehtinen');
INSERT INTO users VALUES('mikkoma', 'Mikko Mäkinen');
INSERT INTO users VALUES('mattihe', 'Matti Heikkinen');
INSERT INTO users VALUES('pekkako', 'Pekka Korhonen');
INSERT INTO users VALUES('juhavi', 'Juha Virtanen');
INSERT INTO users VALUES('juhaha', 'Juha Hämäläinen');
INSERT INTO users VALUES('markkumake', 'Markku Mäkelä');
INSERT INTO users VALUES('timole', 'Timo Lehtonen');
INSERT INTO users VALUES('mikkoni', 'Mikko Nieminen');
INSERT INTO users VALUES('markkuni', 'Markku Nieminen');
INSERT INTO users VALUES('seppoko', 'Seppo Korhonen');
INSERT INTO users VALUES('jariko', 'Jari Korhonen');
INSERT INTO users VALUES('jarini', 'Jari Nieminen');
INSERT INTO users VALUES('sepponi', 'Seppo Nieminen');
INSERT INTO users VALUES('jarima', 'Jari Mäkinen');
INSERT INTO users VALUES('seppovi', 'Seppo Virtanen');
INSERT INTO users VALUES('jukkama', 'Jukka Mäkelä');
INSERT INTO users VALUES('anttima', 'Antti Mäkinen');
INSERT INTO users VALUES('pekkavi', 'Pekka Virtanen');
INSERT INTO users VALUES('jukkako', 'Jukka Korhonen');
INSERT INTO users VALUES('karima', 'Kari Mäkinen');
INSERT INTO users VALUES('mattinie', 'Matti Niemi');
INSERT INTO users VALUES('mikkoko', 'Mikko Korhonen');
INSERT INTO users VALUES('anttimak', 'Antti Mäkelä');
INSERT INTO users VALUES('timokos', 'Timo Koskinen');
INSERT INTO users VALUES('jariha', 'Jari Hämäläinen');
INSERT INTO users VALUES('mikani', 'Mika Nieminen');
INSERT INTO users VALUES('jukkani', 'Jukka Nieminen');
INSERT INTO users VALUES('timoja', 'Timo Järvinen');
INSERT INTO users VALUES('timoha', 'Timo HämäläineV');
INSERT INTO users VALUES('anttiko', 'Antti Korhonen');
INSERT INTO users VALUES('markkuko', 'Markku Korhonen');
INSERT INTO users VALUES('mikkokos', 'Mikko Koskinen');
INSERT INTO users VALUES('juhaja', 'Juha Järvinen');
INSERT INTO users VALUES('anttivi', 'Antti Virtanen');
INSERT INTO users VALUES('juhahe', 'Juha Heikkinen');
INSERT INTO users VALUES('timohe', 'Timo Heikkinen');
INSERT INTO users VALUES('timosa', 'Timo Salminen');
INSERT INTO users VALUES('karile', 'Kari Lehtonen');
INSERT INTO users VALUES('mattikos', 'Matti Koskinen');
INSERT INTO users VALUES('ritvavi', 'Ritva Virtanen');
INSERT INTO users VALUES('villevi', 'Ville Virtanen');
INSERT INTO users VALUES('jarimak', 'Jari Mäkelä');
INSERT INTO users VALUES('juhakos', 'Juha Koskinen');
INSERT INTO users VALUES('mattihei', 'Matti Heikkilä');
INSERT INTO users VALUES('juhala', 'Juha Laine');
INSERT INTO users VALUES('timora', 'Timo Rantanen');
INSERT INTO users VALUES('anttini', 'Antti Nieminen');
INSERT INTO users VALUES('timotu', 'Timo Tuominen');
INSERT INTO users VALUES('hannuvi', 'Hannu Virtanen');
INSERT INTO users VALUES('jarila', 'Jari Laine');
INSERT INTO users VALUES('pekkama', 'Pekka Mäkelä');
INSERT INTO users VALUES('timohei', 'Timo Heikkilä');
INSERT INTO users VALUES('jukkamak', 'Jukka Mäkinen');
INSERT INTO users VALUES('mattileh', 'Matti Lehtonen');
INSERT INTO users VALUES('mattitu', 'Matti Turunen');
INSERT INTO users VALUES('mattisa', 'Matti Salminen');
INSERT INTO users VALUES('markkukos', 'Markku Koskinen');
INSERT INTO users VALUES('karileh', 'Kari Lehtinen');
INSERT INTO users VALUES('pirkkovi', 'Pirkko Virtanen');
INSERT INTO users VALUES('jarija', 'Jari Järvinen');
INSERT INTO users VALUES('tuulani', 'Tuula Nieminen');
INSERT INTO users VALUES('mikavi', 'Mika Virtanen');
INSERT INTO users VALUES('timosal', 'Timo Salonen');
INSERT INTO users VALUES('hannuma', 'Hannu Mäkelä');
INSERT INTO users VALUES('anttiha', 'Antti Hämäläinen');
INSERT INTO users VALUES('jarileh', 'Jari Lehtonen');
INSERT INTO users VALUES('anttihe', 'Antti Heikkilä');
INSERT INTO users VALUES('jukkale', 'Jukka Lehtinen');
INSERT INTO users VALUES('pekkamak', 'Pekka Mäkinen');
INSERT INTO users VALUES('jukkakos', 'Jukka Koskinen');


INSERT INTO cvs VALUES (DEFAULT, 'timovi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattivi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattija', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karivi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timoko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timoma', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhako', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattiko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattima', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'kariko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikkovi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattimak', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karini', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattini', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarivi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'makelmi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'markkuvi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkavi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karikos', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhani', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattiha', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'hannuko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timoni', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'markkuma', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'kariha', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timomak', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhama', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karila', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timola', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattile', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikkoma', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattihe', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'pekkako', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhavi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhaha', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'markkumake', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timole', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikkoni', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'markkuni', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'seppoko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jariko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarini', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'sepponi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarima', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'seppovi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkama', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttima', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'pekkavi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkako', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karima', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattinie', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikkoko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttimak', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timokos', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jariha', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikani', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkani', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timoja', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timoha', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttiko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'markkuko', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikkokos', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhaja', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttivi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhahe', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timohe', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timosa', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karile', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattikos', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'ritvavi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'villevi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarimak', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhakos', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattihei', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'juhala', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timora', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttini', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timotu', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'hannuvi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarila', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'pekkama', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timohei', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkamak', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattileh', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattitu', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mattisa', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'markkukos','cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'karileh', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'pirkkovi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarija', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'tuulani', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'mikavi', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'timosal', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'hannuma', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttiha', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jarileh', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'anttihe', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkale', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'pekkamak', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'jukkakos', 'cv', '2018-01-01 15:15:16+0');
INSERT INTO cvs VALUES (DEFAULT, 'korkkii', 'cv', '2018-01-01 15:15:16+0');


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
