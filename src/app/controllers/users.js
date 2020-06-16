const Recipes = require("../models/Recipes");
const Chefs = require("../models/Chefs");

module.exports = {
  home(req, res) {
    Recipes.findTop6(function (recipes) {
      return res.render("users/home", { recipes });
    });
  },
  sobre(req, res) {
    return res.render("users/sobre");
  },
  receitas(req, res) {
    const { filter } = req.query;
    if (filter) {
      Recipes.filterRecipe(filter, function (recipes) {
        return res.render("users/receitas", {
          recipes,
        });
      });
    } else {
      Recipes.all(function (recipes) {
        return res.render("users/receitas", { recipes });
      });
    }
  },
  receita(req, res) {
    Recipes.find(req.params.id, function (recipe) {
      if (!recipe) return res.send("Recipe not found");

      return res.render(`users/receita`, { recipe });
    });
  },
  chefs(req, res) {
    Chefs.all(function (chefs) {
      return res.render("users/chefs", { chefs });
    });
  },
};
