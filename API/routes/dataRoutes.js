const { Router } = require('express');
const router = Router()
const { getLatest, createPost, getUserPosts } = require("../controllers/dataController")
const {requireAuth} = require("../middleware/requireAuth")


router.get("/latest", getLatest)
router.get("/user/:user", getUserPosts)

router.use(requireAuth)
router.post("/post", createPost)

module.exports = router