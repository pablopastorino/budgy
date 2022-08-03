# Budgy
Personal budget app, to register incomes expenses and keep track of the balance.

## Description
The Budgy application helps to keep track of your incomes, expenses and balance. Making it easy to create and update transactions and friendly to visualize the categories sources and destinations of your money with a graphic dashboard. All this for every registrated and autenticated user. 
Is developed to a challenge of Alkemy with the tecnologies of MySQL, Nodejs and React. And was a wonderful challenge that helped to keep learning those tecnologies that I love and want to work with.

## How To Run
1. Run the script `create-budgy-db.sql` placed into the `server` folder to have your database ready.
2. Add your environment variables into the `server`. Example:

```
# Server 
PORT=4000
# DB host
DB_HOST=
# DB User
DB_USER=
# DB Nam
DB_NAME=budgy_db
# DB Password
DB_PASSWORD=
# Secret Password To JWT
SECRET=
```
The client is ready to fetch to `http://localhost:400` host so I leave as the port number. If you want to change it, you must do it in the `.env` file and the `package.json` in the `client` (`proxy` property)

3. Into the `server` folder run `npm install` or `yarn install` and `npm/yarn dev` to run the server.
4. Into the `client` folder run `npm install` or `yarn install` and `npm/yarn start` to run the application.
