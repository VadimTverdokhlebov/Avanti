.PHONY: help up down restart logs shell install dev clean init env uninit

GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
NC = \033[0m

ifneq (,$(wildcard ./.env))
include .env
export
endif

help:
	@echo "${YELLOW}Avanti Project${NC} - available commands:"
	@echo "${GREEN}make init${NC}      - Initialize project (create .env and install dependencies)"
	@echo "${GREEN}make env${NC}       - Create .env file from .env.example"
	@echo "${GREEN}make up${NC}        - Start container services"
	@echo "${GREEN}make down${NC}      - Stop container services"
	@echo "${GREEN}make restart${NC}   - Restart container services"
	@echo "${GREEN}make logs${NC}      - Show container logs"
	@echo "${GREEN}make shell${NC}     - Connect to MongoDB shell"
	@echo "${GREEN}make install${NC}   - Install dependencies"
	@echo "${GREEN}make dev${NC}       - Start development server"
	@echo "${GREEN}make clean${NC}     - Clean project (remove node_modules, etc.)"
	@echo "${GREEN}make uninit${NC}    - Reset project to uninitialized state"

init: env install up
	@echo "${GREEN}Project initialized successfully!${NC}"

env:
	@if [ ! -f .env ]; then \
		echo "${YELLOW}Creating .env file from .env.example...${NC}"; \
		cp .env.example .env; \
		echo "${GREEN}.env file created successfully!${NC}"; \
	else \
		echo "${YELLOW}.env file already exists.${NC}"; \
	fi

up:
	@echo "${GREEN}Starting container services...${NC}"
	docker-compose up -d
	@echo "${GREEN}Services are running${NC}"

down:
	@echo "${YELLOW}Stopping container services...${NC}"
	docker-compose down

restart: down up

logs:
	docker-compose logs -f

shell:
	@echo "${GREEN}Connecting to MongoDB shell...${NC}"
	docker exec -it avanti-mongodb mongosh -u $(if $(DATABASE_USER),$(DATABASE_USER),avanti) -p $(if $(DATABASE_PASSWORD),$(DATABASE_PASSWORD),avanti) $(if $(DATABASE_NAME),$(DATABASE_NAME),avanti)

install:
	@echo "${GREEN}Installing dependencies...${NC}"
	npm ci

dev:
	@echo "${GREEN}Starting development server...${NC}"
	npm run dev

clean:
	@echo "${YELLOW}Cleaning project...${NC}"
	rm -rf node_modules
	rm -rf dist
	@echo "${GREEN}Project cleaned!${NC}"

uninit: down
	@echo "${YELLOW}Resetting project to uninitialized state...${NC}"
	rm -rf node_modules
	rm -rf dist
	rm -f .env
	docker-compose down -v
	@echo "${RED}Warning: All containers, volumes, and project dependencies have been removed.${NC}"
	@echo "${GREEN}Project reset to uninitialized state!${NC}" 