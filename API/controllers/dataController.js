const DataModel = require("../models/dataModel")
const User = require("../models/userModel")

const maxBodyLength = 100
const latestPosts = 5

const getLatest = async (req, res) => {
    try{
        let latestList = []
        const dataList = await DataModel.find({}).sort({ createdAt: 'desc'}).exec();
        for(let i = 0; i < latestPosts; i++){
            latestList.push(dataList[i])
        }
        
        res.status(202).json(latestList)
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}

const createPost = async (req, res) => {
    const {username, title, body} = req.body
    try{
        if(!username || !body || !title){
            throw Error("All fields must be filled.")
        }
        if(body.length > maxBodyLength){
            throw Error("Max body length is 100 characters")
        } 
        const created = await DataModel.create({username, title, body})
        res.status(202).json(created)
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getUserPosts = async (req, res) => {
    const user = req.params.user
    try{
        const posts = await DataModel.find({username: user}).sort({ createdAt: 'desc'}).exec()

        if(posts.length === 0){
            throw Error("User has no posts, or the user does not exist")
        }
        
        res.status(202).json(posts)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const deletePost = async (req, res) => {
    const {postID} = req.body
    try{
        const findPost = await DataModel.findOne({_id: postID})
        const findUser = await User.findOne({_id: req.user._id})
        if(findPost.username !== findUser.username){
            console.log(findPost.username, findUser.username)
            throw Error("You do not own that post")
        }
        const deletePost = await DataModel.deleteOne({_id: postID})
        res.status(200).json(deletePost)

    }catch(error){
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    getLatest,
    createPost,
    getUserPosts,
    deletePost
}