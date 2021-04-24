# StudyTracker - проект по управлению успеваемостью

## Motivation

Основное предназначение проекта - помощь преподавателям в упорядочивании информации об учебном плане, и ведение учета сданных работ в централизованном ресурсе.

## StudyTracker

![Скриншот приложения](/other/screen.jpg)

Приложение позволяет со стороны студента отправлять работы на проверку и задавать вопросы по работе. Со стороны преподавателя можно оценивать работы, составлять свои учебные дисциплины и давать коментарии по работам

## Стек технологий

* React
* Node.js (Express)
* PostgreSQL

## Возможности приложения

* Создание аккаунтов преподавателей
* Создание дисциплин
* Создание учебных групп. Подписка групп на дисциплины преподавателей
* Создание аккаунтов студентов с последующим добавлением их в учебные группы
* Создание зачетных работ со стороны преподавателя

## Установка зависимостей и первоначальная настройка

В первую очередь должны быть установлены Node.js и PostgreSQL

Затем в каталогах /backend и /frontend необходимо установить завимости командой 
```
npm install или yarn install
```

Также, чтобы приложению необходима сама БД. Для этого в PostgreSQL создайте БД, и выполните в ней файл /backend/migrations.sql.

После этого необходимо произвести настройку бэкенда - для этого откройте файл /backend/.env и укажите в нем информацию для подключения к БД, а также SMTP логин и пароль для почтового клиента.

Также в нем есть поле PORT - это порт, на котором запускается приложение

После чего можно приступать к запуску проекта

## Запуск проекта для разработки 🔨

Для того, чтобы вести разработку, необходмо запустить два консольных приложения:

```
npm dev или yarn dev в каталоге /backend

npm start или yarn start в каталоге /frontend
```

После чего приложение откроется в вашем браузере по адресу http://localhost:30000

## Запуск проекта для продакшна

Для того, чтобы запустить проект на сервере, вначале необходимо собрать React-приложение, для этого выполните команду

```
npm build или yarn build в каталоге /frontend
```

Затем настройте свой веб-сервер таким образом, чтобы все запросы, кроме /api/* обращались к файлу /frontend/build/index.html

А запросы /api/* должны проксироваться на localhost с указанным портом в /backend/.env

Дальше необходимо настроить раздачу файлов. Все файлы по адресу, кроме /db/* должны браться из каталога /frontend/build

А корень файлов, расположенных по адресу /db/* должны раздаваться из каталога /backend/db

После чего наконец-то можно запустить сервер

```
npm start или yarn start в каталоге /backend
```

Пример настройки Nginx сервера по указанному алгоритму: 

```
server {
	listen 80;
	server_name study-tracker.ru;

	location / {
		root /sites/study-tracker/frontend/build;
		try_files $uri /index.html;
	}

	location /api {
		proxy_pass http://127.0.0.1:3001;
	}

	location /db {
		root /sites/study-tracker/backend/public;
	}
}

```