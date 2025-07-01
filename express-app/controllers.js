const Book = require('./models/Book');
const { validateBookFields } = require('./validationHelper');
const { badRequestError, notFoundError } = require('./errorHelpers');


const getHomePage = (req, res) => {
  res.send('<h1> You have arrived at the Home page </h1>');
};

const getAboutPage = (req, res) => {
  res.send('<h1> You have arrived at the About page </h1>');
};

const getHelpPage = (req, res) => {
  res.json({ 
    message: 'Need Help?',
    Contact: 'helpdesk@gmail.com'
  });
};



const getAllBooks = (req, res, next) => {
  let filter = {};
  if (req.query.author) {
    filter.author = { $regex: req.query.author, $options: 'i' };
  }
  if (req.query.title) {
    filter.title = { $regex: req.query.title, $options: 'i' };
  }

  Book.find(filter)
    .then(books => res.status(200).json(books))
    .catch(err => next(err));
};

const getSpecificBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) return next(notFoundError('Book not found'));
      res.status(200).json(book);
    })
    .catch(err => next(err));
};

const addNewBook = (req, res, next) => {
  const { title, author } = req.body;
  if (!validateBookFields(title, author)) {
    return next(badRequestError('Title and Author are required and cannot be empty'));
  }

  const newBook = new Book({ title, author });
  newBook.save()
    .then(book => res.status(201).json(book))
    .catch(err => next(err));
};

const updateExistingBook = (req, res, next) => {
  const { title, author } = req.body;
  if (!validateBookFields(title, author)) {
    return next(badRequestError('Title and Author are required and cannot be empty'));
  }

  Book.findByIdAndUpdate(
    req.params.id,
    { title, author },
    { new: true, runValidators: true }
  )
    .then(updatedBook => {
      if (!updatedBook) return next(notFoundError('Book not found'));
      res.status(200).json(updatedBook);
    })
    .catch(err => next(err));
};

const deleteBook = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(deletedBook => {
      if (!deletedBook) return next(notFoundError('Book not found'));
      res.status(200).json({ message: 'Book deleted successfully' });
    })
    .catch(err => next(err));
};

module.exports = {
  getHomePage,
  getAboutPage,
  getHelpPage,
  getAllBooks,
  getSpecificBook,
  addNewBook,
  updateExistingBook,
  deleteBook
};
