# Budgy
Personal budget app, to register incomes expenses and keep track of the balance.

## Description
The Budgy application helps to keep track of your incomes, expenses and balance. Making it easy to create and update transactions and friendly to visualize the categories sources and destinations of your money with a graphic dashboard. All this for every registrated and autenticated user. 
Is developed to a challenge of Alkemy with the tecnologies of MySQL, Nodejs and React. And was a wonderful challenge that helped to keep learning those tecnologies that I love and want to work with.

## How To Run
1. Run the script `create-budgy-db.sql` placed into the `server` folder to have your database ready.
2. Add your environment variables into the `server`. This is done creating a `.env` file with the following data (PORT and DB_NAME are already declared):

```
# Server 
PORT=4000
# DB host
DB_HOST=
# DB User
DB_USER=
# DB Name
DB_NAME=budgy_db
# DB Password
DB_PASSWORD=
# Secret Password To JWT
SECRET=
```
The client is ready to fetch to `http://localhost:400` host so I leave as the port number. If you want to change it, you must do it inside the `package.json` file in the `client` (`proxy` property). And the database that the script will create is called `budgy_db`, if you want to create it with another name, must change it in the script also.

3. Into the `server` folder run `npm install` or `yarn install` and `npm/yarn start` to run the server.
4. Into the `client` folder run `npm install` or `yarn install` and `npm/yarn start` to run the application.

## Thanks!
