
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- The following commands can be used to create the tables of the 
-- database as constructed by Matt Dow on 12/12/21

CREATE TABLE "buyers" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"city" varchar(255),
	"postal_code" varchar(11) NOT NULL,
	CONSTRAINT "buyers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "features" (
	"id" serial NOT NULL,
	"feature_name" varchar(255) NOT NULL,
	"feature_story" varchar(1000) NOT NULL,
	"feature_description" varchar(1000) NOT NULL,
	"category_id" integer NOT NULL,
	"image_url" varchar(255) NOT NULL,
	CONSTRAINT "features_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "projects" (
	"id" serial NOT NULL,
	"buyer_id" integer NOT NULL,
	"date_of_project" DATE NOT NULL,
	CONSTRAINT "projects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "agencies" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"agency_name" varchar(255) NOT NULL,
	"postal_code" varchar(11) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state_province" varchar(255),
	"country_code" varchar(255),
	"team_size" integer NOT NULL,
	"minority_owned" BOOLEAN NOT NULL,
	"woman_owned" BOOLEAN NOT NULL,
	"veteran_owned" BOOLEAN NOT NULL,
	"onshore_only" BOOLEAN NOT NULL,
	"onshore_offshore_mix" BOOLEAN NOT NULL,
	"talent_off_lead_on" BOOLEAN NOT NULL,
	"contact_first_name" varchar(255) NOT NULL,
	"contact_last_name" varchar(255) NOT NULL,
	"logo_url" varchar(255) NOT NULL,
	CONSTRAINT "agencies_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "agency_features" (
	"id" serial NOT NULL,
	"agency_id" integer NOT NULL,
	"feature_id" integer NOT NULL,
	"feature_notes" varchar(1000) NOT NULL,
	"t_shirt_size" varchar(255) NOT NULL,
	"confidence" integer NOT NULL,
	CONSTRAINT "agency_features_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "project_features" (
	"id" serial NOT NULL,
	"project_id" integer NOT NULL,
	"feature_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "project_features_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(255) UNIQUE NOT NULL,
	"password" varchar(1000) NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "feature_categories" (
	"id" serial NOT NULL,
	"category_name" varchar(255) NOT NULL,
	CONSTRAINT "feature_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "buyers" ADD CONSTRAINT "buyers_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "features" ADD CONSTRAINT "features_fk0" FOREIGN KEY ("category_id") REFERENCES "feature_categories"("id");

ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("buyer_id") REFERENCES "buyers"("id");

ALTER TABLE "agencies" ADD CONSTRAINT "agencies_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "agency_features" ADD CONSTRAINT "agency_features_fk0" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id");
ALTER TABLE "agency_features" ADD CONSTRAINT "agency_features_fk1" FOREIGN KEY ("feature_id") REFERENCES "features"("id");

ALTER TABLE "project_features" ADD CONSTRAINT "project_features_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");
ALTER TABLE "project_features" ADD CONSTRAINT "project_features_fk1" FOREIGN KEY ("feature_id") REFERENCES "features"("id");

-- THIS INSERTS DUMMY DATA INTO THE DATABASE

INSERT INTO "users" (username, password, is_admin)
VALUES ('buyer@prime.io', '$2a$10$G8YAWKsbI/PbdqevNIkpXelI7D2cxlX8BAMXTP2AtHqAzB7A42t0O', false),
('agency@prime.io', '$2a$10$7UnTgxd7SbutPPd14NmFhefPlCgpzGSyRyxog.lBfs.BqmTPDSzMK', false),
('agency2@prime.io', '$2a$10$dFW5miHngu0KH1qJkyHpvetPQCLf4nC.1XTB9rcDJkWDhjkYmIGwm', false),
('admin@prime.io', '$2a$10$l.67fm23RLQVZHg.PM5I2OPQswkDxyWLcTGIIpGstuz6Z1sFvCCSW', true);

INSERT INTO "buyers" (user_id, company_name, project_name, first_name, last_name, postal_code)
VALUES (1, 'Company Name', 'My Excellent Project', 'Alex', 'Smith', '55404');

INSERT INTO "agencies" (user_id, agency_name, postal_code, city, team_size, minority_owned, woman_owned, veteran_owned, onshore_only, onshore_offshore_mix, talent_off_lead_on, contact_first_name, contact_last_name, logo_url)
VALUES (2, 'Awesome Agency', '02860', 'Providence', 59, true, false, false, true, false, false, 'Ridwan', 'Ali', 'https://images.unsplash.com/photo-1622630732278-ca6d08c52b6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'),
(3, 'Jazzy Agency', '70118', 'New Orleans', 14, false, false, true, false, false, true, 'Alicia', 'Harvey', 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');

INSERT INTO "feature_categories"(category_name)
VALUES ('charts'),('buttons'),('tables');

INSERT INTO "features" (feature_name, feature_story, feature_description, category_id, image_url)
VALUES ('doughnut chart', 'information in a doughnut chart', 'description of object', 1, 'https://pnp.github.io/sp-dev-fx-controls-react/assets/DoughnutChart.png'),
('bar chart', 'information in a bar chart', 'description of object', 1, 'https://pnp.github.io/sp-dev-fx-controls-react/assets/BarChart.png'),
('big red button', 'I can click on big red button', 'description of clicking on big red button', 2, 'https://www.royalroadcdn.com/public/covers-full/big-red-button-aacalrkedw8.jpg?time=1617332304'),
('outlined button', 'I can click the outlined button', 'description of clicking on outlined button', 2, 'https://storage.googleapis.com/spec-host-backup/mio-components%2Fassets%2F1b2CXpWNxh1k2YJUw_6B_CkkZUiHYYrzh%2Fspecs-outlined-button.png'),
('colored table', 'I can create a simple table', 'colored table', 3, 'https://reactjsexample.com/content/images/2019/01/material-table.jpg'),
('clear table', 'this table is clear', 'clear table', 3, 'https://i.stack.imgur.com/jm4zL.png');


INSERT INTO "agency_features" (agency_id, feature_id, feature_notes, t_shirt_size, confidence)
VALUES (1, 2, 'we got it!', 'extra large', 7),
(1, 1, 'no problem', 'small', 5),
(2, 4, 'ehhhhh, we have to check', 'tiny', 2),
(2, 6, 'we can do it!', 'medium', 3);


INSERT INTO "projects" (buyer_id, date_of_project)
VALUES (1, '12/13/2021'), (1, '10/20/2021');

INSERT INTO "project_features" (project_id, feature_id, quantity)
VALUES (1, 4, 3), (2, 3, 7);