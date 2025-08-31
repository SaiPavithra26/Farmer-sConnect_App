const express = require('express');
const { body } = require('express-validator');
const { create, get } = require('../controllers/profileController.js');
const { protect } = require('../middleware/auth.js');
const validateRequest = require('../middleware/validateRequest.js');

const router = express.Router();

// Create Farmer Profile
router.post(
  '/',
  protect(['farmer']),
  [
    body('landDetails').notEmpty().withMessage('Land details are required'),
    body('experience').isInt({ min: 0 }).withMessage('Experience must be a non-negative number')
  ],
  validateRequest,
  create
);

// Get Farmer Profile by ID
router.get('/:id', protect(['farmer', 'buyer']), get);

module.exports = router;
