const express = require('express');
const { signup, login } = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/signup',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6+ chars').isLength({ min: 6 })
  ],
  signup
);

router.post('/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

module.exports = router;
