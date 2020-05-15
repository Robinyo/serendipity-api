# SchemaSpy

The Entity Relationship (ER) diagram generator.

## Build Management

### SQLite

SQLite properties file (`sqlite.properties`):

```
description=SQLite
connectionSpec=jdbc:sqlite:<db>
driver=org.sqlite.JDBC
driverPath=sqlite-jdbc-3.27.2.1.jar
```

### H2

H2 properties file (`h2.properties`):

```
description=H2 Server
connectionSpec=jdbc:h2:<db>
db=./h2/serendipity
driver=org.h2.Driver
driverPath=h2-1.4.200.jar
```

### SchemaSpy

SchemaSpy properties file (`schemaspy.properties`):

```
schemaspy.t=h2
schemaspy.db=./h2/serendipity
schemaspy.o=./docs
schemaspy.cat=SERENDIPITY
schemaspy.s=PUBLIC
```

### Run SchemaSpy

```
cd schema-spy
java -jar schemaspy-6.1.0.jar -renderer :quartz -u admin -p secret
```

## Resources

* Schema Spy website: [Getting Started](http://schemaspy.org/)
* Read the Docs: [SchemaSpy](https://schemaspy.readthedocs.io/en/latest/started.html)
* GitHub: [SchemaSpy](https://github.com/schemaspy/schemaspy)





