import { apiKey } from './constants';

const Yelp = {
  async search(term, location, sortBy) {
    const response = await fetch(
      `https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const jsonResponse = await response.json();
    // Checking if the response has a businesses key, which is a valid response
    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map((business) => {
        return {
          id: business.id,
          imageSrc: business.image_url,
          site: business.url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
        };
      });
    }
  },

  async getCoordinates(location) {
    const response = await fetch(
      `https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse.businesses.map((business) => {
      if (jsonResponse.businesses) {
        return {
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude,
        };
      }
    });
  },

  // Autocomplete keyword or business name
  async autocomplete(text, location) {
    const response = await fetch(
      `https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${text}&latitude=${
        this.getCoordinates(location).latitude
      }&longitude=${this.getCoordinates(location).longitude}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  },
};

export default Yelp;
