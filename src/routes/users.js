const router = require('express').Router();
const passport = require('passport');

// Models
const Usuario = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { documento, nombre, correo, telefono, password, tipo } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'La contraseña no es igual.'});
  }
  if(password.length < 4) {
    errors.push({text: 'La contraseña debe ser mayor de 4 caracteres.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await Usuario.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'The Email is already in use.');
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new Usuario({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/users/signin');
});

module.exports = router;