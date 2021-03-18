#!/bin/sh
rm -f combined.env
cat database.env >> combined.env
echo "" >> combined.env
cat common.env >> combined.env