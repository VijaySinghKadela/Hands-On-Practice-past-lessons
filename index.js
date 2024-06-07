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
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`/files/${req.params.filename}`, "utf-8" , (err, filedata)=>{
    res.readdir("show");
  })  
});


app.post("/create", (req, res) => {
  fs.writeFile(`./files/ ${req.body.title.split(" ").join("")}.txt`, req.body.details , (err)=>{
    res.redirect("/");
    if(err) console.error(err);


  })
});

app.listen(3400, () => {
  console.log("Server is running on port 3400");
});
