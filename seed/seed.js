const seed = require("../seeds");

exports.flushAndSeed = function () {
  seed.flushUsers();
  seed.flushProducts();
  seed.seedUsers();
  seed.seedProducts();
}