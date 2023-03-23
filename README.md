Scheduling Tool
Brief Description
The scheduling tool allows a user to schedule employees throughout the work week. A load table is automatically calculated in a table below with the total number of shifts an employee takes on. Please note the application is using local storage to track data upon opening and closing the application. This implementation can later be enhanced by creating a JSON file or utilizing a database architecture to track and store data.

Debug and Test
Please run ‘npm install’ first to ensure all required dependencies are installed correctly.

Using NPM
1.	Open command prompt and change the directory to the location of the application files.
  a.	Example “cd C:\Users\{yourUserProfile} \Downloads\schedulingtool”
2.	Once in the folder location within command prompt you can run the following command to test the application
  a.	npm start
  
Using Visual Studio Code
1.	Open the folder within VS Code
2.	In the terminal run either command
  a.	npm start
  b.	npm install -g server
    i.	serve -s build

** Please note running the application through a node server will only work if an execution policy is changed in Powershell. The easiest option is to just run the application using “npm start”.
