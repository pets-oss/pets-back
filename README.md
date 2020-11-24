# Pet Information System Back-End

### To run locally

1. Install and run docker
2. Run `docker-compose up -d`
3. Hack away - hot-reloading enabled.
### To refresh database when schema.sql or data.sql changes (will delete all data)

1. Stop docker containers `docker-compose down`
2. Search for the correct volume `docker volume list`
    ```bash
    DRIVER              VOLUME NAME
    local               pets-back_database-data
    ```
3. Delete the volume `docker volume rm pets-back_database-data`
4. Run `docker-compose up` to start the stack