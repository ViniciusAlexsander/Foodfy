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

server.get("/receita", (req, res) => {
  const recipes = receitas;
  const recipeIndex = 0;

  return res.render("receita", { receita: recipes[recipeIndex] });
});

server.listen(3030, () => {
  console.log(" O pai ta on na porta 3030");
});
