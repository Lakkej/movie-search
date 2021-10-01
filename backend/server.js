const express = require("express");
const cors = require("cors");
const basicAuth = require("express-basic-auth");

const routes = require("./routes"); // import the routes
const winstonMiddleware = require("./middleware/winstonLogger");

const port = 3001;
const app = express();

app.use(cors({
  origin:"http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const usersObj = {};
process.env.USERS.split(",").map((user) => {
  userArray = user.split(":");
  usersObj[userArray[0]] = userArray[1];
});

app.use(
  basicAuth({
    users: usersObj,
  })
);

app.use(winstonMiddleware);

app.use("/api", routes); //to use the routes

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
