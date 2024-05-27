import axios from '../axios'

export function getRouteAPI() {
    return axios.get('/route/getRoutes')
}

export function modifyRouteAPI({ id, name, location, spotsCity, detailDesc, description }) {
    return axios.post('/route/modifyRoutes', { id, name, location, spotsCity, detailDesc, description })
}

export function uploadAPI() {
    return axios.post('/route/image')
}

export function addRouteAPI(data = {}) {
    return axios.post('/route/addRoutes', data)
}

export function deleteRouteAPI(id) {
    return axios.delete(`/route/deleteRoutes/${id}`)
}

