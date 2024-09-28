# ChatBot "Anton"

Интеллектуальный помощник сотрудника поддержки Rutube.
Поисковая система по базе знаний ЧаВо.

Основной стэк: `telegraf`, `fastify`, `nodejs`

## Требования

Бот использует взаимодействие с серверами Telegram через callback, так что для работы потребуется публичный сервер с доменом.

## Развертывание

### Docker

Приложение поддерживает развертывание в среде Docker Compose

### Ручное развертывание

1. Установить необходимые библиотеки
    
    ```bash
    npm ci
    ```

2. Запустить проект

    ```bash
    npm run start
    ```