const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const settings = require('../config/settings');
const Doctor = require('../models/doctorModel');

const getDoctors = async (req, res, next) => {
  await Doctor.find({})
  .then(doctor => {
    res.status(200).json({message: "Doctors are here!"})
  })
  .catch(error => {
    res.status(403).json({message: "error geting doctors"})
  })
}

const postDoctor = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    const {firstName, lastName, email, password, } = req.body
    const newDoctor = new Doctor({
      firstName,
      lastName,
      email,
      password
    })
    // save the doctor
    newDoctor.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}

// const postDoctor = async (req, res, next) => {
//   try {
//     const {firstName, lastName, email, password, } = req.body
//     const hashedPassowrd = await bcrypt.hash(password, 10)
//     const doctor = {
//       firstName,
//       lastName,
//       email,
//       hashedPassowrd,
//       }
//       Doctor.create(doctor)
//       res.status(200).json({message: "You are successfully registered"})
//     } catch {
//       res.json({message: "error completing registration"})
//     }
// }

const loginDoctor = (req, res) => {
  Doctor.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  })
}

module.exports = {
  getDoctors,
  postDoctor,
  loginDoctor
}
