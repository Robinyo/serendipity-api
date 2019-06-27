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

### Step 3: Serve the application 

Go to the project directory, install the project's dependencies and launch the server:

```
cd serendipity-api/projects/express-typeorm
npm install

npm start
```

Open your browser and try `http://localhost:3001/api/contacts`

## Build Management

### TypeORM

TypeORM supports multiple configuration sources. 

For example, [ormconfig.json](https://typeorm.io/#/using-ormconfig):

```
{
  "type": "sqlite",
  "database": "serendipity.db",
  "synchronize": true,
  "logging": true,
  "entities": [
    "src/entitys/**/*.ts"
  ],
  "migrations": [
    "src/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscribers/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entitys",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscribers"
  }
}
```

## Resources

### Node.js Resources

* GitHub: [Node.js Best Pactices](https://github.com/i0natan/nodebestpractices)
* GitHub: [A starter template for TypeScript and Node.js](https://github.com/microsoft/TypeScript-Node-Starter)

### TypeORM Resources

* GitHub: [TypeORM - ORM for TypeScript and JavaScript](https://github.com/typeorm/typeorm)
* TypeORM.io: [Getting Started Guide](https://typeorm.io/#/)




