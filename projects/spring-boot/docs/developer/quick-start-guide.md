<h1 align="center">Quick Start Guide</h1>

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

What you need:

* JDK 11 or later
* Maven 3.2 or later

### Step 2: Clone the project 

Change the current working directory to the location where you want the cloned directory to be:

```
cd ~/workspace
```

Clone the project by running the following command:

```
git clone https://github.com/Robinyo/serendipity-api
cd serendipity-api/projects/spring-boot
``` 

### Step 3: Serve the application

To run a multi-container application with the Docker CLI, you use the `docker-compose up` command. 
This command uses the project's [docker-compose.yml](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/server/docker-compose.yml) 
file to deploy a multi-container application:

```
# In the project's server directory: spring-boot/server

docker-compose up -d
```

The OpenLDAP, Keycloak and Serendipity API containers may take a minute or two to startup. 

You can check the status of the containers using the following command:

```
docker-compose ps
```

You can stop the containers using the following command:

```
docker-compose down -v
```

### Resources

* [Spring HATEOAS Examples - Spring HATEOAS and Spring Data REST](https://github.com/spring-projects/spring-hateoas-examples/tree/master/spring-hateoas-and-spring-data-restceserver)
* [Spring Security - OAuth 2.0 Resource Server Sample](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2resourceserver)
