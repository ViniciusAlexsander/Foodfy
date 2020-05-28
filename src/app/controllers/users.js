const Recipes = require("../models/Recipes");

module.exports = {
  home(req, res) {
    Recipes.findTop6(function(recipes) {
      return res.render("users/home",{recipes} );
    })
   
  },
  sobre(req, res) {
    return res.render("users/sobre");
  },
  receitas(req, res) {
    Recipes.all(function (recipes) {
      return res.render("users/receitas", { recipes });
    });
  },
  receita(req, res) {
    Recipes.find(req.params.id, function (recipe) {
      if (!recipe) return res.send("Recipe not found");

      return res.render(`users/receita`, { recipe });
    });
  },
};
