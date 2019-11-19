const mongoose = require("mongoose");
const Product = require("./models/product");

const seedData =
[
    {
        title: "Rode racefiets",
        category: "Fietsen",
        price: 299,
        minprice: 250,
        body: "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>",
        images:
            {
                0: "kaas.jpg",
                1: "banaan.jpg"
            }
    }
];