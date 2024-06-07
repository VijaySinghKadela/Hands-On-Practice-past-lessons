const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./file`, (err, file) => {
    res.render("index", { file: file });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`/file/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render('show', { filename: req.params.filename, filedata: filedata });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./file/ ${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
      if (err) console.error(err);
    }
  );
});

app.listen(8080, () => {
  console.log("Server is running on port 3400");
});
