import axios from '../axios'

export function login(username,password){
    return axios.post('/user/login',{
        username,
        password
    })
}

export function register(username,password,email,phone){
    return axios.post('/user/register',{
        username,
        password,
        email,
        phone
    })
}