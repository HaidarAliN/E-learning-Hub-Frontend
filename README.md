# E-Learning Hub webapp
## Reactjs, Material-ui, jsx, firebase

## Features

- ### Admin Side:
- Register Instructors & Students
- Reset users passwords 
&NewLine;
&nbsp;![Admin Side](https://github.com/HaidarAliN/E-learning-Hub-Frontend/blob/main/assets/images/AdminSide.png?raw=true)
- ### Instructore Side:
- Create Courses
- Uplaod Mateial
- Manage Quizzes
- Manage Students
- View Students Submissions
- Edit Course Info
&NewLine;
&nbsp;![Admin Side](https://github.com/HaidarAliN/E-learning-Hub-Frontend/blob/main/assets/images/InstructorSide.png?raw=true)
&nbsp;![Admin Side](https://github.com/HaidarAliN/E-learning-Hub-Frontend/blob/main/assets/images/InstructorCourseSide.png?raw=true)
- ### Student Side:
- Search For New Courses
- Enroll In Course
- View Uploaded Materials
- Submit Quizzes
&NewLine;
&nbsp;![Admin Side](https://github.com/HaidarAliN/E-learning-Hub-Frontend/blob/main/assets/images/StudentSide.png?raw=true)
&nbsp;![Admin Side](https://github.com/HaidarAliN/E-learning-Hub-Frontend/blob/main/assets/images/StudentCourseSide.png?raw=true)

## Tech

- [React] - A JavaScript library for building user interfaces!
- [Material UI] - A design language developed by Google
- [Firebase] - Used for push notifcations
- [Laravel Web Server] - The web serve of the app is built using [Laravel] and running on my [Amazon EC2] server
- [Recharts] - A composable charting library built on React components


## Installation

Install Node.js and npm on your machine using the following command:

```sh
npm install -g npm
```
For more details, go to the documentation: [npm Docs]

Clone the repository:

```sh
git clone https://github.com/HaidarAliN/E-learning-Hub-Frontend
```
In the command line, run:

```sh
cd E-learning-Hub-Frontend
npm install
```

Firebase:
- Create your own Firebase Cloud Messaging web project
- Get the Firebase config:
--  From Firebase navigate to Project settings -> General -> Your apps -> Copy the following and paste them in src/firebase.js file in the project:

    ```sh
    const firebaseConfig = {
      apiKey: "AIzaSyCIXRK5xHg1VgYtAbWyPhZe3IaejxgQUCI",
      authDomain: "e-learning-579d3.firebaseapp.com",
      projectId: "e-learning-579d3",
      storageBucket: "e-learning-579d3.appspot.com",
      messagingSenderId: "1054286560530",
      appId: "1:1054286560530:web:a437f019066ec9be1887cb",
      measurementId: "G-C2NDK0ST7D",
    };
    ```
Go to BaseUrl.js file in src/services/BaseUrl.js, and change the ip adress in the base URl acording to your ip address (in my case i am using the domain of my webserver)

To run the application, run the following command:
```sh
npm run start
```
**You can now login and start using the webapp**


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://reactjs.org/>
   [Material UI]: <https://mui.com/>
   [Firebase]: <https://firebase.google.com/>
   [Laravel Web Server]: <https://github.com/HaidarAliN/E-learning-Hub-server>
   [Laravel]: <https://laravel.com/>
   [Amazon EC2]: <https://aws.amazon.com/ec2/>
   [Recharts]: <https://recharts.org/en-US/>
   [node.js]: <http://nodejs.org>
   [npm Docs]: <https://docs.npmjs.com/>
