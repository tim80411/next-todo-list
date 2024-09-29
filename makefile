ENV ?= local

# local
up:
	docker compose up -d
	docker compose logs -f app

down:
	docker compose down --rmi local

logs:
	docker compose logs -f app

restart:
	docker compose restart

# deployment
build:
	docker buildx build -t zoheyeats-manage-platform .


# db
gen-migration:
	sh ./prisma/script/gen-migration.sh $(filter-out $@,$(MAKECMDGOALS))

migrate: 
	npx dotenv -e .env.$(ENV) -- prisma migrate deploy

rollback:
	sh ./prisma/script/rollback.sh $(filter-out $@,$(MAKECMDGOALS))

# help
help:
	@echo "Usage: make [target] [PARAM=value] [...args]"
	@echo ""
	@echo "Targets:"
	@echo "<Local>"
	@echo "  up              Start containers and show logs"
	@echo "  down            Stop containers and remove images"
	@echo "  logs            Show container logs"
	@echo "  restart         Restart containers"
	@echo ""
	@echo "<Deployment>"
	@echo "  build           Build production docker image"
	@echo ""
	@echo "<Database>"
	@echo "  gen-migration   Generate database migration(always ref to local)"
	@echo "                  Usage: make gen-migration [migration_name]"
	@echo "                  Example: make gen-migration add_user_table"
	@echo ""
	@echo "  migrate         Apply database migrations"
	@echo "                  Usage: make migrate [?ENV=envVar]"
	@echo "                  Example: make migrate ENV=production"
	@echo ""
	@echo "  rollback        Rollback database migration"
	@echo "                  Usage: make rollback [full_migration_name]"
	@echo "                  Example: make rollback 20240929061932_add_user_table"
	@echo ""
	@echo "Parameters:"
	@echo "  ENV             Set environment (default: local)"
	@echo ""
	@echo "Note:"
	@echo "  - Ensure you have the correct .env.{env} file for the target environment"

# make params addable
%:
	@: