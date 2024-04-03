const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const createWebToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

const signup = async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.signup(username, password)
        res.status(200).json({ result: `${user.username} created`})
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try{
      const user = await User.login(username, password)
      if(user.admin === false){
        throw Error("You are not an admin")
      }
      const token = createWebToken(user._id)
      res.status(200).json({username, token})
    }catch(error){
      res.status(400).json({ error: error.message })
    }
}

module.exports = {
    signup,
    login
}