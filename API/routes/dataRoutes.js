const { Router } = require('express');
const router = Router()
const { getLatest, createPost, getUserPosts, deletePost } = require("../controllers/dataController")
const {requireAuth} = require("../middleware/requireAuth")


router.get("/latest", getLatest)
router.get("/user/:user", getUserPosts)

router.use(requireAuth)
router.post("/post", createPost)
router.post("/delete", deletePost)

module.exports = router