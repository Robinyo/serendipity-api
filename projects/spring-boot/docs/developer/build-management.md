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

To check the environment variables inside your container:

```
docker inspect -f \
  '{{range $index, $value := .Config.Env}}{{println $value}}{{end}}' \
  serendipity-api
```

To check the logs inside your container:

```
docker container logs serendipity-api
```

You can stop the containers using the following command:

```
docker-compose down -v
```

### Flowable

By default, [certain folders](https://flowable.com/open-source/docs/bpmn/ch05a-Spring-Boot/#flowable-application-properties) on the classpath are automatically scanned:

- /apps: By default looks for all files ending with .zip or .bar and deploys them
- /cases: By default looks for all files ending with .cmmn, .cmmn11, .cmmn.xml or .cmmn11.xml and deploys them
- /dmn: By default looks for all files ending with .dmn, .dmn11, .dmn.xml or .dmn12.xml and deploys them
- /processes: By default looks for all files ending with .bpmn20.xml or .bpmn and deploys them

For example:

```
├── /spring-boot
    └── /server
        └── /src
            └── /main
                └── /java
                └── /resources
                    └── /apps
                    └── /cases
                    └── /dmn
                    └── /processes
```

### Flowable UI Applications

- Flowable Identity Management
- Flowable Modeler
- Flowable Task
- Flowable Admin

**Note:** You can [download](https://flowable.com/open-source/downloads/) the Flowable open source distribution from the Flowable web site.

#### Externalised Configuration

The Flowable UI applications take advantage of Spring Boot's support for externalised configuration: 

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

#### Flowable Identity Management

To launch Flowable's Identity Management application:

```
java -jar flowable-idm.war
```

Then navigate to: http://localhost:8080/flowable-idm

#### Flowable Modeler

To launch Flowable's Modeler application:

```
java -jar flowable-modeler.war
```

Then navigate to: http://localhost:8888/flowable-modeler

#### Flowable Task

To launch Flowable's Task application:

```
java -jar flowable-task.war
```

Then navigate to: http://localhost:9999/flowable-task

#### Flowable Admin

To launch Flowable's Admin application:

```
java -jar flowable-admin.war
```

Then navigate to: http://localhost:9988/flowable-admin

### Resources

* [Spring HATEOAS - Representation Models](https://docs.spring.io/spring-hateoas/docs/current/reference/html/#migrate-to-1.0.changes.representation-models)
* [Spring HATEOAS Examples - Spring HATEOAS and Spring Data REST](https://github.com/spring-projects/spring-hateoas-examples/tree/master/spring-hateoas-and-spring-data-restceserver)
* [Spring Security - OAuth 2.0 Resource Server Sample](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2resourceserver)
