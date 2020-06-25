const Recipes = require("../models/Recipes");

module.exports = {
  async index(req, res) {
    let results = await Recipes.all();
    const recipes = results.rows;

    return res.render("admin/recipes/index", { recipes });
  },
  async create(req, res) {
    let results = await Recipes.chefsSelect();
    const options = results.rows;
    return res.render("admin/recipes/create", { chefs: options });
  },
  async post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all filds");
      }
    }

    let results = await Recipes.create(req.body);
    const recipe = results.rows[0];

    return res.redirect(`/admin/recipes/${recipe.id}`);
  },
  async show(req, res) {
    let results = await Recipes.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Recipe not found");
    return res.render(`admin/recipes/show`, { recipe });
  },
  async edit(req, res) {
    let results = await Recipes.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Recipe not found");

    results = await Recipes.chefsSelect();
    const options = results.rows;

    return res.render("admin/recipes/edit", { recipe, chefs: options });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all filds");
      }
    }

    await Recipes.update(req.body);
    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  async delete(req, res) {
    await Recipes.delete(req.body.id);
    return res.redirect(`/admin/recipes`);
  },
};
