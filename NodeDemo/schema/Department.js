var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const configs = require('../helper/configs')

const schema = new mongoose.Schema({
  name:String,
    email: String,
    age: String
});

module.exports = mongoose.model('department', schema);;
