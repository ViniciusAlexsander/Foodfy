const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

let port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`O pai ta on na porta ${port}`);
});
