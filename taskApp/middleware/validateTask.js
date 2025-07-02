const { body, validationResult } = require('express-validator');

const validateTask = [
  body('description').notEmpty().withMessage('Description is required'),
  body('completed').optional().isBoolean().withMessage('Completed must be true or false'),
  body('owner').notEmpty().withMessage('Owner ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = errors.array();
      return next(error);
    }
    next();
  }
];

module.exports = validateTask;
