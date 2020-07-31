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

    initializePassport(
      passport,

      (email) => {
        return usersCollection.findOne({ _email: email });
      },

      (id) => {
        return usersCollection.findOne(ObjectId(id));
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
      res.render("pages/index.ejs", { user: req.user });
    });

    app.get("/profile", checkAuthenticated, (req, res) => {
      res.render("pages/profile.ejs", { user: req.user });
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
            _entrys: [],
          })
          .then((result) => {
            res.redirect("/login");
          })
          .catch((error) => console.log("Error inserting user"));
      } catch (e) {
        console.log(e);
        res.redirect("/register");
      }
    });

    app.delete("/logout", (req, res) => {
      req.logOut();
      res.redirect("/login");
    });

    app.post("/entry", checkAuthenticated, async (req, res) => {
      try {
        // console.log(result);

        await usersCollection.updateOne(
          { _id: req.user._id },
          {
            $push: {
              _entrys: req.body,
            },
          }
        );

        res.redirect("/");
      } catch (e) {
        console.log(e);
      }
    });

    app.delete("/entry", checkAuthenticated, async (req, res) => {
      try {
        // find the user then search entries for document to
        let result = await usersCollection.findOne({ _id: req.user._id });
        let entryIndex = req.body.entry_id;

        await usersCollection.updateOne(
          { _id: req.user._id },
          {
            $unset: {
              ["_entrys." + entryIndex]: {
                when: "",
                peak_flow: "",
                medication: "",
                comment: "",
              },
            },
          }
        );

        await usersCollection.updateOne(
          { _id: req.user._id },
          {
            $pull: {
              _entrys: null,
            },
          }
        );

        res.redirect("/");
      } catch (e) {
        console.log(e);
      }
    });

    app.put("/entry", checkAuthenticated, async (req, res) => {
      try {
        // find the user then search entries for document to
        let result = await usersCollection.findOne({ _id: req.user._id });
        let entryIndex = req.body.entry_id;

        console.log(result);

        await usersCollection.updateOne(
          { _id: req.user._id },
          {
            $set: {
              ["_entrys." + entryIndex]: {
                when: req.body.when,
                peak_flow: req.body.peak_flow,
                medication: req.body.medication,
                comment: req.body.comment,
              },
            },
          }
        );

        res.redirect("/");
      } catch (e) {
        console.log(e);
      }
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
