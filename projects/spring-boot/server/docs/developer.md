# Serendipity API Developer Documentation

## Quick Start

The goal of this guide is to help you build and run Serendipity's API.

### Step 1. Set up the Development Environment 

You need to set up your development environment before you can do anything.

What You Need:

* JDK 1.8 or later
* Maven 3.2 or later

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
cd serendipity-api/projects/spring-boot/server
mvn spring-boot:run
```

### Step 4: Seed the Database

In another terminal session: 

TODO

Open your browser and try:

```
http://localhost:3001/api/individuals
http://localhost:3001/api/individuals/4
http://localhost:3001/api/organisations
http://localhost:3001/docs
```

