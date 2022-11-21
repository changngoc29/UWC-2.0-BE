const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/userData.json`));

exports.checkID = (req, res, next, val) => {
  console.log(val);

  if (req.params.id * 1 > users.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (
    !req.body.name &&
    !req.body.email &&
    !req.body.role &&
    !req.body.password &&
    !req.body.phone
  ) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Missing one of these fields: name, email, role, password, phone',
    });
  }

  next();
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;

  const user = users.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  const newID = users[tours.users - 1].id + 1;
  const newUser = Object.assign({ id: newID }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/../data/userData.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    }
  );
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: '<updated user here>',
    },
  });
};

exports.deleteUSer = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
