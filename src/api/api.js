import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://0.0.0.0/api'
})

export default Api