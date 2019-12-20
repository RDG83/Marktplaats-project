const mongoose = require("mongoose");
const Product = require("./models/product");
const Thread = require("./models/thread");
const User = require("./models/user");
const faker = require("faker");
const authorArray = [];
const newUserAmount = 10;

// remove users
exports.flushUsers = function () {
  User.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed users");
    }
  })
};

exports.seedUsers = function () {
  for (let i = 0; i < newUserAmount; i++) {
    let name = faker.name.firstName();
    let email = faker.internet.email();
    let password = "password";

    let newUser = new User({
      username: `${name}`,
      email: `${email}`,
      password: `${password}`
    });
    User.register(newUser, password, function (err) {
      if (err) {
        console.log(err)
      }
    });
    authorArray.push(newUser);
  }
}

// remove products
exports.flushProducts = function () {
  Product.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed products");
    }
  })
};

const catArray =
  ["Antiek en Kunst", "Audio en Tv", "Fotografie", "Auto's", "Boeken", "Caravans en Kamperen", "Cd's en Dvd's", "Computers en Software", "Dieren en Toebehoren", "Doe-het-zelf en Verbouwen", "Fietsen en Brommers", "Hobby en Vrije tijd", "Huis en Inrichting", "Huizen en Kamers", "Kinderen en Baby's", "Dameskleding", "Herenkleding", "Motoren", "Muziek en Instrumenten", "Postzegels en Munten", "Sieraden en Tassen", "Spelcomputers en Games", "Sport en Fitness", "Telecommunicatie", "Tickets en Kaartjes", "Tuin en Terras", "Vakantie", "Verzamelen", "Watersport en Boten", "Witgoed en Apparatuur", "Zakelijke goederen", "Diversen"
  ]

const munArray =
  ["Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Arnhem", "Enschede", "Amersfoort", "Zaanstad", "Haarlemmermeer", "'s-Hertogenbosch", "Zwolle", "Leiden", "Zoetermeer", "Leeuwarden",
  ]

const imgArray = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpg", "40.jpg"
]

exports.seedProducts = function () {
  for (let i = 0; i < 100; i++) {
    let title = faker.commerce.productName();
    let body = faker.lorem.paragraph();
    let category = catArray[Math.floor(Math.random() * catArray.length)];
    let price = faker.commerce.price();
    let minprice = price / 2;
    let municipality = munArray[Math.floor(Math.random() * munArray.length)];
    let location = { coordinates: [faker.address.longitude(), faker.address.latitude()] };
    let images = []
    for (let i = 0; i < 4; i++) {
      images.push(imgArray[Math.floor(Math.random() * imgArray.length)])
    };
    let author = authorArray[Math.floor(Math.random() * authorArray.length)];
    // threads
    // bids


    let newProduct = new Product({
      title: `${title}`,
      body: `${body}`,
      category: `${category}`,
      price: `${price}`,
      minprice: `${minprice}`,
      municipality: `${municipality}`,
      location: location,
      images: images,
      author: author,
    });
    Product.create(newProduct, function (err) {
      if (err) {
        console.log(err)
      }
    });
  }
}

// exports.seedBids = function () {
//   for (let i = 0; i < 3; i++) {
//     let name = authorArray[Math.floor(Math.random() * authorArray.length)].username
//     let randomAmount = [Math.floor(Math.random() * 1.5) + 1 * minprice]

//     let newBid = new Bid({
//       username: `${name}`,
//       amount: `${randomAmount}`,
//     });
//     Bid.register(newBid, function (err) {
//       if (err) {
//         console.log(err)
//       }
//     });
//   }
// }

// let bids = [{ amount: randomAmount, author: { username: randomUser } }]


// // add products
// //   seedData.forEach(function (seed) {
// //     Product.create(seed, function (err) {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         console.log("added product");
// //       }
// //     })
// //   })
// //   threadData.forEach(function (thread) {
// //     Thread.create(thread, function (err) {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         console.log("added thread")
// //       }
// //     })
// //   })
// // }

// // const seedData =
// //   [
// //     {
// //       title: "Rode racefiets",
// //       category: "Fietsen",
// //       price: 299,
// //       minprice: 200,
// //       municipality: "Groningen",
// //       body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
// //       images: [
// //         "aut"o1.jpg", , "aut"o2.jpg", , "aut"o3.jpg", , "aut"o4.jpg", 
// //       ],
// //       location: {
// //         coordinates: [53.218734715241844, 6.567541658878327]
// //       },
// //       threads: ["5de641b83e284d31f8e016fb"],
// //       bids: [
// //         { "_id": "5de770dd72b7d42bbc15d30e", "amount": 250, "createdAt": "2019-12-04T08:39:57.155Z", "author": { "username": "Mathijs" } },
// //         { "_id": "5de7710672b7d42bbc15d311", "amount": 260, "createdAt": "2019-12-04T08:40:38.500Z", "author": { "username": "Kees" } },
// //         { "_id": "5de7711272b7d42bbc15d312", "amount": 280, "createdAt": "2019-12-04T08:40:50.334Z", "author": { "username": "Mathijs" } }
// //       ],
// //       author: {
// //         _id: "5de61e8e4fd6ae1c5c7d918e",
// //         username: "Robert"
// //       },

