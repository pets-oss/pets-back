@ECHO OFF
del combined.env 2>nul
type database.env >> combined.env
echo. >> combined.env
type common.env >> combined.env