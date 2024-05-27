import axios from '../axios'

export function getUserAPI() {
    return axios.get('/user/getUsers')
}

export function modifyUserAPI({ id, username, password, phone, email, role }) {
    return axios.post('/user/modifyUser', { id, username, password, phone, email, role })
}

export function uploadAPI() {
    return axios.post('/user/image')
}

export function addUserAPI(data = {}) {
    return axios.post('/user/addUser', data)
}

export function deleteUserAPI(id) {
    return axios.delete(`/user/deleteUser/${id}`)
}
