const express = require("express")
const { login } = require("../controller/auth")
const router = express.Router()


// login route
router.post("/login",login)

module.exports = router