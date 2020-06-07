const Chefs = require("../models/Chefs");

module.exports = {
  index(req, res) {
    Chefs.all(function (chefs) {
      return res.json("admin/chefs/index", {chefs});
    });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Prease, fill all filds");
      }
    }
    Chefs.create(req.body, function (chef) {
      return res.redirect(`/admin/chefs/${chef.id}`);
    });
  },
  show(req, res) {
    Chefs.find(req.params.id,function(chef) {
      if(!chef) return res.send("Chef not found")
      return res.render(`admin/chefs/show`, {chef})
    })
  },
};
