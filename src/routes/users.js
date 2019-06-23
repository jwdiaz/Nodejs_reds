const router = require("express").Router();
const passport = require("passport");

// Models
const Usuario = require("../models/User");

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  
    // Saving a New User
    const newUser = new Usuario({
      documento: req.body.documento,
      nombre: req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      password: req.body.password,
      tipo: "aspirante"
    });
    newUser.password = await newUser.encryptPassword(req.body.password);
    await newUser.save();
    
    res.redirect("/users/signin");
  
});



router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
  })
);

router.get("/users/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
});

module.exports = router;
