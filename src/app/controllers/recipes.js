const Recipes = require("../models/Recipes");

module.exports = {
  index(req, res) {
    Recipes.all(function (recipes) {
      return res.render("admin/index", { recipes });
    });
  },
  create(req, res) {
    return res.render("admin/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all filds");
      }
    }

    Recipes.create(req.body, function (recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`);
    });
  },
  show(req, res) {
    Recipes.find(req.params.id, function (recipe) {
      if (!recipe) return res.send("Recipe not found");
      return res.render(`admin/show`, { recipe });
    });
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    return;
  },
  delete(req, res) {},
};

// exports.edit = function (req, res) {
//   const { id } = req.params;
//   let foundRecipe;

//   for (let i = 0; i < data.recipes.length; i++) {
//     if (data.recipes[i].id == id) {
//       foundRecipe = data.recipes[i];
//     }
//   }

//   if (!foundRecipe) return res.send("Não foi encontrada nenhuma receita");

//   const recipe = {
//     ...foundRecipe,
//   };

//   return res.render("admin/edit", { recipe });
// };

// exports.put = function (req, res) {
//   const { id } = req.body;

//   let foundRecipe;

//   for (let i = 0; i < data.recipes.length; i++) {
//     if (data.recipes[i].id == id) {
//       foundRecipe = data.recipes[i];
//     }
//   }

//   if (!foundRecipe) return res.send("Não foi encontrada nenhuma receita");

//   const recipe = {
//     ...foundRecipe,
//     ...req.body,
//   };

//   for (let i = 0; i < data.recipes.length; i++) {
//     if (data.recipes[i].id == id) {
//       data.recipes[i] = recipe;
//     }
//   }

//   fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
//     if (err) return res.send("write error");

//     return res.redirect(`/admin/recipes/${id}`);
//   });
// };

// exports.delete = function (req, res) {
//   const { id } = req.body;

//   const filteredRecipe = data.recipes.filter(function (recipe) {
//     return recipe.id != id;
//   });

//   data.recipes = filteredRecipe;

//   fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
//     if (err) return res.send("write file error");

//     return res.redirect("/admin/recipes");
//   });
// };
