<h1 align="center">Build Management</h1>

### Getting Started

Follow the steps in the [Quick Start Guide](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/developer/quick-start-guide.md).

### Development

To build the API:

```
# In the project's server directory: /server

mvn clean install spring-boot:repackage
```

To build the project:

```
docker-compose build
```

To serve the applications:

```
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