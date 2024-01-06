var express = require('express');
const { model } = require('mongoose');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelUser = require('../models/department')

const {validationResult} = require('express-validator');

router.get('/', async function (req, res, next) {

  var usersAll = await modelUser.getall(req.query);
  responseData.responseReturn(res, 200, true, usersAll);
});
router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var user = await modelUser.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.post('/add',
  async function (req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      responseData.responseReturn(res, 400, false, errors.array().map(error=>error.msg));
      return;
    }
  var department = await modelUser.getByName(req.body.name);
  if (department) {
    responseData.responseReturn(res, 404, false, "user da ton tai");
  } else {
   
    const newDepartment = await modelUser.createUser({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    })
    
    responseData.responseReturn(res, 200, true, newDepartment);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    var department = await modelUser.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, department);  
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  try {
    var department = modelUser.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
module.exports = router;