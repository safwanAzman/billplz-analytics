import axios from 'axios';

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCKUP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
        return Promise.reject(error.response);
    }
    }
);

export default request;