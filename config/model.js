var sequelize = require('./sequelize');
var test = require("../model/test");
sequelize.define("test", test.fields, test.options);
module.exports = sequelize.models;