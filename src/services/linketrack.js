const axios = require("axios");


const api = axios.create({
    baseURL: process.env.LINKETRACK_API_URL,
    params: {
        user: process.env.LINKETRACK_API_USER,
        token: process.env.LINKETRACK_API_TOKEN,
    }
});

module.exports = api;