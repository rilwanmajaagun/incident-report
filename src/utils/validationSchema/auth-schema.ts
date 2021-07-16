import { body } from 'express-validator';

export const registerSchema = [
  body('first_name').notEmpty().withMessage('first_name is required'),
  body('last_name').notEmpty().withMessage('first_name is required'),
  body('email').isEmail().toLowerCase(),
  body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
];

export const loginSchema = [
  body('email')
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid Email'),
  body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
];
