const https = require('https');

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', data => resolve(JSON.parse(data)));
        response.on('error', reject);
      });
    });
  }

  async getStarShips(url) {
    const result = await this.makeRequest(url);

    return {
      name: result.name,
      model: result.model,
      manufacturer: result.manufacturer,
      passengers: result.passengers,
      hyperdriveRating: result.hyperdrive_rating,
      starshipClass: result.starship_class
    };
  }
}

// Testing the api response.

// ; (async () => {
//   const response = await new Service().getStarShips('https://swapi.dev/api/starships/9');

//   console.log(JSON.stringify(response));
// })();

module.exports = Service;
