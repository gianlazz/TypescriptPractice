
## Apollo GraphQL Client Setup:

https://medium.com/codingthesmartway-com-blog/apollo-client-for-angular-making-use-of-graphql-8d9a571e020c

Querying GraphQL api to generate types for the client:
https://youtu.be/Wc7bJ2uv694?t=216

I think this only works when using apollo as the client. Not the express graphql server setup I have right now.

```
mkdir src/app/types
npx apollo-codegen generate introspect-schema http://localhost:8080/graphql --output .src/types/schema.json
npx apollo-codegen generate **/*.ts --schema ./src/types/schema.json --target typescript --output .src/types/operation-result-types.ts
```

- https://stackoverflow.com/questions/39044156/how-can-i-console-log-the-value-of-a-observable

- https://x-team.com/blog/webcam-image-capture-angular/