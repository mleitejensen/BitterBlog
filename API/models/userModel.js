const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
});

userSchema.statics.signup = async function(username, password, passwordCheck) {
    if (!username || !password) {
      throw Error('All fields must be filled')
    }

    if(password !== passwordCheck){
      throw Error("Passwords do not match")
    }

    const exists = await this.findOne({ username })

    if (exists) {
      throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash })

    console.log(`[userModel] ${user.username} created`)
    return user
}

userSchema.statics.login = async function(username, password) {

  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Incorrect username')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  console.log(`[userModel] ${user.username} logged in`)
  return user
}


const User = mongoose.model('user', userSchema);

module.exports = User;