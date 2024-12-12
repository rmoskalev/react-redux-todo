# Название проекта
TODO App with MERN stack and redux + typescript


## Использование
Установите зависимости в папках client и server(откройте терминал в каждой папке и введите команду нижу)

- Установите npm-пакет с помощью команды:
```sh
$ npm i 
```

- Заполните .env.example 

```sh
MONGO_URI=ваш кластер MongoDB
JWT_SECRET=рандомный набор символом
CLIENT_URL=http://localhost:5173
PORT=8080
```

### Запуск сервера
Чтобы запустить сервер для разработки,в терминале в папке server выполните команду:
```sh
npm run start
```

### Запуск web приложения
Чтобы запустить web, в терминале в папке client выполните команду:
```sh
npm run dev
```

## FAQ 

- сервер может не работать если включен vpn
- изначально я планировал сделать приложение чуть более глобальным, в следствии чего заложил сущности, от которых в последствии отказался, но удалять уже не стал
