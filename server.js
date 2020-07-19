if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoConnectionString =
  "mongodb+srv://fincht96:9ADT4aMvgaVq1984@cluster0.emjos.mongodb.net/asthma-tracker-db?retryWrites=true&w=majority";
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const express = require("express");
const bcrypt = require("bcrypt");
const port = process.env.PORT || port;
const initializePassport = require("./passport.config");
var ObjectId = require("mongodb").ObjectID;

const app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(mongoConnectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("asthma-tracker-db");

    const usersCollection = db.collection("users");

    // usersCollection
    //   .findOne({ name: "Tom" })
    //   .then((result) => {
    //     console.log(result.email);
    //   })
    //   .catch((error) => console.log("Error could not find user"));

    // initializePassport(
    //   passport,

    //   (email) => users.find((user) => user.email === email),

    //   (id) => users.find((user) => user.id === id)

    // );

    usersCollection
      .findOne(ObjectId("5f14bad178f17b2f30712b88"))

      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        return null;
      });

    initializePassport(
      passport,

      (email) => {
        return usersCollection.findOne({ _email: email });
      },

      (id) => {
        return usersCollection.findOne(ObjectId(id));
        // usersCollection
        //   .findOne({ _id: id })

        //   .then((result) => {
        //     console.log(result._id);
        //     return result;
        //   })
        //   .catch((error) => {
        //     return null;
        //   });
      }
    );

    // converts the url encoded form into a json accessbile format
    app.use(express.urlencoded({ extended: false }));
    app.use(flash());
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride("_method"));
    app.use(express.static("public"));

    app.set("view-engine", "ejs");

    app.get("/", checkAuthenticated, (req, res) => {
      res.render("pages/index.ejs", { name: req.user._name });
    });

    app.get("/login", checkNotAuthenticated, (req, res) => {
      res.render("pages/login.ejs");
    });

    app.post(
      "/login",
      checkNotAuthenticated,
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        // shows error message on fail e.g. incorrect password
        failureFlash: true,
      })
    );

    app.get("/register", checkNotAuthenticated, (req, res) => {
      res.render("pages/register.ejs");
    });

    app.post("/register", checkNotAuthenticated, async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        usersCollection
          .insertOne({
            _name: req.body.name,
            _email: req.body.email,
            _password: hashedPassword,
          })
          .then((result) => {
            res.redirect("/login");
          })
          .catch((error) => console.log("Error inserting user"));

        // users.push({
        //   id: Date.now.toString(),
        //   name: req.body.name,
        //   email: req.body.email,
        //   password: hashedPassword,
        // });
        // console.log(users);
        // res.redirect("/login");
      } catch (e) {
        console.log(e);
        res.redirect("/register");
      }
    });

    app.delete("/logout", (req, res) => {
      req.logOut();
      res.redirect("/login");
      console.log("DELETE");
    });

    function checkAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }

      res.redirect("/login");
    }

    function checkNotAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect("/");
      }

      next();
    }

    app.listen(port);
  })
  .catch((error) => console.error(error));

// const users = [];
