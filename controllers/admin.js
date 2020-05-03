const fs = require("fs");
const data = require("../data.json");

//apenas mostra a pagina de criação
exports.create = function (req, res) {
  return res.render("admin/create");
};

//realmente permite cria
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, write in all filds before send");
    }
  }

  let {
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  } = req.body;

  if (data.recipes[0] == undefined) {
    lastId = 0;
  } else {
    lastId = data.recipes[data.recipes.length - 1].id + 1;
  }

  const create_at = Date.now();
  const id = Number(lastId);

  data.recipes.push({
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
    create_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect(`/receita/${id}`);
  });
};
