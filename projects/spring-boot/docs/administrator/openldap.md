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

Sample output:

```
# extended LDIF
#
# LDAPv3
# base <dc=flowable,dc=org> with scope subtree
# filter: (objectclass=*)
# requesting: ALL
#

# flowable.org
dn: dc=flowable,dc=org
objectClass: top
objectClass: dcObject
objectClass: organization
o: flowable
dc: flowable

# admin, flowable.org
dn: cn=admin,dc=flowable,dc=org
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: admin
description: LDAP administrator
userPassword:: e1NTSEF9ZGpXajIvR1ZLQW00K3FZeXF4M2hJMkl0RjJvankzbmw=

# users, flowable.org
dn: ou=users,dc=flowable,dc=org
objectClass: organizationalUnit
objectClass: extensibleObject
objectClass: top
ou: users
description: All users in the organisation

# groups, flowable.org
dn: ou=groups,dc=flowable,dc=org
objectClass: organizationalUnit
objectClass: extensibleObject
objectClass: top
ou: groups
description: All groups in the organisation

# Administrator, users, flowable.org
dn: cn=Administrator,ou=users,dc=flowable,dc=org
objectClass: inetOrgPerson
cn: Flowable
cn: Administrator
sn: Administrator
mail: admin@serendipity.org.au
uid: flowable
userPassword:: ZEdWemRBPT0=

# search result
search: 2
result: 0 Success

# numResponses: 6
# numEntries: 5
```

You can also use an [LDAP Browser](https://directory.apache.org/apacheds/) to manage OpenLDAP:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/ldap-browser.png">
</p>

Network settings:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/ldap-network-parameters.png">
</p>

Authentication settings:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/ldap-authentication.png">
</p>