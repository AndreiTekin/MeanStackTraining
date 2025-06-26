const books = [
  {
    id: 1, title: 'book1', author: 'author1'    
  },
  { 
    id: 2, title: 'book2', author: 'author2'   
  }
];

const { validateBookFields } = require('./validationHelper');
const { badRequestError, notFoundError } = require('./errorHelpers')

const getHomePage =  (req, res) => {
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

const getAllBooks = (req,res,next) => {
  let results = books;
  if(req.query.author) {
    results = results.filter(book => 
      book.author.toLowerCase().includes(req.query.author.toLowerCase()))
    } 
  if(req.query.title) {
    results = results.filter(book => 
      book.title.toLowerCase().includes(req.query.title.toLowerCase()))
    }
  res.status(200).json(results);
};

const getSpecificBook = (req,res,next) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if(!book) { 
    return next(notFoundError('Book not found'));
    }
  res.status(200).json(book);
};

const updateExistingBook = (req,res,next) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id); 
  if(!book) { 
    return next(notFoundError('Book not found'));
  }
  const {title, author} = req.body;
  if (!validateBookFields(title,author)){
    return next(badRequestError('Title and Author are required and cannot be empty'));
  }
  book.title = title;
  book.author = author;
  res.status(200).json(book);
};

const deleteBook = (req,res,next) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id); 
  if(index === -1){
    return next(notFoundError('Book not found'));
  }
  books.splice(index, 1 );
  res.status(200).json({ message: 'Book deleted successfully'});
};

const addNewBook = (req, res, next) => {
  const {title, author} = req.body;
  if (!validateBookFields(title,author)){
    return next(badRequestError('Title and Author are required and cannot be empty'));
  }
  const id = books.length + 1;
  const newBook = {id,title, author};
  books.push(newBook);
  res.status(201).json(newBook)
};

module.exports = {
  getHomePage,
  getAboutPage,
  getHelpPage,
  getAllBooks,
  getSpecificBook,
  updateExistingBook,
  deleteBook,
  addNewBook
};
