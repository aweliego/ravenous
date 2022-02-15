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

  // Autocomplete category or keyword
  async autocomplete(text) {
    const response = await fetch(
      `https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${text}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const jsonResponse = await response.json();

    if (text == '') {
      return; // to avoid TypeError, but will still throw Bad request when user deletes input
    }
    if (text.length >= 3) {
      const suggestions = [...jsonResponse.categories, ...jsonResponse.terms];
      // console.log(suggestions);
      // console.log(suggestions.map((el) => el.title || el.text));
      return suggestions.map((el) => el.title || el.text);
    }
  },
};

export default Yelp;
