const DataModel = require("../models/dataModel")

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
    try{
        const {username, body} = req.body
        if(body.length > maxBodyLength){
            throw Error("Max body length is 100 characters")
        } 
        const created = await DataModel.create({username, body})
        res.status(202).json(created)
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getUserPosts = async (req, res) => {
    try{
        const user = req.params.user
        const posts = await DataModel.find({username: user}).sort({ createdAt: 'desc'}).exec()

        if(posts.length === 0){
            throw Error("User has no posts, or the user does not exist")
        }
        
        res.status(202).json(posts)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getLatest,
    createPost,
    getUserPosts,
}