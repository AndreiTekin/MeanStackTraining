const mongoose = require('mongoose');

function catchInvalidObjectId(req, res, next) {
  const isIdParam = req.params.id;
  if (isIdParam && !mongoose.Types.ObjectId.isValid(isIdParam)) {
    const err = new Error('Invalid ID format');
    err.status = 400;
    return next(err);
  }
  next();
}

module.exports = catchInvalidObjectId;
