<h1 align="center">Working with Keycloak</h1>

### Export and Import

#### Export

To export a realm into a single JSON file:

```
docker exec -it keycloak /opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=100 \
  -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.realmName=development \
  -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
  -Dkeycloak.migration.file=/export/development-realm.json
```

When the export is complete use `Ctrl-C` to exit the session.

#### Import

To import a realm file place the (previously exported) file in the following location:

```
├── /spring-boot
    └── /server
        └── /services
            └── /keycloak
                └── /json
                    ├── development-realm.json
                    ├── production-realm.json
                ├── Dockerfile
                ├── keycloak.env
```

All the files in the `/json` directory will be copied to the Keycloak container: 

```
COPY json /tmp
```

If more than one realm file needs to be imported, a comma separated list of file names can be specified:

```
KEYCLOAK_IMPORT=/tmp/development-realm.json, /tmp/production-realm.json
```
 
**Reference:** [Server Administration Guide - Export and Import](https://www.keycloak.org/docs/latest/server_admin/index.html#_export_import)

### Getting Started

Follow the steps in the [Quick Start Guide](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/developer/quick-start-guide.md).

Navigate to the Keycloak Welcome page: http://localhost:10001

Login to the Administration Console using the KEYCLOAK_USER (admin) and KEYCLOAK_PASSWORD (secret) credentials.

### Create a New Realm

The Master realm should only be used to create and manage other realms. To create a new realm, click 'Add realm' from the Master drop-down menu:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/master-drop-down-menu.png">
</p>

Enter a Name:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/add-realm.png">
</p>

Then click the 'Create' button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/development-realm.png">
</p>

#### Login Page Settings

Click 'Realm Settings' in the sidemenu and then click on the 'Login' tab:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/realm-settings-login.png">
</p>

Check 'User registration', 'Edit username' and 'Remember me'. Uncheck everything else and then click the 'Save' button.

### Create a New Client

Every application that interacts with Keycloak is considered to be a client.

To create a new client in the `development` realm click 'Clients' in the sidemenu and then click the 'Create' button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/add-client.png">
</p>

Enter a Client ID and then click the 'Save' button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/clients-settings.png">
</p>

Serendipity's Progressive Web App (PWA) uses OpenID Connect to interact with Keycloak.
 
The 'Access Type' should be public. Check 'Standard Flow Enabled', 'Implicit Flow Enabled' and 'Direct Access Grants 
Enabled', enter a Valid Redirect URI (e.g., `http://localhost:4200/*`), enter a valid Web Origins (e.g., `*`) and then click the 'Save' button.

**Note:** Standard Flow is Keycloak's name for the OpenID Connect Authorization Code Flow.

### Roles

Roles identify a type or category of user. Serendipity assigns permissions to roles rather than to individual users. 

Serendipity has four default roles:

* Guest
* User
* Manager
* Administrator

#### Realm Roles

To create a new role in the `development` realm click 'Roles' in the sidemenu and then click the 'Add Role' button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/roles-add-role.png">
</p>

Enter a Role Name:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/add-role.png">
</p>

Then click the 'Save' button.

I created four realm roles:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/realm-roles.png">
</p>

#### Default Roles

New users (user registrations) will be assigned the 'Guest' role:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/roles-default-roles.png">
</p>

### Client Scopes

Serendipity's REST API uses scopes to protect resources, for example:

* individual:post
* individual:get
* individual:patch
* individual:delete

To create a new scope in the `development` realm click 'Client Scopes' in the sidemenu and then click the 'Create' button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/client-scopes-create.png">
</p>

Enter a Name:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/create-scope.png">
</p>

Then click the 'Save' button.

I created four client scopes:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/client-scopes.png">
</p>

#### Link Client Scope with the Client

Linking between client scope and client is configured in the Client Scopes tab of the particular client. 

I linked the client scopes with the client (serendipity-pwa):

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/serendipity-pwa-client-scopes.png">
</p>

#### Scope Mappings

Scope mappings allow you to restrict which user role mappings are included within the access token requested by the client.

I linked the `individual:get` scope with the **Guest** role and the **User** role:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/individual-get-assigned-roles.png">
</p>

I also linked the `individual:post` and the `individual:patch` scopes with the **User** role. I linked the `individual:delete` scope with the **Manager** role.

If the scope parameter contains the required scopes:

```
scope: 'openid profile email phone address offline_access individual:post individual:get individual:patch individual:delete'
```

And the user has the assigned roles:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/role-mappings.png">
</p>

Then the access token will contain the requested scopes:

```
{
  "jti": "7ffcbecf-294c-404b-b199-ff066c065e43",
  "exp": 1577743029,
  "nbf": 0,
  "iat": 1577742729,
  "iss": "http://localhost:10001/auth/realms/development",
  "aud": "account",
  "sub": "28bb3e03-835f-4b52-be72-d61fc4ddcb9c",
  "typ": "Bearer",
  "azp": "serendipity-pwa",
  "auth_time": 1577742728,
  "session_state": "b7f63e8b-6e2b-41d3-95f1-e6e9022b82cb",
  "acr": "1",
  "allowed-origins": [
    "*"
  ],
  "realm_access": {
    "roles": [
      "User",
      "Manager"
    ]
  },
  "scope": "openid individual:patch offline_access email phone address individual:post profile individual:get individual:delete",
  "email_verified": true,
  "address": {},
  "name": "Rob Ferguson",
  "preferred_username": "rob.ferguson@robferguson.org",
  "given_name": "Rob",
  "family_name": "Ferguson",
  "email": "rob.ferguson@robferguson.org"
}
```

### Groups

Groups manage groups of users. Users that become members of a group inherit the group's permissions.

#### Create Protocol Mapper

To include 'groups' in the Access Token we need to create a Protocol Mapper:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/clients-create-protocol-mapper.png">
</p>

### User Storage Federation

Serendipity uses OpenLDAP to store user credentials.

#### Adding a Provider

To add a storage provider in the `development` realm click 'User Federation' in the sidemenu and then choose 'ldap' as the provider:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/user-federation-ldap.png">
</p>

Check 'Enabled' and 'Import Users' then select 'Edit Mode: WRITABLE' and check 'Sync Registrations' so that 
[user registrations](https://www.keycloak.org/docs/latest/server_admin/index.html#_user-registration) will be created in OpenLDAP.

Select 'Vendor: Other' and enter 'uid' for the 'Username LDAP attribute', the 'RDN LDAP attribute' and the 'UID LDAP attribute'.

I'm using [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/) hence the need to use the special DNS name: `host.docker.internal`

**Reference:** [Server Administration Guide - User Storage Federation](https://www.keycloak.org/docs/latest/server_admin/index.html#_user-storage-federation)
