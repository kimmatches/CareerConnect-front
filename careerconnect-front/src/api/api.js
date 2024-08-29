import axios from 'axios';

export const userApi = {
    registerUser: (registerData) => {
        return axios.post('http://localhost:8080/open-api/user/register', registerData);  
    },
    loginUser: (loginData) => {
        return axios.post('http://localhost:8080/open-api/user/login', loginData);
    },
};
