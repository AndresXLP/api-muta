# Prueba Técnica: Desarrollador Backen

Se requiere desarrollar una API RESTful para la gestión de materiales reciclables y recolecciones. La API permitirá realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre los materiales y también permitirá registrar y consultar las recolecciones de materiales.

La tecnología principal utilizada en el backend debe ser Node.js junto con una base de datos PostgreSQL para el almacenamiento de datos.

## Installation

- Clone this repo: `git clone git@github.com:AndresXLP/api-muta.git`
- Go to the project`$ cd api-muta`
- Install dependencies: `npm install`

## Requirements

- NodeJS v18.16.1
- PostgreSQL

## ENVIRONMENTS

- `PORT` Server Port
- `DDB_HOST` Database Host
- `DDB_PORT` Database Port
- `DDB_NAME` Database Name
- `DDB_USER` Databaer User
- `DDB_PASSWORD` Database Password
- `JWT_SECRET` JWT Secret or SEED
- `JWT_LIFETIME` JWT Lifetime
-

## Build & Run

#### Run for production

```bash
npm run build
```

#### Serve with hot reload at localhost:8080 to dev

```bash
npm run dev
```

## Confirms that the server works

- http://localhost:9000/api/health
- http://yourdomain.com/api/health

## Access to documentation in the broswer

- http://localhost:9000/api/doc
- http://yourdomain.com/api/doc
- https://documenter.getpostman.com/view/18554152/2s93z9agqF

## Database Diagram

![image](https://raw.githubusercontent.com/AndresXLP/api-muta/main/database-diagram.png)

## About technologies

- [Express.js docs](https://expressjs.com).
- [PostgresQL](https://www.postgresql.org/).
- [JWT](https://github.com/auth0/node-jsonwebtoken)

## Authors

- [@AndresXLP](https://www.github.com/andresxlp)
