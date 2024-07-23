require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express()

//Config JSON and Form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Resolvendo CORS
app.use(cors({credentials: true, origin: "http://localhost:5173"}))

//Diretório de Envio
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//DB Connection
require("./config/db.js")

//Routes 
const router = require("./routes/Router.js")

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})