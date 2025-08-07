const ebookRoute = require("./ebookRoute");

function route(app) {
  app.use("/ebook", ebookRoute);
}

module.exports = route;
