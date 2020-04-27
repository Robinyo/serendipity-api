<h1 align="center">Working with OpenLDAP</h1>

### Export and Import

#### Import

To import an LDIF (LDAP Data Interchange Format) file place the file in the following location:

```
├── /spring-boot
    └── /server
        └── /services
            └── /openldap
                └── /ldif
                    ├── flowable.ldif
                ├── Dockerfile
                ├── openldap.env
```

All the files in the `/ldif` directory will be copied to the OpenLDAP container: 

```
COPY ldif /container/service/slapd/assets/config/bootstrap/ldif/custom
```
