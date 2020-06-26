const Chefs = require("../models/Chefs");
// const recipes = require("./recipes");

module.exports = {
  async index(req, res) {
    let results = await Chefs.all();
    const chefs = results.rows;

    return res.render("admin/chefs/index", { chefs });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Prease, fill all filds");
      }
    }

    let results = await Chefs.create(req.body);
    const chef = results.rows[0];

    return res.redirect(`/admin/chefs/${chef.id}`);
  },
  async show(req, res) {
    let results = await Chefs.find(req.params.id);
    const chef = results.rows[0];
    if (!chef) return res.send("Chef not found");

    results = await Chefs.findRecipe(req.params.id);
    const recipes = results.rows;

    results = await Chefs.countRecipe(req.params.id);
    const qntRecipes = results.rows[0];

    return res.render(`admin/chefs/show`, { chef, recipes, qntRecipes });
  },
  async edit(req, res) {
    let results = await Chefs.find(req.params.id);
    const chef = results.rows[0];

    if (!chef) return res.send("Chef not found");
    return res.render("admin/chefs/edit", { chef });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all filds");
      }
    }
    await Chefs.update(req.body);

    return res.redirect(`/admin/chefs/${req.body.id}`);
  },
  async delete(req, res) {
    await Chefs.delete(req.body.id);
    return res.redirect(`/admin/chefs`);
  },
};
