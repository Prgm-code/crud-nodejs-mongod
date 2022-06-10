const userCtrl = {};
const passport = require('passport');
const User =require('../models/User');

userCtrl.renderSingUpForm = (req,res) => {
    res.render('users/singup');
};

userCtrl.singup = async (req,res) => {
    const errors = [];
    const {name, email, password, confirm_password} =req.body;
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden.'});
    }
    if (password.length < 4) {
        errors.push ({text:'El passwore debe contener al menos 4 caracteres.'});
    }
    if (errors.length > 0) {
        res.render('users/singup', { 
            errors ,
            name,
            email,
        })
    } else {
        const emailUser =  await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El e-mail ya esta en uso.');
            res.redirect('/users/singup');
        }else{
            const newUser =  new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Te has registrado');
            res.redirect('/users/singin');
        }
        }
    
    }


userCtrl.renderSinginForm = (req, res ) =>{
    res.render('users/singin'); 
  // res.send('sinddddgin');
};

userCtrl.singin = passport.authenticate('local',{
    failureRedirect: '/users/singin',
    successRedirect: '/notes',
    failureFlash: true
});

userCtrl.logout = (req,res)=>{
    req.logout();
    req.flash('success_msg', 'La sesión se ha cerrado exitosamente.');
    res.redirect('/users/singin');
};

module.exports = userCtrl;