import axios from 'axios'

const API_KEY = "AIzaSyCQ85NysIlfqGprzkgcmtoDpqx2TMbPU9g";

const instance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
        key: API_KEY
    }
});

export default instance;