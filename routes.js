const express = require("express");
const routes = express.Router();
const user = require("./controllers/users");
const admin = require("./controllers/admin");

//visão para usuarios padrões do site
routes.get("/", function (req, res) {
  return res.redirect("/home");
});
routes.get("/home", user.home);
routes.get("/sobre", user.sobre);
routes.get("/receitas", user.receitas);
routes.get("/receita/:index", user.receita);

//visão de um admin para o site
routes.get("/admin/recipes/create", admin.create);
module.exports = routes;
