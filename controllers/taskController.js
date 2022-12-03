const fs = require('fs');
const vehicles = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/vehicleData.json`)
);
const MCPs = JSON.parse(fs.readFileSync(`${__dirname}/../data/MCPData.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/userData.json`));
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/../data/taskData.json`));

exports.getAllVehicles = (req, res) => {
  let results = vehicles;
  if (req.query.status) {
    results = results.filter(result => result.status === req.query.status);
  }
  res.status(200).json({
    status: 'success',
    length: results.length,
    data: results
  });
};

exports.getAllMCPs = (req, res) => {
  let results = MCPs;
  if (req.query.status) {
    results = results.filter(result => result.status === req.query.status);
  }
  res.status(200).json({
    status: 'success',
    length: results.length,
    data: results
  });
};

exports.getAllTasks = (req, res) => {
  let results = tasks;
  if (req.query.status) {
    results = results.filter(result => result.status === req.query.status);
  }
  res.status(200).json({
    status: 'success',
    length: results.length,
    data: results
  });
};

exports.getTask = (req, res) => {};

const updateUserStatus = (id, status) => {
  users.map(user => {
    if (user.id === id) {
      user.status = status;
    }
  });

  fs.writeFile(
    `${__dirname}/../data/userData.json`,
    JSON.stringify(users),
    err => {
      console.log(err);
    }
  );
};

const updateMCPStatus = (id, status) => {
  MCPs.map(MCP => {
    if (MCP.id === id) {
      MCP.status = status;
    }
  });

  fs.writeFile(
    `${__dirname}/../data/MCPData.json`,
    JSON.stringify(MCPs),
    err => {
      console.log(err);
    }
  );
};

const updateVehicleStatus = (id, status) => {
  vehicles.map(vehicle => {
    if (vehicle.id === id) {
      vehicle.status = status;
    }
  });

  fs.writeFile(
    `${__dirname}/../data/VehicleData.json`,
    JSON.stringify(vehicles),
    err => {
      console.log(err);
    }
  );
};

exports.createTask = (req, res) => {
  const newID = tasks[tasks.length - 1].id + 1;
  const newTask = Object.assign({ id: newID, status: 'pending' }, req.body);

  updateUserStatus(newTask.employeeId, 'Pending task');
  updateMCPStatus(newTask.mcpId, 'progress');

  if (newTask.type === 'collector') {
    updateVehicleStatus(newTask.vehicleId, 'pending task');
  }

  tasks.push(newTask);

  fs.writeFile(
    `${__dirname}/../data/taskData.json`,
    JSON.stringify(tasks),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          task: newTask
        }
      });
    }
  );
};

exports.updateTask = (req, res) => {
  const id = req.params.id * 1;
  tasks.map(task => {
    if (task.id === id) {
      task.status = 'finished';
      updateMCPStatus(task.mcpId, 'empty');
      updateUserStatus(task.employeeId, 'Available');
      if (task.type === 'collector') {
        updateVehicleStatus(task.vehicleId, 'available');
      }
    }
  });

  fs.writeFile(
    '${__dirname}/../data/taskData.json',
    JSON.stringify(tasks),
    err => {
      res.status(200).json({
        status: 'success'
      });
    }
  );
};

exports.deleteTask = (req, res) => {};
