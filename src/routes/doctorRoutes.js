const express = require('express')
const router = express();

const {
  getDoctors,
  postDoctor,
  loginDoctor
} = require('../controllers/doctorController')

router.get('/', getDoctors)
router.post('/sign-up', postDoctor)
router.post('/login', loginDoctor)

module.exports = router
