if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoConnectionString =
  "mongodb+srv://fincht96:9ADT4aMvgaVq1984@cluster0.emjos.mongodb.net/asthma-tracker-db?retryWrites=true&w=majority";

const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const express = require("express");
const bcrypt = require("bcrypt");
const port = process.env.PORT || port;
const initializePassport = require("./passport.config");
const ObjectId = require("mongodb").ObjectID;
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

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

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(passport.initialize());
    app.use(bodyParser.json());
    // app.use(express.urlencoded({ extended: false }));
    app.use(passport.session());
    app.use(methodOverride("_method"));
    app.use(express.static("public"));

    app.get("/", function (req, res, next) {
      res.send({ a: 1});
    });

    app.post(
      "/login",
      checkNotAuthenticated,
      passport.authenticate("local"),
      function (req, res) {
        console.log("Valid login!");
        res.sendStatus(200);
      }
    );

    app.post("/signup", checkNotAuthenticated, async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        usersCollection
          .insertOne({
            // _name: req.body.name,
            _email: req.body.email,
            _password: hashedPassword,
            _entrys: [],
          })
          .then((result) => {
            console.log("Valid signup!");
            res.sendStatus(200);
          })
          .catch((error) => console.log("Error inserting user"));
      } catch (e) {
        console.log(e);
        res.sendStatus(400);
      }
    });

    app.delete("/logout", (req, res) => {
      req.logOut();
      console.log("Logged out");
      res.sendStatus(200);
    });

    app.post("/entry", checkAuthenticated, async (req, res) => {
      try {
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
