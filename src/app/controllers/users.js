module.exports = {
  home(req, res) {
    return res.render("users/home");
  },
  sobre(req, res) {
    return res.render("users/sobre");
  },
  receitas(req, res) {
    return res.render("users/receitas");
  },
  receita(req, res) {
    return res.render("users/receita");
  },
};
