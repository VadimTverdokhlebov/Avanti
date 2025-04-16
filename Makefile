# Avanti Project Makefile

.PHONY: help up down purge restart logs shell install dev clean

# Include environment variables from .env file
include .env
export

# Colors for terminal output
GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
NC = \033[0m # No Color

# Default target
help:
	@echo "${YELLOW}Avanti Project${NC} - available commands:"
	@echo "${GREEN}make up${NC}        - Start MongoDB container"
	@echo "${GREEN}make down${NC}      - Stop MongoDB container"
	@echo "${GREEN}make purge${NC}     - Stop and remove MongoDB container and volume"
	@echo "${GREEN}make restart${NC}   - Restart MongoDB container"
	@echo "${GREEN}make logs${NC}      - Show MongoDB container logs"
	@echo "${GREEN}make shell${NC}     - Connect to MongoDB shell"
	@echo "${GREEN}make install${NC}   - Install dependencies"
	@echo "${GREEN}make dev${NC}       - Start development server"
	@echo "${GREEN}make clean${NC}     - Clean project (remove node_modules, etc.)"

# MongoDB container commands
up:
	@echo "${GREEN}Starting MongoDB container...${NC}"
	docker-compose up -d
	@echo "${GREEN}MongoDB is running at ${DATABASE_HOST}:${DATABASE_PORT}${NC}"

down:
	@echo "${YELLOW}Stopping MongoDB container...${NC}"
	docker-compose down

purge:
	@echo "${RED}Stopping and removing MongoDB container and volumes...${NC}"
	docker-compose down -v

restart: down up

logs:
	docker-compose logs -f mongodb

shell:
	@echo "${GREEN}Connecting to MongoDB shell...${NC}"
	docker exec -it avanti-mongodb mongosh -u ${DATABASE_USER} -p ${DATABASE_PASSWORD} ${DATABASE_NAME}

# Project commands
install:
	@echo "${GREEN}Installing dependencies...${NC}"
	npm ci

dev: up
	@echo "${GREEN}Starting development server...${NC}"
	npm run dev

clean:
	@echo "${YELLOW}Cleaning project...${NC}"
	rm -rf node_modules
	rm -rf dist
	@echo "${GREEN}Project cleaned!${NC}" 