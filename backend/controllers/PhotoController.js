const Photo = require('../models/Photo')
const User = require('../models/User')
const mongoose = require("mongoose")

//Inserção de imagem, com usuário relacionado
const insertPhoto = async(req,res) => {
    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    //Criando Photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    //Criada com sucesso?
    if(!newPhoto){
        res.status(422).json({errors: ["Houve um problema, por favor tente novamente mais tarde!"]})
        return
    }

    res.status(201).json(newPhoto)
};

//Removendo foto
const deletePhoto = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(id)

        //Checando se a foto existe
        if(!photo){
            res.status(404).json({erros: ["Foto não encontrada!"]})
            return;
        }
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({id: photo._id, message: "Foto excluída com sucesso."});
    } catch (error) {
        res.status(404).json({errors: ["Foto não encontrada!"]});
        return
    }
}

//Pegando todas fotos
const getAllPhotos = async(req,res) => {

    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()
    return res.status(200).json(photos)
}

//Foto usuário
const getUserPhotos = async(req, res) => {
    const {id} = req.params
    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()
    res.status(200).json(photos);
}

//Pegando foto pelo id
const getPhotoById = async(req, res) => {
    const {id} = req.params

    const photo = await Photo.findById(id)

    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    res.status(200).json(photo)
}

//Atualizando foto
const updatePhoto = async(req, res) => {
    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //Checando existência da foto
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada!"]})
        return
    }
    //Checando pertence ao usuário
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde!"]})
        return
    }

    if(title){
        photo.title = title
    }

    await photo.save()
    res.status(200).json({photo, message: "Foto atualizada com sucesso!"})

}

//Função like
const likePhoto = async(req,res) => {
    const {id} = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //Checando existência da foto
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada!"]})
        return
    }

    //Checando se o usuário ja deu like
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors: ["Você já curtiu a foto."]})
    }

    //Colocando usuer id em um array de likes
    photo.likes.push(reqUser._id)
    photo.save()
    res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida."})

}

//Comentário na foto
const commentPhoto = async(req, res) => {
    const {id} = req.params
    const {comment} = req.body
    const reqUser = req.user

    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]})
    }

    //Colocando comentario no array
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    };
    photo.comments.push(userComment)
    await photo.save()

    res.status(200).json({
        comment:userComment,
        message: "O comentário foi adicionado com sucesso!"
    })
}

//Procurando fotos pelo titulo
const searchPhotos = async(req, res) => {
    const {q} = req.query
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

    res.status(200).json(photos);
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}