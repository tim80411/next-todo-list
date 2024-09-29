up:
	docker compose up -d
	docker compose logs -f app

down:
	docker compose down --rmi local

logs:
	docker compose logs -f app

restart:
	docker compose restart