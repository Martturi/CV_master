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
  text TEXT NOT NULL,
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
The idea is that the bio is a summary of Mikko and the reader gets a good grip of Mikko and his talents only by reading this (some might not read further). You can write e.g. about: relevant industries with special experience, certificates, systems/languages/tools/etc. with special experience. Mikko is an extremely experienced senior software architect who designs functional and successful digital services. He is an experienced specialist of user-driven research and design methods, whose work is always based on determining the actual use and needs of the users. Mikko’s special skills also include conceptualising and user testing. Furthermore, Mikko is also a certified Scrum Master. Mikko has a lot of experience of development projects especially in finance and insurance sectors and his customers include e.g. OP-Pohjola, Luottokunta, DNA, and RAY. For example, he has designed the user interfaces of RAY’s Loyal Customers and Online Casino services.'
, 0);



INSERT INTO cv_sections VALUES (DEFAULT, 'TYÖKOKEMUS', 'WORK EXPERIENCE', '',
'#**Reaktor Innovations Oy, 1/2013-**
###Senior Software Architect


This space is reserved for some general information about Mikko’s Reaktor work experience. Mikko has been involved in various projects at Reaktor and played a significant role in creating solutions for customers, for example in relation to web services. Mikko’s tasks include software architecture, user interface design, and conceptualising, for example.


Projects include:


##**OP-Pohjola, VendorWeb, 6/2015-**
###Senior Software Architect
What was done? What is the big picture? What did Mikko do or be responsible for? Something else important? Reaktor has been developing OP’s web services. In the project in question, a new application for OP’s public web page was developed. In the application a person interested in investment activities can provide information related to his/her knowledge, as required by the legislation. Mikko’s tasks included e.g. programming, interface and database design, integrations, testing, specifications as well as user interface and architecture design. The application has received a lot of positive attention and it has X monthly unique users.
> Keywords: xxx, xxx, xxx (technologies, methods, tools, operation systems... Cross check with the last section “knowledge and experience of”)


##**Luottokunta, Transaction management system, 8/2014-5/2015**
###Senior UI Designer
Mikko was involved in a project, in which Luottokunta’s critical system for transaction monitoring and management was renewed and developed. Mikko’s responsibility was user interface design and his tasks included e.g. user interviews, use case descriptions, interaction design, and user testing. Mikko successfully acted as a Scrum Master.
> Keywords:


##**Slot Machine Association, Loyal Customers and Online Casino, 5/2013-5/2014**
###UI Designer
Reaktor is developing various RAY’s services and Mikko has been in a significant role as an UI designer in a number of these services. He did, for example, concept design and user interface design for Loyal Customers feature visible in the slot machines, critical internal information systems, as well as features dealing with money at Online Casino on ray.fi. His duties included e.g. desinging, testing, and documentation.<br>
Online Casino: www.ray.fi/en<br>
Loyal Customer: www.ray.fi/en/etuasiakas
> Keywords:


##**Reaktor R&D, Hours, 1-4/2013**
Hours is a Java based software for working time tracking. Development process also included some Scala. Mikko was responsible for the architecture and UI design of the application. Agile methods, such as Kanban, were used in the development process.
>Keywords:'
, 100);



INSERT INTO cv_sections VALUES (DEFAULT, 'AIKAISEMPI TYÖKOKEMUS', 'PREVIOUS EMPLOYMENT', '',
'#**Futurice, 3/2009-12/2012**
###Concept and UI Designer
While working at Futurice, Mikko’s tasks varied in different mobile and web projects from UI design to usability testing and from Scrum Mastering to project management. Mikko’s most significant project was an online store development project for Company X, and Mikko was responsible for the UI design of the mobile application. Mikko’s clients were e.g. Company A, Company B, and Company C. Additionally, his responsibilities included leading team of 15 developers and senior technical expert, and product owner in R&D projects.
> Keywords:


#**Idean, 5/2007-3/2009**
###UI Specialist, Coach
At Idean’s research department, Mikko’s responsibilities included usability testing, conceptualisation research and service design. Additionally, he acted as a coach in several projects, helping clients through the project.
> Keywords:


Projects include:


##**Company Y, Further development of web service, 1-12/2008**

• Mikko worked as an UI designer and conceptualiser

• Mikko was planning and implementing Company Y’s new web service for corporate customers

• Keywords: xxx, xxx, xxx


##**Company X, Coaching, 12/2007-3/2008**
• Mikko worked as a coach for Company X, who was simultaneously working on a large scale development project.

• Mikko organised three separate trainings, where he sparred personnel working on the large development project, helping them through the project

• The trainings received a lot of good feedback and the client’s development project was also successful

• Keywords: xxx, xxx, xxx'
, 200);



INSERT INTO cv_sections VALUES (DEFAULT, 'KOULUTUS', 'EDUCATION', '',
'#**Master of Science, Helsinki University of Technology, 2002-2008**
Information Networks

Major: Ihmisläheiset tietojärjestelmät

Minor: International Design Business Management

Master’s thesis: xxx


#**Non-graduate studies, Aalto University School of Science, 2011-2012**
Courses after graduation at the Department of Computer Science

• Advanced module of user interfaces and usability, 2012

• Continuous Integration advanced course, 2010'
, 300);



INSERT INTO cv_sections VALUES (DEFAULT, 'SERTIFIKAATIT', 'CERTIFICATES', '',
'Certified Scrum Master, August 2013

Certified Kanban Developer, Reaktor, November 2011'
, 400);



INSERT INTO cv_sections VALUES (DEFAULT, 'KIELITAITO', 'LANGUAGE SKILLS', '',
'Finnish native

English excellent

Swedish good

German satisfactory'
, 500);



INSERT INTO cv_sections VALUES (DEFAULT, 'PALKINNOT', 'AWARDS', '',
'Finnish Champion in coding, August 2010'
, 600);



INSERT INTO cv_sections VALUES (DEFAULT, 'JULKAISUT', 'PUBLICATIONS', '',
'Article: Mikko Mallikas, 2009, Overfitting in making comparisons between variable selection methods, Journal of Machine Learning Research 3, 1371-1382

Book: Mikko Mallikas, 2008, Agile Software Development with Scrum, Pearson, ISBN 978-0130676344

Patent: Mikko Mallikas and Antti Saarela, 2003, Method and apparatus for recognizing repeating patterns. Europe patent no. 1867979, US patent 8023720'
, 700);



INSERT INTO cv_sections VALUES (DEFAULT, 'KONFERENSSIT', 'CONFERENCES', '',
'2007 Name of the Conference, City, Country, speaker/participant

2005 Name of the Conference, City, Country, speaker/participant'
, 800);



INSERT INTO cv_sections VALUES (DEFAULT, 'HARRASTUNEISUUS', 'OTHER ACTIVITIES', '',
'• GitHub/Bitbucket: www.xxxx.fi

• Portfolio: www.xxxx.fi

• Participates in OpenSource projects, such as

• xxx

• xxx

• Has held several courses and lectures for co-workers about various technology topics',
900);



INSERT INTO cv_sections VALUES (DEFAULT, 'OSAAMINEN', 'ESSENTIAL SKILLS', '',
'• Concrete, higher level skills and areas of knowledge are listed here (cross-check with bio)

• Long experience in designing user-friendly interfaces

• Highly experienced architect designer

• Expert of conceptual design

• A firm understanding of agile methods

• Experienced project manager

• Expertise in data security

• Additionally, some “softer” skills, e.g.:

• Passionate problem solver

• Designer of beautiful and elegant solutions

• Good listener of customers’ and end-users’ needs

• Previous experience in programming provides basis for the evaluation of the implementation plans

• Respected and liked teammate

• Excellent interpersonal and communication skills


#**Knowledge and experience of:**

• Specific technologies are listed here under various categories, no sentences

• ** Object-oriented and functional programming **

• ** Software integrations **

• ** Agile methods **: Scrum, Lean, Kanban, BDD, TDD, CI

• ** Programming languages **: Java, Scala, C++, Ruby, Python, JavaScript

• ** Java technologies **

• Java SE: JNDI, JDBC, JavaMail

• Java EE: EJB3, EJB2, JPA, JTA, JMS, JAAS, JNDI, JCA, CDI

• ** Application servers and environments **: JBoss, Oracle WebLogic, Glassfish, Jetty, Tomcat, Rails, Heroku, CloudBees

• ** Web-tier components and tools **: HTML5, JavaScript, JSON, AJAX, jQuery, angular.js, Backbone.js

• ** Software frameworks and libraries **: Spring, Play, Struts, Vaadin, Restlet, Jersey, Jackson, Servlets, JSF, RichFaces, JSP, Velocity, JSTL, Apache CXF

• ** SOA and Web Services **: REST, SOAP, XML-RPC, WSDL, WS-*, BPMN, BPEL, JAX-WS, JAX-RS

• ** XML technologies **: XML Schema, RDF, DOM, SAX, XSLT, XQuery, XPath

• ** ORM tools **: Hibernate, EJB3, JPA, QueryDSL, EBean, Morphia, Spring data

• ** Databases **: Oracle, MySQL, MongoDB, PostgreSQL, Oracle 11g, H2

• ** Build systems, continuous integration and development environments **: Ant, Maven, Rake, SBT, Bamboo, Jenkins, Eclipse, IntelliJ IDEA

• ** Editors/Integrated Development Environments **: Xcode, Eclipse, Aptana Studio, NetBeans, Sublime Text, Espresso, Coda

• ** Testing **: Selenium, PhantomJS, CasperJS, Mocha

• ** Version control softwares **: Git, Apache Subversion

• ** Graphic design tools **: Adobe Photoshop, Adobe Illustrator, Adobe InDesign'
, 1000);
