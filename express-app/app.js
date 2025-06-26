require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const pageRoutes = require('./routes'); 
const errorHandler = require('./errorMiddleware');


app.use(express.json());
app.use('/', pageRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} running at http://localhost:${PORT}`);
});
