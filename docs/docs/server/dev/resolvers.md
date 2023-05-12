# GraphQL Resolvers and Types
We use TypeGraphQL to define the object types and resolvers used in our 
GraphQL implementation.

## Query
There is only one query where the user starts with Learner and Technique
, and then can navigate down to Event, Activity, and LearningFiles.
We called this chaining query.

```GraphQL
query chainQuery {
    learner {
        id
        events {
            id
            learningFiles {
                id
            }
            activities {
                id
                learningFiles {
                    id
                }
            }
        }
        techniques {
            id
        }
    }
}
```

## Mutations
Mutations refer to changes to a service in GraphQL terms,
which are only applied with a secret token provided 
during user registration.

The mutations are the same of entities methods you should read that
section.



