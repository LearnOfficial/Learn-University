---
sidebar_position: 2
---


# Authentication and Authorization
Authentication and authorization are 
critical aspects of Learn Server because 
each user has unique permissions that 
dictate what data they can access and 
what actions they can perform on behalf 
of themselves or others.
## Authentication
To create the authorization key, we use
the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
library to sign a payload
that includes sensitive information about 
the user. This key is generated without 
the need for additional user credentials 
and is used to authenticate the user for 
subsequent requests,while also encrypting 
any sensitive data that is transmitted over 
the network.

If you'd like to experiment with JSON Web 
Tokens, you can try out the following
[jwt](https://jwt.io/).

This site allows you to 
play around with the structure and contents 
of JWTs, and can be a helpful tool for 
understanding how they work.

Currently, the signup resolver at `LearnerResolver.ts`
generates the authentication token, while the actual 
authentication check is performed in the
`auth_checker.ts` file.

## Authorization
After the token is created, it can be used
to perform queries and mutations according
to the permissions of the user. However, this
functionality is not yet implemented.

[Future]: Implemented auth with [auth0](https://auth0.com/).


