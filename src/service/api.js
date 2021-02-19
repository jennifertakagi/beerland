const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.punkapi.com/v2/beers',
});

module.exports = api;