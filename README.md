# ELearnWebApp

A simple E-Learning web application where

-- teacher can upload their lectures for particular courses
-- student can enroll to new courses, view lectures of their enrolled courses along with multimedia attachments




Build Project

After cloning codes from git repository following things will need to be done:


1. Download and install nodejs - https://nodejs.org/en/download/

2. Install visual studio 2019 community edition: https://visualstudio.microsoft.com/vs/

3. Install SQL server and SQL server management studio

4. Create database with name 'elearneweb'

5. Create tables from Database/dbo/tables/*.sql

5. Copy and paste connection string to appsettings.json - DefaultConnection

6. Open the project with visual studio

4. Clean build and run the project

5. Firebase storage was used for storing attachments of lessons. Save firebase storage bucket name in appsettings.json -> FirebaseBucket. 
Add necessary rules in firebase to allow read,write from web app.



