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

- Angular for frontend
- Nest.js for backend
- MongoDB for database

## Getting started

You can deploy this app two ways: locally or with Docker, but firstly install the project.

```bash
  npm install to-do
  cd to-do
```

### Deploy locally

Check if you're in the right folder (to-do), then navigate to 'forntend' folder and run the following commands:

```bash
  npm i
  npm run start
```

Check http://localhost:4200 (You can't add tasks yet!).

If the frontend is running navigate to the 'backend' folder and run the necessary command.

```bash
  cd ..
  cd ./backend
  npm run start
```

Now you're all set! Have fun using the app! :D

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
