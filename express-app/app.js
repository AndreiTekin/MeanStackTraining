require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db');
const PORT = process.env.PORT || 5000;

connectDB();

const pageRoutes = require('./routes'); 
const errorHandler = require('./errorMiddleware');


app.use(express.json());
app.use('/', pageRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} running at http://localhost:${PORT}`);
});
