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

### Getting Started

Follow the steps in the [Quick Start Guide](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/developer/quick-start-guide.md).

When you launch the image it will create the organisation (flowable), create the domain (flowable.org) and set the LDAP administrator's password (secret).

Let's check and see:

```
docker exec openldap ldapsearch -x -H ldap://localhost -b dc=flowable,dc=org -D "cn=admin,dc=flowable,dc=org" -w secret
```

You can also use an [LDAP Browser](https://directory.apache.org/apacheds/) to manage OpenLDAP:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/ldap-browser.png">
</p>

Network settings:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots//ldap-network-parameters.png">
</p>

Authentication settings:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots//ldap-authentication.png">
</p>