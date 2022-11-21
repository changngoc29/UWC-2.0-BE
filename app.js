const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.use('*', (req, res, next) => {
  res.status(404).send('Oopps !! This router does not exist');
});

// starting port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('App is running on port 8080');
});
