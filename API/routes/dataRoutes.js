const { Router } = require('express');
const router = Router()
const { getLatest, createPost } = require("../controllers/dataController")

router.get("/data", getLatest)
router.post("/post", createPost)

module.exports = router