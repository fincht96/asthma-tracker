const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/index.html"));
});

app.use(express.static("public"));
app.use("/", router);
app.listen(process.env.PORT || port);
