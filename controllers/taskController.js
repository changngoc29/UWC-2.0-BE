const fs = require('fs');
const vehicles = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/vehicleData.json`)
);
const MCPs = JSON.parse(fs.readFileSync(`${__dirname}/../data/MCPData.json`));

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

exports.getAllTasks = (req, res) => {};

exports.getTask = (req, res) => {};

exports.createTask = (req, res) => {};

exports.updateTask = (req, res) => {};

exports.deleteTask = (req, res) => {};
