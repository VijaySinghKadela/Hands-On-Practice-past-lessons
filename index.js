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
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
  fs.rename(`./file/${req.body.previous}`, `./file/${req.body.new}`, (err) => {
    if(err) console.error(err);
    res.redirect("/");
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

app.listen(8975, () => {
  console.log("starting");
});
