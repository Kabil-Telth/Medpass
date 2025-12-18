import axios from "axios"
import BASE_URL from "../BASE_URL"
import {  headers_content } from "../Constant"

const stdApi = () => {
    return axios.get(`${BASE_URL}students/`, headers_content())
        .then(res => res.data)
}

export {
    stdApi
}