const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// captain register routes
router.post('/register', [
    body('email').isEmail().withMessage('Invalide Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at Least 3 characters Long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters Long'),
    body('vechile.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vechile.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vechile.capacity').isInt().withMessage('Capacity must at least 1'),
    body('vechile.vechileType').isIn(['car', 'motorcyle', 'auto']).withMessage('vehicle type must be car, motorcyle or auto'),
], captainController.registerCaptain)

// login router
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain)


// captain profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

// captain logout
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router