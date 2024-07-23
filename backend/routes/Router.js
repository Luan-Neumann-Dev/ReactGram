const express = require("express")
const router = express()

//Rotas
router.use("/api/users", require("./UserRoutes"))
router.use("/api/photos", require("./PhotoRoutes"))

//Testando Rotas
router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router