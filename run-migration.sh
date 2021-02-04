#!/bin/sh
set -e
./node_modules/.bin/prisma migrate deploy --preview-feature
exec "$@"