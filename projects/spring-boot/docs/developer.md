# Serendipity API Developer Documentation

## Quick Start

The goal of this guide is to help you build and run Serendipity's API.

### Step 1. Set up the Development Environment 

You need to set up your development environment before you can do anything.

What you need:

* JDK 11 or later
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

Open your browser and try:

```
http://localhost:3001/api/whoami
http://localhost:3001/api/individuals
http://localhost:3001/api/individuals/1
http://localhost:3001/process-api/runtime/tasks
http://localhost:3001/h2-console
```

## Flowable Applications

Flowable's UI Web [applications](https://flowable.com/open-source/docs/bpmn/ch14-Applications/):

- Flowable Identity Management: http://localhost:8080/flowable-idm
- Flowable Modeler: http://localhost:8888/flowable-modeler
- Flowable Task: http://localhost:9999/flowable-task
- Flowable Admin: http://localhost:9988/flowable-admin

**Note:** You can [download](https://flowable.com/open-source/downloads/) the Flowable open source distribution from the Flowable web site.

### Externalised Configuration

Flowable takes advantage of Spring Boot's support for [externalised configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-externalize-configuration): 
[application.properties](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/server/flowable/wars/application.properties):

### Resource Deployment

By default, certain folders on the classpath are automatically scanned:

- apps: By default looks for all files ending with .zip or .bar and deploys them
- cases: By default looks for all files ending with .cmmn, .cmmn11, .cmmn.xml or .cmmn11.xml and deploys them
- dmn: By default looks for all files ending with .dmn, .dmn11, .dmn.xml or .dmn12.xml and deploys them
- forms: By default looks for all files ending with .form and deploys them
- processes: By default looks for all files ending with .bpmn20.xml or .bpmn and deploys them

For example:

```
flowable.cmmn.resource-location=classpath*:/cases/
flowable.cmmn.resource-suffixes=**.cmmn,**.cmmn11,**.cmmn.xml,**.cmmn11.xml
flowable.dmn.resource-location=classpath*:/dmn/
flowable.dmn.resource-suffixes=**.dmn,**.dmn.xml,**.dmn11,**.dmn11.xml
flowable.form.resource-location=classpath*:/forms/
flowable.form.resource-suffixes=**.form
flowable.process-definition-location-prefix=classpath*:/processes/
flowable.process-definition-location-suffixes=**.bpmn20.xml,**.bpmn
```

### Flowable Identity Management

To launch Flowable's Identity Management application:

```
java -jar flowable-idm.war
```

### Flowable Modeler

To launch Flowable's Modeler application:

```
java -jar flowable-modeler.war
```

### Flowable Task

To launch Flowable's Task application:

```
java -jar flowable-task.war
```

### Flowable Admin

To launch Flowable's Admin application:

```
java -jar flowable-admin.war
```

## Development

To build the project:

```
mvn clean
mvn package
```
       
To launch the project:

```
java -jar target/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar
```
