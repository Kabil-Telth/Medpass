import axios from "axios"
import BASE_URL from "../BASE_URL"
import { headers_content, TOKEN_KEYS } from "../Constant"

const headersContent = () => {
  const token = localStorage.getItem(TOKEN_KEYS.access);
  return {
    headers: {
      "Content-Type": 'multipart/form-data',
      "Authorization": `Bearer ${token}`
    }
  };
};

const createCourseApi = (response: any) => {
    return axios.post(`${BASE_URL}courses/`, response, headers_content())
        .then(responseData => responseData.data)
}

const createCourseDetailsApi = (response: any) => {
    return axios.post(`${BASE_URL}course_details/`, response, headersContent())
        .then(responseData => responseData.data)
}

const getCourse = () => {
  return axios.get(`${BASE_URL}courses/`, headers_content())
        .then(responseData => responseData.data)
}

const getCourseDetail = () => {
  return axios.get(`${BASE_URL}course_details/`, headers_content())
        .then(responseData => responseData.data)
}

export {
    createCourseApi,
    createCourseDetailsApi,
    getCourse,     
    getCourseDetail
}