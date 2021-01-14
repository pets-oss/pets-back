DO $$
DECLARE tablenames text;
DECLARE typenames text;
DECLARE extensions text;
BEGIN
    tablenames := string_agg('"' || tablename || '"', ', ')
        FROM pg_tables WHERE schemaname = 'public';
    EXECUTE 'DROP TABLE ' || tablenames;

    typenames := string_agg('"' || typname || '"', ', ')
        FROM pg_type t
            LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
            WHERE (t.typrelid = 0 OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
                AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)
                AND n.nspname NOT IN ('pg_catalog', 'information_schema');
    EXECUTE 'DROP TYPE ' || typenames;

    extensions := string_agg('"' || extname || '"', ', ')
        FROM pg_extension e
            LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace
            WHERE n.nspname = 'public';
    EXECUTE 'DROP EXTENSION ' || extensions;
END; $$
