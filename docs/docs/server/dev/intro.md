---
sidebar_position: 1
---

# Introduction
The Learn Server is where the business logic of Learn's client capabilities 
is stored and managed. This includes processes such as user registration,
file storage, and more.

# Libraries
## Production Libraries
The production libraries are critical to the proper functioning of 
Learn Server. These libraries serve as the backbone of the server, 
and without them, the server cannot perform its intended operations.

* [@apollo/server](https://github.com/apollographql/apollo-server): A GraphQL server implementation for creating 
API backends.
* [GraphQL](https://github.com/graphql/graphql-js): A query language and runtime for APIs, often used 
with Node.js.
* [mysql2](https://github.com/sidorares/node-mysql2): A fast, easy-to-use MySQL client for Node.js.
* [reflect-metadata](https://github.com/rbuckton/reflect-metadata): Adds metadata reflection to TypeScript 
decorators.
* [type-graphql](https://github.com/MichalLytek/type-graphql): Create GraphQL APIs using TypeScript 
classes and decorators.
* [typeorm](https://github.com/typeorm/typeorm): A TypeScript ORM for mapping objects to database 
tables.

## Developer Libraries
The developer libraries are used to establish and maintain a foundation 
of software notations, patterns, and coding styles throughout the server 
implementation, from start to finish.


* [@types/jest](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest): Provides TypeScript typings for the Jest testing framework.
* [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node): Provides TypeScript typings for Node.js modules and APIs.
* [jest](https://github.com/facebook/jest): A JavaScript testing framework with built-in mocking and assertions.
* [nodemon](https://github.com/remy/nodemon): Automatically restarts Node.js applications when files change.
* [ts-jest](https://github.com/kulshekhar/ts-jest): Allows Jest to work with TypeScript code and files.
* [ts-node](https://github.com/TypeStrong/ts-node): Allows running TypeScript code directly in Node.js without compilation.
* [tslib](https://github.com/microsoft/tslib): A runtime library for TypeScript helper functions.
* [typescript](https://github.com/microsoft/TypeScript): A popular superset of JavaScript with static typing support.

# Architecture

<img src={require("@site/static/img/server/LearnServerArchitecture.png").default}/>

## Directory Structure
This section describes the most important directories and files of the 
project setup.

```bash
server/src
├── auth-checker.ts
├── data-source.ts
├── deployment.ts
├── entity
│   ├── Learner.ts
│   └── __test__
│       └── Learner.test.ts
├── index.ts
├── resolver
│   ├── index.ts
│   ├── interfaces
│   │   └── User.ts
│   └── learner
│       ├── LearnerInput.ts
│       ├── LearnerResolver.ts
│       └── LearnerToken.ts
└── @types
    ├── entity
    │   └── ILearner.ts
    ├── interface
    │   └── IUser.ts
    └── resolver
        └── learner
            └── ILearnerToken.ts
```

* `index.ts`: The entry point. 
* `data-source.ts`: Database configuration.
* `deployment.ts`: Secret configuration.
* `entity/`: Contains classes or entities.
* `resolver/`: Contains the GraphQL resolver.
* `**/__test__/**`: Contains jest tests.
* `@types/`: Contains shared types to the client.


