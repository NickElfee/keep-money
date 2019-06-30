const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200' || 'http://localhost:4200/login',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function(err, client){
  if(err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("keep-money").collection("users");
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
});

app.get("/keep-money/user", function(req, res){

  const collection = req.app.locals.collection;
  collection.find({}).toArray(function(err, users){

    if(err) return console.log(err);
    res.send(users)
  });

});

app.get("/keep-money/:userPassword/login/:userLogin", function(req, res){
  const collection = req.app.locals.collection;
  const userLogin = req.params.userLogin;
  const userPassword = req.params.userPassword;

  collection.find({ login: userLogin, password: userPassword }).toArray(function(err, user){
    if(err) return console.log(err);

    res.send(user)
  })
});

app.get("/keep-money/identify/:login/:email", function(req, res){
  const collection = req.app.locals.collection;
  const userLogin = req.params.userLogin;
  const userEmail = req.params.email;

  collection.find({ login: userLogin, email: userEmail }).toArray(function(err, user) {
    if(err) return console.log(err);
    res.send(user)
  })
});

app.post("/login", jsonParser, function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const userLogin = req.body.login;
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  const userName = req.body.firstName;
  const userLastName = req.body.lastName;
  const userAge = req.body.age;
  const userGender = req.body.gender;
  const userCountry = req.body.country;
  const userCity = req.body.city;
  const userCurrency = req.body.currency;
  const userPersonOfFamily = req.body.personOfFamily;
  const userEarns = req.body.earns;
  const userBudget = req.body.budget;
  const userPublishBudget = req.body.publishBudget;
  const userFood = req.body.food;
  const userRent = req.body.rent;
  const userClothes = req.body.clothes;
  const userHouseHoldChemicals = req.body.houseHoldChemicals;
  const userAnimals = req.body.animals;

  const user = {login: userLogin, password: userPassword, email: userEmail, firstName: userName, lastName: userLastName,
    age: userAge, gender: userGender, country: userCountry, city: userCity, currency: userCurrency, personOfFamily: userPersonOfFamily,
    earns: userEarns, budget: userBudget, publishBudget: userPublishBudget, food: userFood, rent: userRent, clothes: userClothes,
    houseHoldChemicals: userHouseHoldChemicals, animals: userAnimals
  };

  const collection = req.app.locals.collection;
  collection.insertOne(user, function(err, result){

    if(err) return console.log(err);
    res.send(user);
  });
});

app.delete("/api/users/:id", function(req, res){

  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOneAndDelete({_id: id}, function(err, result){

    if(err) return console.log(err);
    let user = result.value;
    res.send(user);
  });
});

app.put("/api/users", jsonParser, function(req, res){

  if(!req.body) return res.sendStatus(400);
  const id = new objectId(req.body.id);
  const userName = req.body.name;
  const userAge = req.body.age;

  const collection = req.app.locals.collection;
  collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
    {returnOriginal: false },function(err, result){

      if(err) return console.log(err);
      const user = result.value;
      res.send(user);
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
