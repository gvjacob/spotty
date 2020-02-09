.PHONY: start

start:
	$(info Make: starting containers)
	docker-compose up -d

stop:
	$(info Make: stopping containers)
	docker-compose down

restart:
	@make stop
	@make start

remove:
	@make stop
	docker-compose rm -rf

ls:
	@docker ps -a

bash:
	$(info Make: ssh-ing into "$(CONTAINER)")
	@docker exec -it $(CONTAINER) bash




