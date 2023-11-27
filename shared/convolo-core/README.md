#### Adding to the project

1. zod library is required, please run `npm i zod` to install it
2. openapi3-ts library is required, please run `npm i openapi3-ts` to install it
3. make sure shared/convolo-core does not exist
4. make sure you have access to https://github.com/convolo/convolo-core-shared
5. to initialize subtree use command:
   `git subtree add --prefix shared/convolo-core https://github.com/convolo/convolo-core-shared main --squash`
6. to get updates use:
   `git subtree pull --prefix shared/convolo-core https://github.com/convolo/convolo-core-shared main --squash`
7. to make changes (\*if you have the write access, proceed with caution)
   (commit your changes)
   `git subtree push --prefix shared/convolo-core https://github.com/convolo/convolo-core-shared main`
   (may take some time)

WARNING: be careful with updates, use @deprecate while renaming or deleting exported items

#### Connecting @shared in imports:

1. please add `"@shared/*": [ "shared/*"],` to `paths` to `compilerOptions` in **tsconfig.json**:

```
"compilerOptions": {
    ...
    "paths": {
        ...
        "@shared/*": [ "shared/*"]
   }
}
```

(create `"paths"` if it doesn't exist)

2. to be able to use it in prod:

a) install dev dependency **tscpaths**: `npm i -D tscpaths`

b) add to `scripts` in **package.json**:
`"fix-tsc-path": "npx tscpaths -p tsconfig.json -s ./shared -o ./dist/shared && npx tscpaths -p tsconfig.json -s ./src -o ./dist/src"`

c) run this script after each build, e.g.:
`"prestart:prod": "npm run build && npm run fix-tsc-path",`
