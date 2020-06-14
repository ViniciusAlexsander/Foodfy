const express = require("express");
const routes = express.Router();
const user = require("./app/controllers/users");
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");

//visão para usuarios padrões do site
routes.get("/", function (req, res) {
  return res.redirect("/home");
});
routes.get("/home", user.home);
routes.get("/sobre", user.sobre);
routes.get("/receitas", user.receitas);
routes.get("/receita/:id", user.receita);

/*visão de um admin para o site*/
routes.get("/admin", function (req, res) {
  return res.redirect("/admin/recipes");
});
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);

routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

/*visão do admin criação de chefs*/
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);

routes.post("/admin/chefs", chefs.post);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

module.exports = routes;
