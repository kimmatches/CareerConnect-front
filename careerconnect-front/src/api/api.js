import axios from 'axios';

export const userApi = {
    registerUser: (registerData) => {
        return axios.post('http://localhost:8080/open-api/user/register', registerData);  
    },
    loginUser: (loginData) => {
        return axios.post('http://localhost:8080/open-api/user/login', loginData);
    },
    getUserList: (username) => {
        return axios.get(`/open-api/user/list/${username}`);
    },
    getApiKey: () => {
        return axios.get('http://localhost:8080/open-api/gpt/api-key');
    },
    sendMessageToGPT: (apiKey, message) => {
        return axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    }
};
