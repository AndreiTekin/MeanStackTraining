const express = require('express');
const router = express.Router();
const bookController = require('./controllers.js')

const requestLogger = (req, res, next) => {
  req.time = new Date(Date.now()).toString(); 
  console.log(`${req.method} ${req.hostname} ${req.originalUrl} at ${req.time}`); 
  next(); 
};

router.use(requestLogger);
router.get('/', bookController.getHomePage)
router.get('/about', bookController.getAboutPage)
router.get('/help', bookController.getHelpPage)
router.get('/books', bookController.getAllBooks)
router.get('/books/:id', bookController.getSpecificBook)
router.put('/books/:id', bookController.updateExistingBook)
router.delete('/books/:id', bookController.deleteBook)
router.post('/books', bookController.addNewBook)
module.exports = router;