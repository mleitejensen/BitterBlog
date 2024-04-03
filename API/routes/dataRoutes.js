const { Router } = require('express');
const router = Router()
const { getLatest, createPost, getUserPosts } = require("../controllers/dataController")

router.get("/data", getLatest)
router.post("/post", createPost)
router.get("/user/:user", getUserPosts)

module.exports = router