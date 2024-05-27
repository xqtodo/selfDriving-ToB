import axios from '../axios'

export function getCarAPI() {
    return axios.get('/car/getCars')
}

export function modifyCarAPI({ id, vehicleBrand, vehicleModel, price, oldPrice, description }) {
    return axios.post('/car/modifyRoutes', { id, vehicleBrand, vehicleModel, price, oldPrice, description })
}

export function uploadAPI() {
    return axios.post('/car/image')
}

export function addCarAPI(data = {}) {
    return axios.post('/car/addCars', data)
}

export function deleteCarAPI(id) {
    return axios.delete(`/car/deleteCars/${id}`)
}