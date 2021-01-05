const express = require('express');
const router = express();

const {
  getNurses,
  postNurse,
  loginNurse
} = require('../controllers/nurseController')

router.get('/', getNurses)
router.post('/sign-up', postNurse)
router.post('/login', loginNurse)

module.exports = router;
