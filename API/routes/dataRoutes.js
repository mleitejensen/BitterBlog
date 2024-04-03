const { Router } = require('express');
const router = Router()
const { getLatest } = require("../controllers/dataController")

router.get("/data", getLatest)

module.exports = router