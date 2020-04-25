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
cd ~/workspace
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

By default, [certain folders](https://flowable.com/open-source/docs/bpmn/ch05a-Spring-Boot/#flowable-application-properties) on the classpath are automatically scanned:

- /apps: By default looks for all files ending with .zip or .bar and deploys them
- /cases: By default looks for all files ending with .cmmn, .cmmn11, .cmmn.xml or .cmmn11.xml and deploys them
- /dmn: By default looks for all files ending with .dmn, .dmn11, .dmn.xml or .dmn12.xml and deploys them
- /forms: By default looks for all files ending with .form and deploys them
- /processes: By default looks for all files ending with .bpmn20.xml or .bpmn and deploys them

Open your browser and try:

```
http://localhost:3001/api/whoami
http://localhost:3001/api/individuals
http://localhost:3001/api/individuals/1
http://localhost:3001/process-api/runtime/tasks
http://localhost:3001/h2-console
```

## Flowable UI Applications

- Flowable Identity Management
- Flowable Modeler
- Flowable Task
- Flowable Admin

**Note:** You can [download](https://flowable.com/open-source/downloads/) the Flowable open source distribution from the Flowable web site.

### Externalised Configuration

The Flowable Web applications take advantage of Spring Boot's support for externalised configuration: 

```
spring.main.banner-mode=off

# Logging
logging.level.root=INFO
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
logging.level.org.springframework.security=DEBUG

# Spring JPA
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:~/serendipity-db/db;AUTO_SERVER=TRUE;AUTO_SERVER_PORT=9091;DB_CLOSE_DELAY=-1
spring.datasource.username=admin
spring.datasource.password=secret
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update

# Default Admin Accounts
flowable.idm.app.admin.user-id=flowable
flowable.idm.app.admin.password=secret
flowable.idm.app.admin.first-name=
flowable.idm.app.admin.last-name=Administrator
flowable.idm.app.admin.email=admin@serendipity.org.au

flowable.common.app.idm-admin.user=flowable
flowable.common.app.idm-admin.password=secret

flowable.modeler.app.deployment-api-url=http://localhost:9999/flowable-task/app-api

# LDAP
flowable.idm.ldap.enabled=true
flowable.idm.ldap.server=ldap://localhost
flowable.idm.ldap.port=10389
flowable.idm.ldap.user=cn=admin,dc=flowable,dc=org
flowable.idm.ldap.password=secret
flowable.idm.ldap.base-dn=dc=flowable,dc=org
flowable.idm.ldap.user-base-dn=ou=users,dc=flowable,dc=org
flowable.idm.ldap.group-base-dn=ou=groups,dc=flowable,dc=org
flowable.idm.ldap.query.user-by-id=(&(objectClass=inetOrgPerson)(uid={0}))
flowable.idm.ldap.query.user-by-full-name-like=(&(objectClass=inetOrgPerson)(|({0}=*{1}*)({2}=*{3}*)))
flowable.idm.ldap.query.all-users=(objectClass=inetOrgPerson)
flowable.idm.ldap.query.groups-for-user=(&(objectClass=groupOfUniqueNames)(uniqueMember={0}))
flowable.idm.ldap.query.all-groups=(objectClass=groupOfUniqueNames)
flowable.idm.ldap.query.group-by-id=(&(objectClass=groupOfUniqueNames)(uniqueId={0}))
flowable.idm.ldap.attribute.user-id=uid
flowable.idm.ldap.attribute.first-name=cn
flowable.idm.ldap.attribute.last-name=sn
flowable.idm.ldap.attribute.email=mail
flowable.idm.ldap.attribute.group-id=cn
flowable.idm.ldap.attribute.group-name=cn
flowable.idm.ldap.cache.group-size=10000
flowable.idm.ldap.cache.group-expiration=180000
```

### Flowable Identity Management

To launch Flowable's Identity Management application:

```
java -jar flowable-idm.war
```

Then navigate to: http://localhost:8080/flowable-idm

### Flowable Modeler

To launch Flowable's Modeler application:

```
java -jar flowable-modeler.war
```

Then navigate to: http://localhost:8888/flowable-modeler

### Flowable Task

To launch Flowable's Task application:

```
java -jar flowable-task.war
```

Then navigate to: http://localhost:9999/flowable-task

### Flowable Admin

To launch Flowable's Admin application:

```
java -jar flowable-admin.war
```

Then navigate to: http://localhost:9988/flowable-admin

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

## Docker

### Build an Image

You can use the sample 
[Dockerfile](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/server/Dockerfile) to build an 
application image:

```
docker build -t robinyo/serendipity-api .
```

**Note:** Replace `robinyo` with your Docker Hub username.

Where is your image? It’s in your machine’s local Docker image registry:

```
docker image ls
```

You should see output like:

```
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
robinyo/serendipity-api   latest              39819e4c19c9        12 minutes ago      284MB
```

### Run the Image

For example:

```
docker run --name serendipity-api \
  -p 3001:3001 \
  -v ~/serendipity-db:/serendipity-db \
  -e "spring.datasource.url=jdbc:h2:/serendipity-db/db;AUTO_SERVER=TRUE;AUTO_SERVER_PORT=9091;DB_CLOSE_DELAY=-1" \
  robinyo/serendipity-api
```

To list all running containers:

```
docker container ls
```

To stop a container:

```
docker container stop [name]
```

For example:

```
docker container stop serendipity-api
```

To remove a container:

```
docker container rm CONTAINER_ID
```

To delete an image:

```
docker image rm IMAGE_ID --force
```

To remove all unused objects:

```
docker system prune
```

## Docker Compose

### Build an Image

You can use the sample 
[Dockerfile](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/server/Dockerfile) and 
[docker-compose.yml](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docker-compose.yml) to build an 
application image:

```
docker-compose build
```

### Run the Image

For example:

```
docker-compose up -d
```
