const axios = require('axios');
const http = require('http');
const https = require('https');
const { successResponse, errorResponse } = require('../utils/responseConsistency');

// Create HTTP/HTTPS agent with Keep-Alive
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

// Axios instances with Keep-Alive agents
const translateAPI = axios.create({
    baseURL: process.env.TRANSLATE_URL,
    httpAgent,
    httpsAgent,
});

const posAPI = axios.create({
    baseURL: process.env.POS_URL,
    httpAgent,
    httpsAgent,
});

const getTranslate = async (req, res) => {
    const { text } = req.body;
    console.log(text);

    try {
        // Send POST request to translation API
        const translate = await translateAPI.post('/translate', { text });
        const translated = translate.data.translation;

        // Send POST request to POS API
        const pos = await posAPI.post('/predict', { text: translated });

        const response = {
            translate: translated,
            pos: pos.data,
        };

        // Send success response
        successResponse(res, response, 'Word fetched successfully');
    } catch (error) {
        // Handle and log error
        errorResponse(res, error, 'Error fetching word', 500);
    }
};

module.exports = { getTranslate };
