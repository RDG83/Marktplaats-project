const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/login", function(req, res) {
  // passport handling here
  res.render("login");
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
//   })
// );

router.get("/logout", function(req, res) {
  // passport handling here
  res.send("welcome to the logout route");
});

router.get("/signup", function(req, res) {
  // passport handling here
  res.render("signup");
});

router.post("/signup", function(req, res) {
  const { name, email, password, password2 } = req.body;
  // passport handling here
  let errors = [];
  // check of alle velden zijn ingevuld
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Vul alle velden in" });
  }
  // check of passwords hetzelfde zijn
  if (password !== password2) {
    errors.push({ msg: "Wachtwoorden komen niet overeen" });
  }
  // check of password lang genoeg is
  if (password.length < 6) {
    errors.push({ msg: "Wachtwoord is onvoldoende lang" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    res.send("signup succesvol");
  }
});

module.exports = router;
