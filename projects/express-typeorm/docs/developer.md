# Serendipity API Developer Documentation

## Quick Start

The goal of this guide is to help you build and run Serendipity's API.

### Step 1. Set up the Development Environment 

You need to set up your development environment before you can do anything.

Open a terminal window and install [Node.js (and npm)](https://nodejs.org/en/download/) and [git](https://git-scm.com/) if they are not already on your machine.

> Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

### Step 2. Clone the project 

Change the current working directory to the location where you want the cloned directory to be:

```
cd ~/workspaces
```

Clone the project by running the following command:

```
git clone https://github.com/Robinyo/serendipity-api
```

### Step 4: Serve the application 

Go to the project directory, install the project's dependencies and launch the server:

```
cd serendipity-api/projects/express-typeorm
npm install

npm start
```

Open your browser and try `http://localhost:3001/api/contacts`
