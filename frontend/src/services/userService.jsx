import {api, requestConfig} from '../utils/config'

//PEGANDO DETALHES USUARIOS
const profile = async(data, token) => {
    const config = requestConfig("GET", data, token)

    try {
        
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err)
        
        return res;

    } catch (error) {
        console.log(error)
    }
};

//ATUALIZANDO USUARIOS
const updateProfile = async(data, token) => {
    const config = requestConfig("PUT", data, token, true)

    try {   

        const res = await fetch(api + "/users/", config)
            .then((res) => res.json())
            .catch((err) => err)
            
            console.log(res)
        return res;

        
    } catch (error) {
        console.log(error)
    }
}

//PEGANDO USUARIO PELO ID
const getUserDetails = async(id) => {
    const config = requestConfig("GET")

    try {
        const res = await fetch(api + '/users/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails
}

export default userService;