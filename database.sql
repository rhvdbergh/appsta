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
-- database as constructed by Matt Dow on 01/08/21
CREATE TABLE "buyers" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "company_name" varchar(255),
  "project_name" varchar(255) NOT NULL,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "city" varchar(255),
  "postal_code" varchar(11) NOT NULL,
  CONSTRAINT "buyers_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "features" (
  "id" serial NOT NULL,
  "feature_name" varchar(255) NOT NULL,
  "feature_story" varchar(1000) NOT NULL,
  "feature_description" varchar(1000) NOT NULL,
  "category_id" integer NOT NULL,
  "image_url" varchar(1000) NOT NULL,
  CONSTRAINT "features_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "projects" (
  "id" serial NOT NULL,
  "buyer_id" integer NOT NULL,
  "date_of_project" DATE NOT NULL,
  CONSTRAINT "projects_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "agencies" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "agency_name" varchar(255) NOT NULL,
  "agency_blurb" text,
  "postal_code" varchar(11) NOT NULL,
  "city" varchar(255) NOT NULL,
  "state_province" varchar(255),
  "country_code" varchar(255),
  "team_size" integer NOT NULL,
  "minority_owned" BOOLEAN,
  "woman_owned" BOOLEAN,
  "veteran_owned" BOOLEAN,
  "lgbt_owned" BOOLEAN,
  "staffing_location" varchar(255) NOT NULL,
  "contact_first_name" varchar(255) NOT NULL,
  "contact_last_name" varchar(255) NOT NULL,
  "phone_number" varchar(255),
  "logo_url" varchar(255),
  CONSTRAINT "agencies_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "agency_features" (
  "id" serial NOT NULL,
  "agency_id" integer NOT NULL,
  "feature_id" integer NOT NULL,
  "feature_notes" varchar(1000),
  "t_shirt_size" varchar(255) NOT NULL,
  "confidence" integer NOT NULL,
  CONSTRAINT "agency_features_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "project_features" (
  "id" serial NOT NULL,
  "project_id" integer NOT NULL,
  "feature_id" integer NOT NULL,
  "quantity" integer NOT NULL,
  CONSTRAINT "project_features_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "users" (
  "id" serial NOT NULL,
  "username" varchar(255) UNIQUE NOT NULL,
  "password" varchar(1000) NOT NULL,
  "is_admin" BOOLEAN NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "feature_categories" (
  "id" serial NOT NULL,
  "category_name" varchar(255) NOT NULL,
  CONSTRAINT "feature_categories_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "project_agencies" (
  "id" serial NOT NULL,
  "project_id" integer NOT NULL,
  "agency_id" integer NOT NULL,
  CONSTRAINT "project_agencies_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "agency_conversion" (
  "id" serial NOT NULL,
  "agency_id" INT UNIQUE NOT NULL,
  "xsmall_hours" INT NOT NULL,
  "small_hours" INT NOT NULL,
  "medium_hours" INT NOT NULL,
  "large_hours" INT NOT NULL,
  "xlarge_hours" INT NOT NULL,
  "hourly_rate" INT NOT NULL,
  CONSTRAINT "agency_conversion_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

ALTER TABLE
  "buyers"
ADD
  CONSTRAINT "buyers_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "features"
ADD
  CONSTRAINT "features_fk0" FOREIGN KEY ("category_id") REFERENCES "feature_categories"("id");

ALTER TABLE
  "projects"
ADD
  CONSTRAINT "projects_fk0" FOREIGN KEY ("buyer_id") REFERENCES "buyers"("id");

ALTER TABLE
  "agencies"
ADD
  CONSTRAINT "agencies_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "agency_features"
ADD
  CONSTRAINT "agency_features_fk0" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id");

ALTER TABLE
  "agency_features"
ADD
  CONSTRAINT "agency_features_fk1" FOREIGN KEY ("feature_id") REFERENCES "features"("id");

ALTER TABLE
  "project_features"
ADD
  CONSTRAINT "project_features_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE
  "project_features"
ADD
  CONSTRAINT "project_features_fk1" FOREIGN KEY ("feature_id") REFERENCES "features"("id");

ALTER TABLE
  "project_agencies"
ADD
  CONSTRAINT "project_agencies_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE
  "project_agencies"
ADD
  CONSTRAINT "project_agencies_fk1" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id");

-- THESE COMMENTED COMMANDS INSERTED ORIGINAL DUMMY DATA INTO THE DATABASE. KEEPING IN THE FILE JUST IN CASE, WILL/SHOULD DELETE AT SOME POINT
-- INSERT INTO
--   "users" (username, password, is_admin)
-- VALUES
--   (
--     'buyer@prime.io',
--     '$2a$10$G8YAWKsbI/PbdqevNIkpXelI7D2cxlX8BAMXTP2AtHqAzB7A42t0O',
--     false
--   ),
--   (
--     'agency@prime.io',
--     '$2a$10$7UnTgxd7SbutPPd14NmFhefPlCgpzGSyRyxog.lBfs.BqmTPDSzMK',
--     false
--   ),
--   (
--     'agency2@prime.io',
--     '$2a$10$dFW5miHngu0KH1qJkyHpvetPQCLf4nC.1XTB9rcDJkWDhjkYmIGwm',
--     false
--   ),
--   (
--     'admin@prime.io',
--     '$2a$10$l.67fm23RLQVZHg.PM5I2OPQswkDxyWLcTGIIpGstuz6Z1sFvCCSW',
--     true
--   );
-- INSERT INTO
--   "buyers" (
--     user_id,
--     company_name,
--     project_name,
--     first_name,
--     last_name,
--     postal_code
--   )
-- VALUES
--   (
--     1,
--     'Company Name',
--     'My Excellent Project',
--     'Alex',
--     'Smith',
--     '55404'
--   );
-- INSERT INTO
--   "agencies" (
--     user_id,
--     agency_name,
--     agency_blurb,
--     postal_code,
--     city,
--     team_size,
--     minority_owned,
--     woman_owned,
--     veteran_owned,
--     lgbt_owned,
--     staffing_location,
--     contact_first_name,
--     contact_last_name,
--     phone_number,
--     logo_url
--   )
-- VALUES
--   (
--     2,
--     'Awesome Agency',
--     'Awesome Agency does awesome things!',
--     '02860',
--     'Providence',
--     59,
--     true,
--     false,
--     false,
--     true,
--     'Onshore Talent Only',
--     'Ridwan',
--     'Ali',
--     '123-456-7890',
--     'https://images.unsplash.com/photo-1622630732278-ca6d08c52b6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
--   ),
--   (
--     3,
--     'Jazzy Agency',
--     'We like jazzing things up',
--     '70118',
--     'New Orleans',
--     14,
--     false,
--     true,
--     true,
--     false,
--     'Talent Offshore, Leadership Onshore',
--     'Alicia',
--     'Harvey',
--     '987-654-3210',
--     'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
--   );
-- INSERT INTO
--   "feature_categories"(category_name)
-- VALUES
--   ('charts'),
-- ('buttons'),
-- ('tables'),
-- ('calendars'),
-- ('icons'),
-- ('input fields');
-- INSERT INTO
--   "features" (
--     feature_name,
--     feature_story,
--     feature_description,
--     category_id,
--     image_url
--   )
-- VALUES
--   (
--     'doughnut chart',
--     'information in a doughnut chart',
--     'description of object',
--     1,
--     'https://pnp.github.io/sp-dev-fx-controls-react/assets/DoughnutChart.png'
--   ),
--   (
--     'bar chart',
--     'information in a bar chart',
--     'description of object',
--     1,
--     'https://pnp.github.io/sp-dev-fx-controls-react/assets/BarChart.png'
--   ),
--   (
--     'big red button',
--     'I can click on big red button',
--     'description of clicking on big red button',
--     2,
--     'https://www.royalroadcdn.com/public/covers-full/big-red-button-aacalrkedw8.jpg?time=1617332304'
--   ),
--   (
--     'outlined button',
--     'I can click the outlined button',
--     'description of clicking on outlined button',
--     2,
--     'https://storage.googleapis.com/spec-host-backup/mio-components%2Fassets%2F1b2CXpWNxh1k2YJUw_6B_CkkZUiHYYrzh%2Fspecs-outlined-button.png'
--   ),
--   (
--     'colored table',
--     'I can create a simple table',
--     'colored table',
--     3,
--     'https://reactjsexample.com/content/images/2019/01/material-table.jpg'
--   ),
--   (
--     'clear table',
--     'this table is clear',
--     'clear table',
--     3,
--     'https://i.stack.imgur.com/jm4zL.png'
--   ),
--   (
--     'calendars',
--     'this is a basic date picker',
--     'description of object',
--     4,
--     'https://lh3.googleusercontent.com/kVt6Ju61frOMJ6YA0ugP7dGUbSNrsklxRBABsGpJdkB_keySbNWwuwUQKfAikfKjSW4XtTo_71gNvLc0gHkH6UEBHux7krWhhppJ=w1064-v0'
--   ),
--   (
--     'calendars',
--     'this is a basic dark mode date picker',
--     'description of object',
--     4,
--     'https://camo.githubusercontent.com/d3b80e150c29d8530b289054210aa68f6398cdba8f62fb2feac4ef15b94c9cc4/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d6174657269616c2d64657369676e2f7075626c6973682f6d6174657269616c5f765f31322f6173736574732f304233333231735a4c6f505f484f545a6f55453156534778765246452f636f6d706f6e656e74732d7069636b6572732d64617465342e706e67'
--   ),
--   (
--     'icons',
--     'this is an icon list',
--     'description of object',
--     5,
--     'https://miro.medium.com/max/1400/1*2QQNpKIBeyTha-XcU9IHBw.png'
--   ),
--   (
--     'icons',
--     'this is another icon list',
--     'description of object',
--     5,
--     'https://icons.iconarchive.com/icons/custom-icon-design/mini/icons-390.jpg'
--   ),
--   (
--     'input fields',
--     'here are some text fields',
--     'descirption of text fields',
--     6,
--     'https://i.pinimg.com/originals/61/6b/5e/616b5e964eb01bbcb554306ac6744326.png'
--   ),
--   (
--     'input fields',
--     'here are some more text fields',
--     'descirption of text fields',
--     6,
--     'https://lh3.googleusercontent.com/Cg9IlC6OWQ58eqWlbkPacWsO6vemJOcOzkRHsF7nnAVa6VD-GZgcMDGfPpHxcpS4FbhEqWiUO-W48Pd18FfR-cYrdPTo1bWjEIti=w1064-v0'
--   );
-- INSERT INTO
--   "agency_features" (
--     agency_id,
--     feature_id,
--     feature_notes,
--     t_shirt_size,
--     confidence
--   )
-- VALUES
--   (1, 2, 'we got it!', 'XL', 70),
--   (1, 1, 'no problem', 'S', 50),
--   (2, 4, 'ehhhhh, we have to check', 'XS', 20),
--   (2, 6, 'whew, well this is awkward!', 'M', 30),
--   (2, 2, 'whew, well this is awkward!', 'M', 30);
-- INSERT INTO
--   "projects" (buyer_id, date_of_project)
-- VALUES
--   (1, '12/13/2021');
-- INSERT INTO
--   "project_features" (project_id, feature_id, quantity)
-- VALUES
--   (1, 4, 3);
-- INSERT INTO
--   "project_agencies" (project_id, agency_id)
-- VALUES
--   (1, 2);
-- --Here is code to create the additional agency conversion table with the sample data for our two dummy agencies
-- INSERT INTO
--   "agency_conversion" (
--     agency_id,
--     xsmall_hours,
--     small_hours,
--     medium_hours,
--     large_hours,
--     xlarge_hours,
--     hourly_rate
--   )
-- VALUES
--   (1, 1, 2, 5, 8, 13, 150),
--   (2, 1, 3, 6, 10, 20, 100);
-- Database status as of 1/8/22
INSERT INTO
  users ("username", "password", "is_admin")
VALUES
  (
    'buyer@prime.io',
    '$2a$10$G8YAWKsbI/PbdqevNIkpXelI7D2cxlX8BAMXTP2AtHqAzB7A42t0O',
    'false'
  ),
  (
    'agency@prime.io',
    '$2a$10$7UnTgxd7SbutPPd14NmFhefPlCgpzGSyRyxog.lBfs.BqmTPDSzMK',
    'false'
  ),
  (
    'agency2@prime.io',
    '$2a$10$dFW5miHngu0KH1qJkyHpvetPQCLf4nC.1XTB9rcDJkWDhjkYmIGwm',
    'false'
  ),
  (
    'admin@prime.io',
    '$2a$10$l.67fm23RLQVZHg.PM5I2OPQswkDxyWLcTGIIpGstuz6Z1sFvCCSW',
    'true'
  ),
  (
    'super@prime.io',
    '$2a$10$5k0I0/0qExYPjmrU0k0JKOiegGn5n9Yj/iJ8eJZf1FJBe9OPqy5yy',
    'false'
  ),
  (
    'ceo@teatime.com',
    '$2a$10$h1jY8TjEZhhOLDunyXTKw.HY3hjhSb8sWxXG/I9ue5sPs36tl8t.O',
    'false'
  ),
  (
    'toni@codesprout.com',
    '$2a$10$7OuCd8REiqwktQ3QjKT/J.DqBPQSkNSsmr6GMjTY75Ppt5LawzsEy',
    'false'
  ),
  (
    'bob@nightstudios.tech',
    '$2a$10$VjHIYsNDneBL3uFcYRxFoeEFGVIOh35kz1KvezN7ruoilFp6I.yGK',
    'false'
  ),
  (
    'max@allustrate.net',
    '$2a$10$GBma2XWoWQHgMJxq5B5S3OvUyAYEZ80kq9m7jqZLcct5hwtmdiLOm',
    'false'
  ),
  (
    'chris@devkitchen.com',
    '$2a$10$vez2.ta0bvcIDni5UQHJGewebko8kAyRkH/tvYhuBOsJm0PDmZF12',
    'false'
  ),
  (
    'georgie@buildary.com',
    '$2a$10$yu3zOa2WGC6JaQ1j5gPFOeF2ft0geO5gcGYI9/SQ0cuSCReP9oZPW',
    'false'
  ),
  (
    'justeene@clickidy.net',
    '$2a$10$ltJ8p5Fmi9Tmzk1xVBo3duMeNZJYP0m/osg753oy8w8Xl8vwKA45W',
    'false'
  ),
  (
    'bongani@rainbowapps.co.za',
    '$2a$10$5N9j44sGXz6gRWpgPyIre.16OxajrFODj69FjCAw6JvbWJmQWhUuW',
    'false'
  );

INSERT INTO
  buyers (
    "user_id",
    "company_name",
    "project_name",
    "first_name",
    "last_name",
    "city",
    "postal_code"
  )
VALUES
  (
    '1',
    'Company Name',
    'My Excellent Project',
    'Alex',
    'Smith',
    'null',
    '55404'
  ),
  (
    '6',
    'Teatime',
    'Teaster',
    'Charles',
    'Windsor',
    'New London',
    '56789'
  );

INSERT INTO
  feature_categories ("category_name")
VALUES
  ('Authentication'),
  ('Subscription'),
  ('Tables'),
  ('Calendars'),
  ('Menus'),
  ('Forms');

INSERT INTO
  features (
    "feature_name",
    "feature_story",
    "feature_description",
    "category_id",
    "image_url"
  )
VALUES
  (
    'Login',
    'username and password',
    'description of login',
    '1',
    'https://miro.medium.com/max/1400/1*_tt-dyUruSDMokKv-kQz9Q.png'
  ),
  (
    'Register',
    'register new user',
    'description of registration',
    '1',
    'https://www.tutorialrepublic.com/snippets/designs/simple-registration-form.png'
  ),
  (
    'Password reset',
    'user can reset lost password ',
    'description of password reset',
    '1',
    'https://shots.jotform.com/welvin/shots/2019-11-22-012.png?1.0.449'
  ),
  (
    'Pop-up',
    'pop up subscription form appears when user loads page ',
    'description of pop up',
    '2',
    'https://www.mailerlite.com/assets/features/popup-subscribe-form.jpeg'
  ),
  (
    'Header',
    'subscription form in header',
    'description of header ',
    '2',
    'https://assets.getsitecontrol.com/prod2/blog/lead-generation/7-great-email-newsletter-signup-examples/12.png?rev=e2143a474c'
  ),
  (
    'Footer',
    'subscription form in footer',
    'description of footer',
    '2',
    'https://help.outofthesandbox.com/hc/article_attachments/360032537374/footer-newsletter-parallax.png'
  ),
  (
    'Bootstrap table',
    'I can create a simple table',
    'colored table',
    '3',
    'https://reactjsexample.com/content/images/2019/01/material-table.jpg'
  ),
  (
    'Data table',
    'this is a data table ',
    'data table',
    '3',
    'https://s3-alpha.figma.com/hub/file/217425317/401965ec-d8b1-4315-b722-beefad4aa135-cover'
  ),
  (
    'Basic calendar',
    'this is a basic date picker',
    'description of object',
    '4',
    'https://lh3.googleusercontent.com/kVt6Ju61frOMJ6YA0ugP7dGUbSNrsklxRBABsGpJdkB_keySbNWwuwUQKfAikfKjSW4XtTo_71gNvLc0gHkH6UEBHux7krWhhppJ=w1064-v0'
  ),
  (
    'Calendar scheduling',
    'this is a basic dark mode date picker',
    'description of object',
    '4',
    'https://camo.githubusercontent.com/d3b80e150c29d8530b289054210aa68f6398cdba8f62fb2feac4ef15b94c9cc4/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d6174657269616c2d64657369676e2f7075626c6973682f6d6174657269616c5f765f31322f6173736574732f304233333231735a4c6f505f484f545a6f55453156534778765246452f636f6d706f6e656e74732d7069636b6572732d64617465342e706e67'
  ),
  (
    'Top navigation ',
    'this is header navigation',
    'description of header nav ',
    '5',
    'https://cdn.dribbble.com/users/1774675/screenshots/15763538/media/76834f405a810f7d28ad39f4a26083a9.png?compress=1&resize=400x300'
  ),
  (
    'Bottom navigation',
    'this is footer navigation',
    'description of footer navigation',
    '5',
    'https://camo.githubusercontent.com/1a6072b665137d805c35cdc52f079b2ce432fdb9fcfb40667ead0b48f048b1b2/687474703a2f2f692e696d6775722e636f6d2f5959374b4a73532e706e67'
  ),
  (
    'Contact',
    'contact form description',
    'descirption of contact form',
    '6',
    'https://bootstrapstudio.io/docs/img/guide/contact-form-example.png'
  ),
  (
    'Intake',
    'client intake form',
    'descirption of intake form',
    '6',
    'https://d2ydtwisqcxv72.cloudfront.net/client-intake-form.png'
  );

INSERT INTO
  agencies (
    "user_id",
    "agency_name",
    "agency_blurb",
    "postal_code",
    "city",
    "state_province",
    "country_code",
    "team_size",
    "minority_owned",
    "woman_owned",
    "veteran_owned",
    "lgbt_owned",
    "staffing_location",
    "contact_first_name",
    "contact_last_name",
    "phone_number",
    "logo_url"
  )
VALUES
  (
    '3',
    'Jazzy Agency',
    'We like jazzing things up',
    '70118',
    'New Orleans',
    'null',
    'null',
    '14',
    'false',
    'true',
    'true',
    'false',
    'Talent Offshore, Leadership Onshore',
    'Alicia',
    'Harvey',
    '987-654-3210',
    'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  ),
  (
    '2',
    'Awesome Agency',
    'Awesome Agency does awesome things!',
    '02860',
    'Providence',
    'RI',
    'US',
    '67',
    'true',
    'false',
    'false',
    'true',
    'Onshore Talent Only',
    'Ridwan',
    'Ali',
    '555-555-1234',
    'https://images.unsplash.com/photo-1622630732278-ca6d08c52b6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  ),
  (
    '5',
    'Super Software',
    'Here we come to save the day!',
    '67890',
    'Smallville',
    'KS',
    'US',
    '123',
    'true',
    'false',
    'true',
    'false',
    'Onshore Talent Only',
    'Clark',
    'Kent',
    '555-555-7890',
    'https://w7.pngwing.com/pngs/471/512/png-transparent-superman-computer-cartoon-cartoon-computer-furniture-heroes-photography.png'
  ),
  (
    '7',
    ' CodeSprout',
    'Help us grow your business! For more than ten years, we have helped startups grow from seed to mighty tree. ',
    '12780',
    'Cornwall',
    'New York',
    '1',
    '32',
    'false',
    'false',
    'false',
    'true',
    'Onshore Talent Only',
    'Toni',
    'Patel',
    '555-555-8907',
    'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  ),
  (
    '8',
    'NightStudios',
    'We will help your product stand out from the crowd like a shining star! We here at NightStudios always deliver on our promises, even if it means occasionally burning the midnight oil.',
    '92701',
    'Santa Ana',
    'California',
    '1',
    '45',
    'false',
    'false',
    'true',
    'false',
    'Onshore Talent Only',
    'Bob',
    'OSullivan',
    '555-555-1764',
    'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5pZ2h0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  ),
  (
    '9',
    'Allustrate',
    'Founded in 2003, Allustrate has all the experience to help nurture your ideas to life. We stand by our clients—which is why we won the Good Company Folks© three years in a row. Let us stand by your side too!',
    '23504',
    'Norfolk',
    'Virginia',
    '1',
    '234',
    'false',
    'false',
    'false',
    'false',
    'Onshore Talent Only',
    'Maxine',
    'Ortiz',
    '555-555-4792',
    'https://images.unsplash.com/photo-1603372715989-400893cb6081?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHJhdyUyMHZlY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  ),
  (
    '10',
    'DevKitchen',
    'At DevKitchen, we think of coding as cooking. Bring your ideas and we will cook up something spicy and good!',
    '99506',
    'Anchorage',
    'Alaska',
    '1',
    '24',
    'true',
    'false',
    'false',
    'true',
    'Offshore Talent, Onshore Leadership',
    'Christina',
    'Gonzalez',
    '555-555-1256',
    'https://images.unsplash.com/photo-1483137140003-ae073b395549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMHdlYnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  ),
  (
    '11',
    'Buildary',
    'Like blocks? We do too! And we think of code in blocks. So let us build something beatiful together!',
    '91914',
    'Chula Vista',
    'California',
    '1',
    '78',
    'true',
    'true',
    'false',
    'false',
    'Onshore Talent Only',
    'Georgie',
    'Hughes',
    '555-555-9023',
    'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxvY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  ),
  (
    '12',
    'Clickidy',
    'Click, click ... and your app is done! ',
    '46805',
    'Fort Wayne',
    'Indiana',
    '1',
    '20',
    'true',
    'false',
    'false',
    'true',
    'Onshore and Offshore Talent',
    'Justeene',
    'Gray',
    '555-555-3497',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBtb3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  ),
  (
    '13',
    'RainbowApps',
    'RainbowApps is an award-winning South African app company. No matter what your business size, we will help you grow!',
    '0002',
    'Pretoria',
    'Gauteng',
    '27',
    '5',
    'true',
    'false',
    'false',
    'true',
    'All Staff Offshore',
    'Bongani',
    'Ndlovu',
    '012-256-3965',
    'https://images.unsplash.com/photo-1562177257-977b3bd4d7ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhaW5ib3d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
  );

INSERT INTO
  projects ("buyer_id", "date_of_project")
VALUES
  ('1', '12/13/2021'),
  ('2', '01/07/2022'),
  ('2', '01/07/2022');

INSERT INTO
  project_features ("project_id", "feature_id", "quantity")
VALUES
  ('1', '4', '3'),
  ('2', '1', '1'),
  ('2', '2', '3'),
  ('2', '4', '3'),
  ('2', '6', '1'),
  ('2', '7', '1'),
  ('3', '1', '4'),
  ('3', '3', '2'),
  ('3', '4', '3'),
  ('3', '6', '1'),
  ('3', '8', '1'),
  ('3', '10', '2'),
  ('3', '11', '1');

INSERT INTO
  agency_features (
    "agency_id",
    "feature_id",
    "feature_notes",
    "t_shirt_size",
    "confidence"
  )
VALUES
  ('1', '2', 'we got it!', 'XL', '70'),
  ('1', '1', 'no problem', 'S', '50'),
  ('2', '4', 'ehhhhh, we have to check', 'XS', '20'),
  (
    '2',
    '6',
    'whew, well this is awkward!',
    'M',
    '30'
  ),
  (
    '2',
    '2',
    'whew, well this is awkward!',
    'M',
    '30'
  ),
  ('1', '3', 'null', 'S', '20'),
  ('1', '4', 'null', 'XS', '50'),
  ('1', '6', 'null', 'M', '90'),
  ('1', '5', 'null', 'S', '85'),
  ('1', '7', 'null', 'M', '70'),
  ('1', '8', 'null', 'S', '70'),
  ('1', '9', 'null', 'S', '75'),
  ('1', '10', 'null', 'M', '30'),
  ('1', '11', 'null', 'L', '75'),
  ('3', '1', 'null', 'XS', '100'),
  ('3', '2', 'null', 'S', '100'),
  ('3', '3', 'null', 'S', '100'),
  ('3', '4', 'null', 'XS', '100'),
  ('3', '5', 'null', 'XL', '20'),
  ('3', '6', 'null', 'XS', '90'),
  ('3', '7', 'null', 'S', '100'),
  ('3', '8', 'null', 'S', '100'),
  ('3', '9', 'null', 'S', '100'),
  ('4', '2', 'null', 'M', '50'),
  ('4', '1', 'null', 'S', '75'),
  ('4', '3', 'null', 'M', '35'),
  ('4', '4', 'null', 'S', '50'),
  ('4', '5', 'null', 'L', '60'),
  ('4', '6', 'null', 'M', '45'),
  ('4', '7', 'null', 'L', '40'),
  ('4', '8', 'null', 'M', '30'),
  ('4', '9', 'null', 'XL', '40'),
  ('4', '10', 'null', 'S', '50'),
  ('4', '11', 'null', 'S', '65'),
  ('5', '1', 'null', 'M', '75'),
  ('5', '3', 'null', 'XL', '70'),
  ('8', '10', 'null', 'XL', '80'),
  ('5', '4', 'null', 'S', '65'),
  ('5', '5', 'null', 'XS', '60'),
  ('5', '6', 'null', 'S', '70'),
  ('5', '7', 'null', 'M', '40'),
  ('5', '8', 'null', 'L', '80'),
  ('5', '9', 'null', 'L', '65'),
  ('5', '10', 'null', 'S', '65'),
  ('5', '11', 'null', 'M', '45'),
  ('5', '12', 'null', 'M', '40'),
  ('5', '13', 'null', 'XS', '50'),
  ('8', '11', 'null', 'S', '70'),
  ('6', '1', 'null', 'S', '65'),
  ('6', '2', 'null', 'S', '70'),
  ('6', '3', 'null', 'M', '100'),
  ('8', '12', 'null', 'S', '60'),
  ('6', '4', 'null', 'M', '80'),
  ('6', '5', 'null', 'S', '70'),
  ('6', '6', 'null', 'M', '55'),
  ('6', '7', 'null', 'L', '50'),
  ('6', '8', 'null', 'XL', '35'),
  ('6', '9', 'null', 'L', '50'),
  ('6', '10', 'null', 'M', '40'),
  ('6', '11', 'null', 'XS', '50'),
  ('6', '12', 'null', 'S', '70'),
  ('6', '13', 'null', 'M', '35'),
  ('7', '1', 'null', 'L', '45'),
  ('7', '2', 'null', 'M', '40'),
  ('7', '3', 'null', 'XL', '70'),
  ('9', '2', 'null', 'L', '50'),
  ('7', '4', 'null', 'XS', '85'),
  ('7', '5', 'null', 'S', '60'),
  ('7', '6', 'null', 'S', '65'),
  ('9', '3', 'null', 'XL', '60'),
  ('7', '8', 'null', 'M', '70'),
  ('9', '1', 'null', 'M', '45'),
  ('7', '7', 'null', 'L', '50'),
  ('7', '9', 'null', 'M', '50'),
  ('7', '10', 'null', 'L', '50'),
  ('7', '11', 'null', 'M', '50'),
  ('7', '12', 'null', 'M', '50'),
  ('7', '13', 'null', 'L', '30'),
  ('8', '1', 'null', 'M', '50'),
  ('8', '2', 'null', 'M', '80'),
  ('9', '4', 'null', 'S', '70'),
  ('8', '3', 'null', 'XL', '70'),
  ('8', '4', 'null', 'S', '75'),
  ('8', '5', 'null', 'XS', '35'),
  ('8', '6', 'null', 'S', '55'),
  ('9', '5', 'null', 'S', '80'),
  ('8', '7', 'null', 'M', '50'),
  ('8', '8', 'null', 'L', '55'),
  ('8', '9', 'null', 'XL', '60'),
  ('9', '6', 'null', 'M', '40'),
  ('9', '7', 'null', 'L', '55'),
  ('9', '8', 'null', 'M', '65'),
  ('9', '10', 'null', 'L', '15'),
  ('9', '9', 'null', 'M', '95'),
  ('9', '11', 'null', 'M', '50'),
  ('10', '7', 'null', 'M', '75'),
  ('9', '12', 'null', 'S', '75'),
  ('9', '13', 'null', 'XL', '50'),
  ('10', '8', 'null', 'M', '35'),
  ('10', '1', 'null', 'M', '55'),
  ('10', '2', 'null', 'L', '60'),
  ('10', '3', 'null', 'L', '55'),
  ('10', '9', 'null', 'M', '30'),
  ('10', '4', 'null', 'S', '65'),
  ('10', '10', 'null', 'M', '40'),
  ('10', '11', 'null', 'M', '50'),
  ('10', '6', 'null', 'M', '80'),
  ('10', '5', 'null', 'S', '65'),
  ('10', '12', 'null', 'S', '85'),
  ('10', '13', 'null', 'S', '50');

INSERT INTO
  project_agencies ("project_id", "agency_id")
VALUES
  ('1', '2'),
  ('2', '3'),
  ('3', '1');

INSERT INTO
  agency_conversion (
    "agency_id",
    "xsmall_hours",
    "small_hours",
    "medium_hours",
    "large_hours",
    "xlarge_hours",
    "hourly_rate"
  )
VALUES
  ('2', '1', '3', '6', '10', '20', '100'),
  ('1', '1', '2', '5', '10', '15', '175'),
  ('3', '2', '3', '5', '8', '20', '225'),
  ('4', '1', '5', '12', '25', '36', '125'),
  ('5', '2', '6', '13', '23', '37', '150'),
  ('6', '1', '3', '8', '14', '24', '175'),
  ('7', '1', '3', '9', '15', '22', '135'),
  ('8', '1', '4', '12', '20', '28', '120'),
  ('9', '1', '3', '9', '18', '28', '140'),
  ('10', '1', '5', '9', '17', '25', '90');