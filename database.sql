
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
	"city" varchar(255) NOT NULL,
	"postal_code" integer NOT NULL,
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
	"postal_code" integer NOT NULL,
	"city" varchar(255) NOT NULL,
	"state_province" varchar(255) NOT NULL,
	"country_code" varchar(255) NOT NULL,
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
	"email_address" varchar(255) UNIQUE NOT NULL,
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

