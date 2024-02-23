# TO-DO App with Angular, Nest.js and MongoDB

## Introduction

### What is this app?

This is a simple to-do app. With it's help, you can manage your everyday tasks.

### How to use the app?

Type your next task in the input field called 'New Task'. You can also add a comment for the task (this is optional). After that, click on 'Add Task'. You'll see your unfinished tasks on the left and your finished ones on the right.

You can:

- mark a task as finished.
- delete a task.
- delete all the finished tasks.

### What the app uses?

- Angular for frontend (v17.0.3)
- Nest.js for backend (v10.1.18)
- MongoDB for database

## Getting started

You can deploy the app either locally or with Docker. However, to run the database you'll need Docker!

### Database

To run the database:

- Make sure you've Docker Engine on your device (with the <a href="#docker-engine">command</a> below),
- Run `database` service with the following command:

```bash id="docker-engine"
  docker-compose up database
```

Now you can continue the deployment the way you want.

### Deploy with Docker

Firstly, make sure you have Docker engine installed on your device! You can check this with the following command:

```bash
  docker --version
```

After that, you only need to run this one command:

```bash
  docker-compose up
```

This might take a few minutes, but once it's done, you can use the app! Check http://localhost:4200 !

### Deploy locally

#### Backend

Check if you're in the right folder (todo) and navigate to the `backend` folder and run the necessary commands:

```bash
  cd ./backend
  npm i
  npm run start
```

#### Frontend

If the backend is up and running, navigate to 'frontend' folder and run the following commands:

```bash
  cd ..
  cd ./frontend
  npm i
  npm run start
```

Check http://localhost:4200.

Now you're all set! Have fun using the app! :D
