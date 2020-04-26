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

Check 'User registration', 'Remember me' and 'Edit username'. Uncheck everything else and then click the 'Save' button.

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

Serendipity's Progressive Web App (PWA) uses OpenID Connect to interact with Keycloak. The 'Access Type' should be public.
Check 'Standard Flow Enabled', 'Implicit Flow Enabled' and 'Direct Access Grants Enabled', enter a Valid Redirect URI (e.g., http://localhost:4200/*), enter a valid Web Origins (e.g., *) and then click the 'Save' button.

**Note:** Standard Flow is Keycloak's name for the OpenID Connect Authorization Code Flow.

### Resources

#### Keycloak-related Blog Posts 

* Rob Ferguson's blog: [Getting started with Keycloak](https://robferguson.org/blog/2019/12/24/getting-started-with-keycloak/)
* Rob Ferguson's blog: [Angular, OpenID Connect and Keycloak](https://robferguson.org/blog/2019/12/29/angular-openid-connect-keycloak/)
* Rob Ferguson's blog: [Angular, OAuth 2.0 and Keycloak](https://robferguson.org/blog/2019/12/31/angular-oauth2-keycloak/)
* Rob Ferguson's blog: [Keycloak, Flowable and OpenLDAP](https://robferguson.org/blog/2020/01/03/keycloak-flowable-and-openldap/)
* Rob Ferguson's blog: [Flowable OAuth2 Resource Server](https://robferguson.org/blog/2020/02/05/flowable-oauth2-resource-server/)
* Rob Ferguson's blog: [Keycloak Themes - Part 1](https://robferguson.org/blog/2020/04/12/keycloak-themes-part-1/)
* Rob Ferguson's blog: [Keycloak Themes - Part 2](https://robferguson.org/blog/2020/04/17/keycloak-themes-part-2/)