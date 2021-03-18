[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

# Pet Information System Back-End

---

Production endpoint: https://petbook-back.herokuapp.com/graphql

Development endpoint: https://petbook-back-dev.herokuapp.com/graphql

**[Interactive API](https://petbook-back-dev.herokuapp.com/graphql)** (dev environment only)

## Development guide contents

- [A. Prerequisites](#a-prerequisites)
- B. Setup
    - [B1. with Docker](#b1-setup-with-docker)
    - [B2. without Docker](#b2-setup-without-docker)
- [C. Debug](#c-debug)
- [D. Test](#d-test)
- [E. Log DB queries](#e-log-db-queries-usually-for-debugging)
- [F. Common issues](#f-common-issues)


## A. Prerequisites

* NodeJS > v10 https://nodejs.org/en/download/
* IDE is up to your preference, but VS Code is recommended https://code.visualstudio.com/download

**only if running with docker:**
* Docker https://docs.docker.com/get-docker/
* Docker Compose https://docs.docker.com/compose/install/
---

## B1. Setup with docker

1. Install npm libraries with `npm install` command (if not installed previously).
2. Copy and rename `database.env.sample` to `database.env`. `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` can be adjusted to your liking, but the default configuration will work as well.
3. Copy and rename `common.env.sample` to `common.env`. You can tweak the values to your liking, but the default configuration will work as well.
4. Make sure Docker is running.
5. Run `docker-compose up -d`

## B2. Setup without docker

1. Download the latest supported version of PostgreSQL https://www.postgresql.org/download/
> e.g. Windows 7 and 8 support PostgreSQL version 10
2. Install PostgreSQL, take note of the password and port you've chosen during the installation.
> You might have to restart your PC after the installation is complete
3. Start pgAdmin and connect to your server using the password you've chosen (should be visible under Servers dropdown on the left)
4. Create a new user:
    - Right click "Login/Group Roles" and select Create > Login/Group Role.
    - Under the "General" tab, set the Name field (e.g. "backend"). Take note of the value you have chosen.
    - Under the "Definition" tab, set the Password field (e.g. "example"). Take note of the value you have chosen.
    - Under the "Privileges" tab, enable "Can login?".
    - Click "Save".
5. Create a new database:
    - Right click "Databases" and select Create > Database.
    - Under the "General" tab, set the Name field (e.g. "gis"). Take note of the value you have chosen.
    - Click "Save".
6. Upload data to tables:
    - Right click on the database entry you've just created and select "Query Tool"
    - Grant privileges to your new user: `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO username_from_step_4`;
    - Import SQL from `/database` folder in the number order (e.g. 1-schema.sql first, then 2-..., 3-..., etc.):
        - Click on the little folder icon inside the query tool
        - Choose the file (e.g. "1-schema.sql") and click Select
        - Click the execute button to run the query.
7. Copy and rename `database.env.sample` to `database.env`.  
Replace the `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` with the values you've set in the steps 4 and 5.  
Change `POSTGRES_HOST` to `localhost`
9. Copy and rename `common.env.sample` to `common.env`. You can tweak the values to your liking, but the default configuration will work as well.
10. Run `npm install` and `npm run dev-dockerless-win` if on windows or `npm run dev-dockerless`
11. Check http://localhost:8081/graphql.

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

### I have made changes to the SQL files inside /database folder. What do I do to make those changes appear in my database?

#### If you're running the docker configuration:
1. Stop docker containers `docker-compose down`
2. Search for the correct volume `docker volume list`

```bash
    DRIVER              VOLUME NAME
    local               pets-back_database-data
```

3. Delete the volume `docker volume rm pets-back_database-data`
4. Run `docker-compose up` to start the stack
5. Check if the are no SQL errors

#### If you're running without docker:
1. Login to pgAdmin
2. Open "Query Tool" for your database
3. Execute file .github/workflows/nuke_database.sql
4. Repeat step 6. from the [setup without docker section](#b2-setup-without-docker)

---

Front-End repository https://github.com/pets-oss/pets-front

---

Started by Kayak WeCanCode Academy 2021 @ Kaunas
