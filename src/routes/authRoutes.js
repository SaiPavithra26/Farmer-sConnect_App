const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController.js');
const validateRequest = require('../middleware/validateRequest.js');

const router = express.Router();

// Register User
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters'),
    body('role').isIn(['farmer', 'buyer']).withMessage('Role must be farmer or buyer')
  ],
  validateRequest,
  register
);

// Login User
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  login
);



module.exports = router;
