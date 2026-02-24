import { OffersList } from '../types/offer';

export const offersList: OffersList[] = [
  {
    id: '1',
    title: 'Luxurious apartment in historic district',
    type: 'apartment',
    price: 140,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,  
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '2',
    title: 'Cozy studio with city view',
    type: 'room',
    price: 75,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,  
    isPremium: false,
    rating: 4.3,
    previewImage: '/img/room.jpg'
  },
  {
    id: '3',
    title: 'Modern loft in city center',
    type: 'apartment',
    price: 145,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/apartment-03.jpg'
  },
  {
    id: '4',
    title: 'Charming house with garden',
    type: 'house',
    price: 195,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.1,
    previewImage: '/img/apartment-02.jpg'
  },

  {
    id: '5',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 16
    },
    isFavorite: true,  
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '6',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 90,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.860611,
        longitude: 2.352221,
        zoom: 13
      }
    },
    location: {
      latitude: 48.860611,
      longitude: 2.352221,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: false,
    rating: 4.2,
    previewImage: '/img/room.jpg'
  },
  {
    id: '7',
    title: 'Stylish house in city center',
    type: 'house',
    price: 180,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.862,
        longitude: 2.355,
        zoom: 13
      }
    },
    location: {
      latitude: 48.862,
      longitude: 2.355,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/apartment-03.jpg'
  },

 
  {
    id: '8',
    title: 'Modern apartment in Cologne center',
    type: 'apartment',
    price: 110,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13
      }
    },
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '9',
    title: 'Cozy room near cathedral',
    type: 'room',
    price: 65,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.941,
        longitude: 6.958,
        zoom: 13
      }
    },
    location: {
      latitude: 50.941,
      longitude: 6.958,
      zoom: 16
    },
    isFavorite: true,  
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/room.jpg'
  },
  {
    id: '10',
    title: 'Spacious loft with river view',
    type: 'apartment',
    price: 135,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.934,
        longitude: 6.965,
        zoom: 13
      }
    },
    location: {
      latitude: 50.934,
      longitude: 6.965,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: false,
    rating: 4.4,
    previewImage: '/img/apartment-02.jpg'
  },

  {
    id: '11',
    title: 'Charming house in Brussels',
    type: 'house',
    price: 95,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13
      }
    },
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/apartment-02.jpg'
  },
  {
    id: '12',
    title: 'Modern studio near Grand Place',
    type: 'room',
    price: 70,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.847,
        longitude: 4.352,
        zoom: 13
      }
    },
    location: {
      latitude: 50.847,
      longitude: 4.352,
      zoom: 16
    },
    isFavorite: true,  
    isPremium: true,
    rating: 4.6,
    previewImage: '/img/room.jpg'
  },
  {
    id: '13',
    title: 'Luxury apartment with balcony',
    type: 'apartment',
    price: 125,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.854,
        longitude: 4.349,
        zoom: 13
      }
    },
    location: {
      latitude: 50.854,
      longitude: 4.349,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-03.jpg'
  },

  {
    id: '14',
    title: 'Spacious apartment in Hamburg',
    type: 'apartment',
    price: 130,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13
      }
    },
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 16
    },
    isFavorite: true, 
    isPremium: true,
    rating: 4.6,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '15',
    title: 'Cozy room near port',
    type: 'room',
    price: 60,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.548,
        longitude: 9.987,
        zoom: 13
      }
    },
    location: {
      latitude: 53.548,
      longitude: 9.987,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/room.jpg'
  },
  {
    id: '16',
    title: 'Modern loft with city view',
    type: 'apartment',
    price: 155,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.556,
        longitude: 10.001,
        zoom: 13
      }
    },
    location: {
      latitude: 53.556,
      longitude: 10.001,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/apartment-03.jpg'
  },

  {
    id: '17',
    title: 'Cozy room in Dusseldorf',
    type: 'room',
    price: 65,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13
      }
    },
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/room.jpg'
  },
  {
    id: '18',
    title: 'Modern apartment in Media Harbor',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.213,
        longitude: 6.774,
        zoom: 13
      }
    },
    location: {
      latitude: 51.213,
      longitude: 6.774,
      zoom: 16
    },
    isFavorite: false, 
    isPremium: true,
    rating: 4.5,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '19',
    title: 'Stylish loft near Old Town',
    type: 'apartment',
    price: 140,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225,
        longitude: 6.775,
        zoom: 13
      }
    },
    location: {
      latitude: 51.225,
      longitude: 6.775,
      zoom: 16
    },
    isFavorite: true,  
    isPremium: false,
    rating: 4.3,
    previewImage: '/img/apartment-02.jpg'
  }
];