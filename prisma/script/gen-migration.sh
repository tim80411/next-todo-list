#!/bin/bash
# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

_name=$1
if [ -z "$_name" ]; then
  echo "Please provide a name for the migration"
  exit 1
fi

echo "${BLUE}==Create a new migration==${RESET}"
initial_folders=$(ls ./prisma/migrations/)
npx dotenv -e .env.local -- npx prisma migrate dev --name $_name --create-only
cur_folders=$(ls ./prisma/migrations/)

# Find the new folder by comparing the before and after lists
new_folder=""
for folder in $cur_folders; do
    if ! echo "$initial_folders" | grep -q "$folder"; then
        new_folder=$folder
        break
    fi
done

if [ -z "$new_folder" ]; then
  echo "No new migration folder was created"
  exit 1
fi

echo "${BLUE}==Generate the down.sql script==${RESET}"
npx dotenv -e .env.local -- npx prisma migrate diff \
 --from-schema-datamodel prisma/schema.prisma \
 --to-schema-datasource prisma/schema.prisma \
 --script > prisma/migrations/$new_folder/down.sql

if [ ! -s prisma/migrations/$new_folder/down.sql ]; then
  echo "The down.sql script was not created successfully"
  exit 1
fi

echo "${BLUE}==Migration created and down.sql generated successfully.==${RESET}"