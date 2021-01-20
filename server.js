const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
//create the schema
const User = require("./models/User");
//3-setup env variables
require("dotenv").config({ path: "./config/.env" });
//parse data to json (body-parser)
app.use(express.json());
//2- connect database
connectDB();
//CRUD
//Get method: path: /api/users
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send({ msg: "GET USERS", users }))
    .catch((err) => res.send({ msg: "ERROR", err }));
});
//Get user by id => path: /api/users/:userID
app.get("/api/users/:userID", (req, res) => {
  const userId = req.params.userID;
  User.findById(userId)
    .then((user) => {
      res.send({ msg: "get user by id", user });
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
});
//Add user=> path: /api/add_user
app.post("/api/add_user", (req, res) => {
  const { name, email, phone } = req.body;
  const newUser = new User({ name, email, phone });
  newUser
    .save()
    .then((user) => {
      res.send({ msg: "user added", user });
    })
    .catch((err) => {
      res.send({ msg: "failed to add user", err });
    });
});
//Update by id=> path: /api/users/:userId
app.put("/api/users/:userId", (req, res) => {
  const id = req.params.userId;
  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((user) => {
      res.send({ msg: "user apdated", user });
    })
    .catch((err) => {
      res.send({ msg: "error update", err });
    });
});
//find by id and remove => path: /api/users/:userId
app.delete("/api/users/:userId", (req, res) => {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .then((user) => res.send({ msg: "user deletes", user }))
    .catch((err) => res.send({ msg: "error", err }));
});
//1-start the server
const port = 5000;
app.listen(port, () => {
  console.log(`the server is running on port: http://localhost: ${port}`);
});
