const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const settings = require('../config/settings')
const Nurse = require('../models/nurseModel')

const getNurses = async (req, res, next) => {
  await Nurse.find({})
  .then(doctor => {
    res.status(200).json({message: "Doctors are here!"})
  })
  .catch(error => {
    res.json({message: "error geting doctors"})
  })
}

const postNurse = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please enter username and password.'});
  } else {
    const {firstName, lastName, email, password, } = req.body
    const newNurse = new Nurse({
      firstName,
      lastName,
      email,
      password
    });
    // save the nurse
    newNurse.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
}
}
const loginNurse = (req, res) => {
  Nurse.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), settings.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  })
}

module.exports = {
  getNurses,
  postNurse,
  loginNurse
}
