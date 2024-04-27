import express from "express";
import cors from "cors";
import getUsers from "./user-service.js";
import findUserById from "./user-service.js";
import addUser from "./user-service.js";
import findUserByName from "./user-service.js";
import findUserByJob from "./user-service.js";
import deleteUser from "./user-service.js";
import userService from "./user-service.js";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

/*
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};*/

/*app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});*/

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

/*const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);*/


/*app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});*/

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

/*const addUser = (user) => {
  genID(user);
  users["users_list"].push(user);
  return user;
};*/

const genID = (user) => {
  user.id = Math.random();
  return user;
};

/*app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});*/

app.post("/users", (req, res) => {
  const user = req.body;
  userService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});

const findUserDel = (id) => {
  return users["users_list"].find(
    (user) => user["id"] === id
  );
};

const delUser = (id) => {
  users["users_list"].splice(users["users_list"].indexOf(findUserDel(id)),1);
};

app.delete("/users/:id", (req,res) =>{
  const id = req.params["id"];
  userService.deleteUser(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else{
        res.status(204).send();
    }
  });

});

/*app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    delUser(id);
    res.status(204).send();
});*/

/*app.get("/", (req, res) => {
  res.send("Hello World!");
});*/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
