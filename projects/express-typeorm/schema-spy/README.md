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

### SchemaSpy

SchemaSpy properties file (`schemaspy.properties`):

```
schemaspy.t=sqlite
schemaspy.db=../serendipity.db
schemaspy.sso=true
schemaspy.o=./docs
schemaspy.cat=serendipity
schemaspy.s=serendipity
```

### Run SchemaSpy

```
cd schema-spy
java -jar schemaspy-6.0.0.jar -renderer :quartz
```

## Resources

* Schema Spy website: [Getting Started](http://schemaspy.org/)
* GitHub: [SchemaSpy](https://github.com/schemaspy/schemaspy)
* Read the Docs: [SchemaSpy](https://schemaspy.readthedocs.io/en/latest/started.html)




