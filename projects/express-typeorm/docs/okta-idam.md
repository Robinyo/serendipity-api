# Okta

## Identity and Access Management

### OpenID Connect (OIDC)

When working with OIDC, you’ll hear talk of various “flows”.

These flows are used to describe common authentication and authorization scenarios. Considerations include the type of application 
(like web-based or native mobile app), how you want to validate tokens (in the app or in the backend), and how you want to access 
additional identity information (make another API call or have it encoded right into a token).

There are three primary flows: Authorization Code, Implicit, and Hybrid. 

These flows are controlled by the `response_type` query parameter in the /authorization request.

### Scopes

OpenID Connect uses scope values to specify which access privileges are being requested for access tokens.

The scopes associated with access tokens determine the claims that are available when they are used to access the 
OIDC `/userinfo` endpoint.

See: [Okta OIDC Scopes](https://developer.okta.com/docs/reference/api/oidc/#scopes)

## Resources

### Auth Resources
* Okta docs: [API Security - Authorization](https://developer.okta.com/books/api-security/authz/)
* Okta docs: [Authorization - Role-Based Access Control](https://developer.okta.com/books/api-security/authz/role-based/#authz-role-based)
* Okta docs: [Authorization - Attribute-Based Access Control](https://developer.okta.com/books/api-security/authz/attribute-based/)
