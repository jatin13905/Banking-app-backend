const mongoose = require('mongoose');

const emp_schema = mongoose.Schema({

    empId : Number,
    emppass : String

});

const emp_model = mongoose.model("Emp_Model",emp_schema);

module.exports = emp_model;