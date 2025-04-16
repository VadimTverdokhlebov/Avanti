# Avanti Project

## Запуск проекта с Makefile

В проекте доступны следующие команды Makefile:

```bash
make help      # Показать список всех доступных команд
make up        # Запустить MongoDB контейнер
make down      # Остановить MongoDB контейнер
make purge     # Остановить и удалить MongoDB контейнер с данными
make restart   # Перезапустить MongoDB контейнер
make logs      # Показать логи MongoDB контейнера
make shell     # Подключиться к MongoDB через консоль
make install   # Установить зависимости проекта
make dev       # Запустить сервер разработки (запускает MongoDB и сервер)
make clean     # Очистить проект (удалить node_modules, dist и т.д.)
```

## Запуск MongoDB с Docker Compose

Для запуска MongoDB в Docker контейнере:

1. Убедитесь, что у вас установлены Docker и Docker Compose

2. Запустите контейнер командой:
   ```
   docker-compose up -d
   ```

3. MongoDB будет доступна на порту 27018:
   - Host: localhost
   - Port: 27018
   - User: avanti
   - Password: avanti
   - Database: avanti

4. Для остановки контейнера:
   ```
   docker-compose down
   ```

5. Для удаления данных (volume) при остановке:
   ```
   docker-compose down -v
   ``` 