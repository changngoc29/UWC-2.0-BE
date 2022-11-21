const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const app = express();

app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.use('*', (req, res, next) => {
  res.status(404).send('Oopps !! This router does not exist');
});

app.listen(8080, () => {
  console.log('App is running on port 8080');
});
