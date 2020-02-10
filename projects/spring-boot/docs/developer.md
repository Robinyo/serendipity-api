# Serendipity API Developer Documentation

## Quick Start

The goal of this guide is to help you build and run Serendipity's API.

### Step 1. Set up the Development Environment 

You need to set up your development environment before you can do anything.

What you need:

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
http://localhost:3001/api/whoami
http://localhost:3001/api/individuals
http://localhost:3001/api/individuals/1
http://localhost:3001/process-api/runtime/tasks
http://localhost:3001/h2-console
```

## Flowable UI Applications

Flowable's web applications:

- Flowable Identity Management: http://localhost:8080/flowable-idm
- Flowable Modeler: http://localhost:8888/flowable-modeler
- Flowable Task: http://localhost:9999/flowable-task
- Flowable Admin: http://localhost:9988/flowable-admin

Flowable's web application configuration properties:

```
...

# Spring JPA
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:~/serendipity-db/db;AUTO_SERVER=TRUE;AUTO_SERVER_PORT=9091;DB_CLOSE_DELAY=-1
spring.datasource.username=admin
spring.datasource.password=secret
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update

# DEFAULT ADMINISTRATOR ACCOUNTS
flowable.idm.app.admin.user-id=admin
flowable.idm.app.admin.password=secret
flowable.idm.app.admin.first-name=
flowable.idm.app.admin.last-name=Administrator
flowable.idm.app.admin.email=admin@serendipity.org.au
```

**Note:** You can [download](https://flowable.com/open-source/downloads/) the Flowable open source distribution from the Flowable web site.

### Flowable Identity Management

To launch Flowable's Identity Management application:

```
java -jar flowable-idm.war
```

### Development

To build the project:

```
mvn clean
mvn package
```
       
To launch the project:

```
java -jar target/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar
```
