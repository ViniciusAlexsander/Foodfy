const Recipes = require("../models/Recipes");
const Chefs = require("../models/Chefs");

module.exports = {
  async home(req, res) {
    let results = await Recipes.findTop6();
    const recipes = results.rows;
    return res.render("users/home", { recipes });
  },
  sobre(req, res) {
    return res.render("users/sobre");
  },
  async receitas(req, res) {
    const { filter } = req.query;
    if (filter) {
      let results = await Recipes.filterRecipe(filter);
      const recipes = results.rows;
      return res.render("users/receitas", {
        recipes,
      });
    } else {
      results = await Recipes.all();
      const recipes = results.rows;
      return res.render("users/receitas", { recipes });
    }
  },
  async receita(req, res) {
    let results = await Recipes.find(req.params.id);
    const recipe = results.rows[0];
    if (!recipe) return res.send("Recipe not found");

    return res.render(`users/receita`, { recipe });
  },
  async chefs(req, res) {
    let results = await Chefs.all();
    const chefs = results.rows;
    return res.render("users/chefs", { chefs });
  },
};
