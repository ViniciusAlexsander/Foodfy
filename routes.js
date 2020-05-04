const express = require("express");
const routes = express.Router();
const user = require("./controllers/users");
const recipes = require("./controllers/recipes");

//visão para usuarios padrões do site
routes.get("/", function (req, res) {
  return res.redirect("/home");
});
routes.get("/home", user.home);
routes.get("/sobre", user.sobre);
routes.get("/receitas", user.receitas);
routes.get("/receita/:index", user.receita);

/*visão de um admin para o site*/

routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);

routes.post("/admin/recipes", recipes.post);
module.exports = routes;
