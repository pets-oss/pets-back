[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

# Pet Information System Back-End

Production https://petbook-back.herokuapp.com/graphiql

## A. Run locally

1. Install npm libraries with `npm install` command (if not installed previously)
2. Add database.env with the following format (you can change values)

```yaml
POSTGRES_USER=backend
POSTGRES_PASSWORD=example
POSTGRES_DB=gis
# database docker container name
POSTGRES_HOST=pets-back_db_1
POSTGRES_PORT=5432
```

3. Install and run docker
4. Run `docker-compose up -d` or `docker-compose up -d --build` if it is not the first time, and the Dockerfile was changed.
5. Hack away - hot-reloading enabled

<!-- --- -->

### A.i. Refresh database when making changes to .sql files (will delete all data)

1. Stop docker containers `docker-compose down`
2. Search for the correct volume `docker volume list`

```bash
    DRIVER              VOLUME NAME
    local               pets-back_database-data
```

3. Delete the volume `docker volume rm pets-back_database-data`
4. Run `docker-compose up` to start the stack
5. Check if the are no SQL errors

---

## B. Debug

Run `docker-compose -f docker-compose.yml -f docker-compose-debug.yml up -d`

---

## C. Test

Tests run integration tests of the GraphQL service

To be able to test GraphQL queries, have your node server and database running locally as described in [[A. Run Locally]](#a.-run-locally). Then simply hit `npm test`

### C.i. Validate data with interfaces

When changing or writing new interfaces for validation, generate the validator, e.g. `npx typescript-json-validator test/interfaces/animal.interface.ts Animal` https://github.com/ForbesLindesay/typescript-json-validator

### C.ii. Change URL of test backend

By default tests will hit the default local backend `http://localhost:8081`. If you wish to change the URL of the backend, add a `.env` file in `test` directory with such contents

```yaml
TEST_URL=<URL>
```

---

Front-End repository https://github.com/pets-oss/pets-front

---

Started by Kayak WeCanCode Academy 2021 @ Kaunas
