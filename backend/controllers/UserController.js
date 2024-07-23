const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

//Geração do token do usuário
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {expiresIn: "1d"});
};

// Registrar usuário
const register = async(req, res) => {
    const {name, email, password} = req.body

    //Checando se o usuário já existe
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors: ["Por Favor, utilize outro e-mail"]})
        return
    }

    //Gerando hash da senha
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //Criando usuario
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    //Checagem de criacao do usuário com sucesso, retornar token
    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]});
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

// Login do usuário
const login = async(req, res)=> {    
    const {email, password} = req.body

    const user = await User.findOne({email})

    //Checando se usuário existe
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }

    //Checando se as senhas combinam
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["Senha inválida."]})
        return
    }

    //Retornando usuário com token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    })
}

//Pegando usuario logado
const getCurrentUser = async(req, res) => {
    const user = req.user

    res.status(200).json(user)
}

//Atualizando usuário
const update = async(req,res) => {
    const {name, password, bio} = req.body
    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(reqUser._id).select("-passowrd")

    if(name) {
        user.name = name
    }
    if(password) {
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }
    if(profileImage) {
        user.profileImage = profileImage
    }
    if(bio){
        user.bio = bio
    }

    await user.save()

    res.status(200).json(user)
}

//Pegando usuario pelo id
const getUserById = async(req,res) => {
    const {id} = req.params

    try {
        const user = await User.findById(id).select("-password")

        //Checando se usuario existe
        if(!user) {
            res.status(404).json({errors: ["Usuário não encontrado!"]})
            return
        }
        res.status(200).json(user) 
           
    } catch (error) {
        res.status(422).json({errors: ["Usuário não encontrado!"]})
        return
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}
