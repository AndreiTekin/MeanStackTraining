const express = require('express');
const app = express();
const PORT = 3000;
const requestLogger = (req, res, next) => {
  req.time = new Date(Date.now()).toString(); 
  console.log(`${req.method} ${req.hostname} ${req.path} ${req.time}`); 
  next(); 
};

app.use(requestLogger);
app.use(express.json());

const books = [
  {
    id: 1, title: 'book1', author: 'author1'    
  },
  { 
    id: 2, title: 'book2', author: 'author2'   
  }
];

app.get('/', (req, res) => {
  res.send('<h1> You have arrived at the Home page </h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1> You have arrived at the About page </h1>');
});

app.get('/help', (req, res) => {
  res.json({ 
    message: 'Need Help?',
    Contact: 'helpdesk@gmail.com'
  });
});

app.get('/books', (req,res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if(!book) { 
    return res.status(404).json({message: 'Book not found'})
  }
  res.status(200).json(book);
});

app.put('/books/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id); 
  if(!book) { 
    return res.status(404).json({message: 'Book not found'})
  }
  const {title, author} = req.body;
  if(!title || !author){
    return res.status(400).json({message: 'title and author are required'})
  }
  book.title = title;
  book.author = author;
  res.status(200).json(book);
});

app.delete('/books/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id); 
  if(index === -1){
    return res.status(404).json({message: 'Book not found'})
  }
  books.splice(index, 1 );
  res.status(200).json({ message: 'Book deleted successfully'});
});

app.post('/books', (req, res) => {
  const {title, author} = req.body;
  const id = books.length + 1;
  const newBook = {id,title, author};
  books.push(newBook);
  res.status(201).json(newBook)
});

app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
});