const cityCoordinates = {
   Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
   Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
   Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
   Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
   Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
   Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

const getBaseUrl = () => {
   const host = process.env.HOST || 'http://localhost';
   const port = process.env.PORT || 5000;
   const cleanHost = host.replace(/\/$/, '');
   return `${cleanHost}:${port}`;
};

const toAbsoluteUrl = (path) => {
   if (!path) return '';
   if (path.startsWith('http')) return path;
   const cleanPath = path.replace(/^.*?(\/static\/)/, '/static/');
   const baseUrl = getBaseUrl();
   return `${baseUrl}${cleanPath}`;
};

export const adaptOfferToClient = (offer) => {
   const cityLocation = cityCoordinates[offer.city] || { 
       latitude: offer.latitude || 0, 
       longitude: offer.longitude || 0, 
       zoom: 13 
   };
   
   // Get author data if it exists
   let author = null;
   if (offer.author) {
       author = {
           name: offer.author.username || 'Host',
           avatarUrl: offer.author.avatar ? toAbsoluteUrl(offer.author.avatar) : null,
           isPro: offer.author.userType === 'pro'
       };
   }
   
   return {
     id: String(offer.id),
     title: offer.title,
     type: offer.type,
     price: offer.price,
     city: {
       name: offer.city,
       location: cityLocation
     },
     location: {
       latitude: offer.latitude || 0,
       longitude: offer.longitude || 0
     },
     isFavorite: offer.isFavorite || false,
     isPremium: offer.isPremium || false,
     rating: parseFloat(offer.rating) || 0,
     previewImage: toAbsoluteUrl(offer.previewImage),
     description: offer.description || '',
     rooms: offer.rooms || 1,
     guests: offer.guests || 2,
     features: offer.features || [],
     author: author,
     photos: (offer.photos || []).map(toAbsoluteUrl)
   };
};

export const adaptFullOfferToClient = (offer) => {
   return adaptOfferToClient(offer);
};