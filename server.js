const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const receitas = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("home", { items: receitas });
});

server.get("/sobre", (req, res) => {
  return res.render("sobre");
});

server.get("/receitas", (req, res) => {
  return res.render("receitas", { items: receitas });
});

server.get("/receita/:index", (req, res) => {
  const recipes = receitas;
  const recipeIndex = req.params.index;

  return res.render("receita", { receita: recipes[recipeIndex] });
});
var port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`O pai ta on na porta ${port}`);
});
