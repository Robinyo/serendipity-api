# Access Management

## Quick Start

The goal of this guide is to help you understand Serendipity's approach to Access Management.

### Standard Claims

This specification defines a set of [standard](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) 
Claims. They can be returned either in the ID Token or the UserInfo response.

### Scopes

Scope names follow a simple convention: <namespace>:<operation> where <namespace> refers to a resource (e.g., document,
collection, store, and controller) and <operation> refers to the action to be performed on the resource.

### Individual Scopes

| Name                   | Description                                       |
| ---------------------- | ------------------------------------------------- |
| individuals:read       | Required to view records.                         |
| individuals:read.email | Required to view an Individual's email addresses. |
| individuals:write      | Required to write records.                        |

## Resources

* GitHub: [Keycloak - Open Source Identity and Access Management](https://www.keycloak.org/)

### Angular Auth Libraries
* GitHub: [Okta Angular SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular)
* GitHub: [Angular OAuth 2.0 OICD](https://github.com/manfredsteyer/angular-oauth2-oidc)

**Note:** Both libraries (above) currently only support the 'OAuth 2.0 Implicit Flow'.

* GitHub: [OpenID Connect Code Flow with PKCE, Implicit Flow](https://github.com/damienbod/angular-auth-oidc-client)

### Other Auth Libraries
* GitHub: [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)

### Auth Resources
* Brock Allen's blog: [The Implicit Flow](https://brockallen.com/2019/01/03/the-state-of-the-implicit-flow-in-oauth2/)
* Auth0 blog: [OAuth2 Implicit Grant and SPA](https://auth0.com/blog/oauth2-implicit-grant-and-spa/)
