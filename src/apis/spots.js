import axios from '../axios'

export function getSpotsAPI() {
    return axios.get('/admin/getSpots')
}

export function modifySpotAPI({ id, name, location, price, oldPrice, description }){
    return axios.post('/admin/modifySpot', { id, name, location, price, oldPrice, description })
}

export function uploadAPI(){
    return axios.post('/upload/image')
}

export function addSpotAPI(data = {}){
    return axios.post('/admin/addSpot', data)
}

export function deleteSpotAPI(id){
    return axios.delete(`/admin/deleteSpot/${id}`)
}

