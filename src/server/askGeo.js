const axios = require('axios');
require('dotenv').config();

const askGeo = (lat, lng) => {
  const search = `https://api.askgeo.com/v1/${process.env.ask_geo_id}/${process.env.ask_geo_key}/query.json?databases=UsZcta2010%2CUsTract2010&points=${lat}%2c${lng}`;
  return axios.get(search)
    .then(geo => geo.data.data[0]);
};

module.exports = askGeo;
