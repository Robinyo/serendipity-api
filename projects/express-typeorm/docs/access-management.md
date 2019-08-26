# Access Management

## Quick Start

The goal of this guide is to help you understand Serendipity's approach to Access Management.

### Standard Claims

This specification defines a set of [standard](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) 
Claims. They can be returned either in the ID Token or the UserInfo response.

### Scopes

Scope names follow a simple convention: &lt;namespace&gt;:&lt;operation&gt; where <namespace> refers to a resource (e.g., document,
collection, store, or controller) and &lt;operation&gt; refers to the action to be performed on the resource.

### Individual Scopes

| Name                   | Description                                       |
| ---------------------- | ------------------------------------------------- |
| individuals:read       | Required to view records.                         |
| individuals:read.email | Required to view an Individual's email addresses. |
| individuals:write      | Required to write records.                        |

## Resources

### OpenAPI (Swagger) Resources
* Swagger blog: [A Guide to What’s New in OpenAPI 3.0](https://swagger.io/blog/news/whats-new-in-openapi-3-0/)

### Auth Resources
* Internet Engineering Task Force: [OAuth 2.0 for Browser-Based Apps](https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/)
* Internet Engineering Task Force: [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/draft-ietf-oauth-security-topics/)

### Additional Auth Resources
* Robert Broeckelmann's blog: [API Management, Integration, and Identity–especially where these three intersect](https://medium.com/@robert.broeckelmann)
* Brock Allen's blog: [The State of the Implicit Flow in OAuth2](https://brockallen.com/2019/01/03/the-state-of-the-implicit-flow-in-oauth2/)
* Auth0 blog: [OAuth2 Implicit Grant and SPA](https://auth0.com/blog/oauth2-implicit-grant-and-spa/)
* Scott Brady's blog: [SPA Authentication using OpenID Connect, Angular CLI and oidc-client](https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client)
* Scott Brady's blog: [Silent Refresh - Refreshing Access Tokens when using the Implicit Flow](https://www.scottbrady91.com/OpenID-Connect/Silent-Refresh-Refreshing-Access-Tokens-when-using-the-Implicit-Flow)
* Scott Brady's blog: [Migrating oidc-client-js to use the OpenID Connect Authorization Code Flow and PKCE](https://www.scottbrady91.com/Angular/Migrating-oidc-client-js-to-use-the-OpenID-Connect-Authorization-Code-Flow-and-PKCE)

### Angular Auth Libraries
* GitHub: [Angular OAuth 2.0 OICD](https://github.com/manfredsteyer/angular-oauth2-oidc)
* GitHub: [Okta Angular SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular)

**Note:** Both libraries (above) currently only support the 'OAuth 2.0 Implicit Flow'.

* GitHub: [OpenID Connect Code Flow with PKCE, Implicit Flow](https://github.com/damienbod/angular-auth-oidc-client)

### Other Auth Libraries
* GitHub: [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)

**Note:** This library (above) currently supports the 'OAuth 2.0 Authorization Code Flow with PKCE'.

### Authorisation Servers
* GitHub: [Keycloak - Open Source Identity and Access Management](https://www.keycloak.org/)
