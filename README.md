[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)
# Pet Information System Back-End

### To run locally

1. Add database.env with the following format (you can change values)
```
POSTGRES_USER=backend
POSTGRES_PASSWORD=example
POSTGRES_DB=gis
# database docker container name
POSTGRES_HOST=pets-back_db_1
POSTGRES_PORT=5432
```
2. Install and run docker
3. Run `docker-compose up -d`
4. Hack away - hot-reloading enabled.
### To refresh database when schema.sql or data.sql changes (will delete all data)

1. Stop docker containers `docker-compose down`
2. Search for the correct volume `docker volume list`
    ```bash
    DRIVER              VOLUME NAME
    local               pets-back_database-data
    ```
3. Delete the volume `docker volume rm pets-back_database-data`
4. Run `docker-compose up` to start the stack


### To debug
Run `docker-compose -f docker-compose.yml -f docker-compose-debug.yml up -d`