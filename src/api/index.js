import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5441' : 'https://web7686.cweb03.gamingweb.de';
console.log(API_BASE_URL, process.env.NODE_ENV);
export function login(name) {
    return axios
        .post(API_BASE_URL + '/login', {
            name,
        })
        .then((res) => {
            if (!res.data.success) console.log('Login error:', res.data);
            console.log('Logged in:', res.data);
            return res.data;
        });
}

export function register() {
    return axios.post(API_BASE_URL + '/register').then((res) => {
        if (!res.data.success) console.log('Registration error:', res.data);
        console.log('Registered:', res.data);
        return res.data;
    });
}

export function getAllMessages(userId) {
    return axios.get(`${API_BASE_URL}/messages/all?userId=${userId}`).then((res) => {
        if (!res.data.success) console.log('Message error:', res.data);
        console.log(res.data, 'MESSAGE DATA');
        return res.data;
    });
}

export function createMessage(userId, content) {
    return axios
        .post(API_BASE_URL + '/messages/create', {
            userId,
            content,
        })
        .then((res) => {
            if (!res.data.success) console.log('Message error:', res.data);
            console.log(res.data, 'MESSAGE DATA');
            return res.data;
        });
}
