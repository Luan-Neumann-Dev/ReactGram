const multer = require('multer')
const path = require('path')

//Local de armazenamento imagem
const imageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder="users"
        } else if(req.baseUrl.includes("photos")){
            folder="photos"
        }

        cb(null, `uploads/${folder}/`)
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
        
    }
})

//Validação imagem e destino
const imageUpload = multer({
    storage: imageStore,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //Upando apenas png e jpg 
            return cb(new Error("Por favor, envie apenas imagens com png e jpg!"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload};