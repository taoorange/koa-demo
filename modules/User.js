const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模板
const UserSchema= new Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
})


module.exports = User = mongoose.model("users", UserSchema)