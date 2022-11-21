const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/userData.json`));

exports.checkLogin = (req, res) => {
  for (let user of users) {
    if (user.email === req.body.email && user.password === req.body.password) {
      return res.status(201).json({
        status: 'success',
        id: user.id
      });
    }
  }

  res.status(401).json({
    status: 'fail',
    message: 'Incorrect email or password'
  });
};
