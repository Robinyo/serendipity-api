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

To check the environment variables inside your container:

```
docker inspect -f \
  '{{range $index, $value := .Config.Env}}{{println $value}}{{end}}' \
  serendipity-api
```

To check the logs inside your container:

```
docker container logs openldap
docker container logs keycloak
docker container logs postgres
docker container logs serendipity-api
```

To launch the H2 console:

```
# SPRING_DATASOURCE_URL=jdbc:h2:/h2/serendipity
# SPRING_DATASOURCE_USERNAME=admin
# SPRING_DATASOURCE_PASSWORD=secret

http://localhost:3001/h2-console
```

For example:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/h2-console.png">
</p>

To view the OpenAPI specification in ReDoc:

```
http://localhost:3001/docs/index.html
```

You can stop the containers using the following command:

```
docker-compose down -v
```