// //     },
// //     {
// //       title: "Blauwe racefiets",
// //       category: "Fietsen",
// //       price: 299,
// //       minprice: 200,
// //       municipality: "Groningen",
// //       body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
// //       images: [
// //         "aut"o5.jpg", , "aut"o6.jpg", 
// //       ],
// //       location: {
// //         coordinates: [53.218734715241844, 6.567541658878327]
// //       },
// //       threads: [],
// //       bids: [
// //         { "_id": "5de65246a476e9185c286167", "amount": 200, "createdAt": "2019-12-03T12:17:10.743Z", "author": { "username": "Mathijs" } },
// //         { "_id": "5de65255a476e9185c286169", "amount": 210, "createdAt": "2019-12-03T12:17:25.566Z", "author": { "username": "Robert" } },
// //         { "_id": "5de6526aa476e9185c28616a", "amount": 220, "createdAt": "2019-12-03T12:17:46.274Z", "author": { "username": "Mathijs" } }
// //       ],
// //       author: {
// //         _id: "5de639363211ea2948bc05a7",
// //         username: "Piet"
// //       }
// //     },
// //     {
// //       title: "Gele racefiets",
// //       category: "Fietsen",
// //       price: 299,
// //       minprice: 200,
// //       municipality: "Groningen",
// //       body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
// //       images: [
// //         "aut"o6.jpg", 
// //       ],
// //       location: {
// //         coordinates: [53.218734715241844, 6.567541658878327]
// //       },
// //       threads: [],
// //       bids: [],
// //       author: {
// //         _id: "5de61e8e4fd6ae1c5c7d918e",
// //         username: "Robert"
// //       },

// //     },
// //     {
// //       title: "Banaan",
// //       category: "Fruit",
// //       price: 299,
// //       minprice: 200,
// //       municipality: "Groningen",
// //       body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
// //       images: [
// //         "aut"o4.jpg", 
// //       ],
// //       location: {
// //         coordinates: [53.218734715241844, 6.567541658878327]
// //       },
// //       threads: [],
// //       bids: [],
// //       author: {
// //         _id: "5de639363211ea2948bc05a7",
// //         username: "Piet"
// //       }
// //     },
// //     {
// //       title: "Aardbei",
// //       category: "Fruit",
// //       price: 299,
// //       minprice: 200,
// //       municipality: "Groningen",
// //       body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
// //       images: [
// //         "aut"o3.jpg", , "aut"o4.jpg", 
// //       ],
// //       location: {
// //         coordinates: [53.218734715241844, 6.567541658878327]
// //       },
// //       threads: [],
// //       bids: [],
// //       author: {
// //         _id: "5de61e8e4fd6ae1c5c7d918e",
// //         username: "Robert"
// //       },

// //     },
// //     {
// //       title: "Bosbes",
// //       category: "Fruit",
// //       price: 299,
// //       minprice: 200,
// //       municipality: "Groningen",
// //       body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
// //       images: [
// //         "aut"o2.jpg", , "aut"o3.jpg", , "aut"o4.jpg", 
// //       ],
// //       location: {
// //         coordinates: [53.218734715241844, 6.567541658878327]
// //       },
// //       threads: [],
// //       bids: [],
// //       author: {
// //         _id: "5de639363211ea2948bc05a7",
// //         username: "Piet"
// //       }
// //     }
// //   ];

// // const threadData = [
// //   {
// //     "_id": "5de641b83e284d31f8e016fb",
// //     "users": [
// //       { "_id": "5de61ea14fd6ae1c5c7d918f", "username": "Mathijs" },
// //       { "_id": "5de61e8e4fd6ae1c5c7d918e", "username": "Robert" }
// //     ],
// //     "messages": [
// //       {
// //         "_id": "5de641b83e284d31f8e016fc",
// //         "content": "        Beste Mathijs,\r\n  \r\nIk heb een vraag over 'Product Mathijs 1'\r\n  \r\n  hoi mathijs\r\n  \r\nMet vriendelijke groet,\r\n  \r\nRobert\r\n  ",
// //         "createdAt": "2019-12-03T11:06:32.875Z"
// //       },
// //       {
// //         "_id": "5de641e73e284d31f8e016fd",
// //         "content": "        Beste Mathijs,\r\n  \r\nIk heb een vraag over 'Product Mathijs 1'\r\n  \r\n  nog een keer hoi mathijs\r\n  \r\nMet vriendelijke groet,\r\n  \r\nRobert\r\n  ",
// //         "createdAt": "2019-12-03T11:07:19.887Z"
// //       },
// //       {
// //         "_id": "5de642327d53ed376c3450a5",
// //         "content": "        Beste Mathijs,\r\n  \r\nIk heb een vraag over 'Product Mathijs 1'\r\n  \r\n  bericht 3\r\n  \r\nMet vriendelijke groet,\r\n  \r\nRobert\r\n  ",
// //         "createdAt": "2019-12-03T11:08:34.088Z"
// //       }], "__v": 3,
// //     "product": { "_id": "5de61eb74fd6ae1c5c7d9190" }
// //   }
// // ]