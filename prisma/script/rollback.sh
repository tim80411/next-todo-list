#!/bin/bash
# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

# Start
migration_name=$1
if [ -z "$migration_name" ]; then
  echo "Please provide a migration_name for the rollback"
  exit 1
fi

echo "${BLUE}==Execute the down.sql script==${RESET}"
npx dotenv -e .env.local -- npx prisma db execute --file prisma/migrations/$migration_name/down.sql

echo "${BLUE}==Delete the migration log: ${migration_name}==${RESET}"
echo "DELETE FROM \"_prisma_migrations\" WHERE \"migration_name\" = '${migration_name}';" | \
  npx dotenv -e .env.local -- npx prisma db execute --stdin