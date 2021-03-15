[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

# Pet Information System Back-End

---

Production endpoint: https://petbook-back.herokuapp.com/graphql

Development endpoint: https://petbook-back-dev.herokuapp.com/graphql

**[Interactive API](https://petbook-back-dev.herokuapp.com/graphql)** (dev environment only)

## Development guide contents

- [A. Prerequisites](#a-prerequisites)
- [B. Run locally](#b-run-locally)
- [C. Debug](#c-debug)
- [D. Test](#d-test)
- [E. Log DB queries](#e-log-db-queries-usually-for-debugging)
- [F. Common issues](#f-common-issues)


## A. Prerequisites

* NodeJS > v10 https://nodejs.org/en/download/
* Docker https://docs.docker.com/get-docker/
* Docker Compose https://docs.docker.com/compose/install/
* IDE is up to your preference, but VS Code is recommended https://code.visualstudio.com/download

---

## B. Run locally

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

3. Add common.env with the following values

```yaml
AUTH_DISABLED=true
```

4. Make sure Docker is running
5. Run `docker-compose up -d` or `docker-compose up -d --build` if it is not the first time, and the Dockerfile was changed.
6. Hack away - hot-reloading enabled

### B.i. Refresh database when making changes to .sql files (will delete all data)

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

## C. Debug

Run `docker-compose -f docker-compose.yml -f docker-compose-debug.yml up -d`

---

## D. Test

Tests run integration tests of the GraphQL service

To be able to test GraphQL queries, have your node server and database running locally as described in [[B. Run Locally]](#b-run-locally). Then simply hit `npm test`

### D.i. Validate data with interfaces

When changing or writing new interfaces for validation, generate the validator, e.g. `npx typescript-json-validator test/interfaces/animal.interface.ts Animal` https://github.com/ForbesLindesay/typescript-json-validator

### D.ii. Change URL of test backend

By default tests will hit the default local backend `http://localhost:8081`. If you wish to change the URL of the backend, add a `.env` file in `test` directory with such contents

```yaml
TEST_URL=<URL>
```
## E. Log DB queries (usually for debugging)

Add `command: ["postgres", "-c", "log_statement=all", "-c", "log_destination=stderr"]` to docker-compose.yml under `db` configuration

## F. Common Issues

### Docker backend image doesnt start with docker-compose

Usually happens when new node modules are added. `npm install` is done on dockerfile build. To solve:
1. Remove the previously compiled docker image `docker image rm pets-back_gis-backend`.
2. Run `docker-compose up -d`. This will force the dockerfile to be recompiled without cache

---

Front-End repository https://github.com/pets-oss/pets-front

---

Started by Kayak WeCanCode Academy 2021 @ Kaunas
