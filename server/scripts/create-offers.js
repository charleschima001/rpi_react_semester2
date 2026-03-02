import { Offer } from '../models/offer.js';
import { User } from '../models/user.js';
import sequelize from '../config/database.js';

const createCompleteOffers = async () => {
  try {

    const user = await User.findOne();
    
    if (!user) {
      console.log('No user found. Please create a user first.');
      return;
    }

    console.log(` Using user: ${user.username} (ID: ${user.id})`);

    const offers = [
      {
        title: 'Luxury Loft in Le Marais',
        description: 'A beautiful luxury loft in the heart of Le Marais district. Perfect for couples looking to experience Parisian life. Close to shops, cafes, and museums.',
        city: 'Paris',
        previewImage: '/static/dd089905-9cbe-49a2-9b36-ec14b6cf702c.jpg',
        photos: [
          '/static/dd089905-9cbe-49a2-9b36-ec14b6cf702c.jpg',
          '/static/84f0e449-eac0-42ff-a987-dce827663131.jpg',
          '/static/99039ea8-0f0e-4128-b971-5a6b65eaa48e.jpg'
        ],
        isPremium: true,
        isFavorite: false,
        rating: 4.8,
        type: 'apartment',
        rooms: 2,
        guests: 4,
        price: 200,
        features: ['WiFi', 'Kitchen', 'Washer', 'Air conditioning', 'Laptop friendly workspace'],
        commentsCount: 0,
        latitude: 48.8566,
        longitude: 2.3522,
        authorId: user.id
      },
      {
        title: 'Modern Apartment with Seine View',
        description: 'Stunning modern apartment overlooking the Seine River. Floor-to-ceiling windows with breathtaking views.',
        city: 'Paris',
        previewImage: '/static/84f0e449-eac0-42ff-a987-dce827663131.jpg',
        photos: [
          '/static/84f0e449-eac0-42ff-a987-dce827663131.jpg',
          '/static/dd089905-9cbe-49a2-9b36-ec14b6cf702c.jpg'
        ],
        isPremium: true,
        isFavorite: false,
        rating: 4.9,
        type: 'apartment',
        rooms: 3,
        guests: 6,
        price: 400,
        features: ['WiFi', 'Kitchen', 'Washer', 'TV', 'Elevator'],
        commentsCount: 0,
        latitude: 48.8566,
        longitude: 2.3522,
        authorId: user.id
      }
    ];

    console.log(`🚀 Creating ${offers.length} complete offers...`);

    for (const offerData of offers) {
      const offer = await Offer.create(offerData);
      console.log(`Created: ${offer.title} (ID: ${offer.id})`);
    }

    console.log(' All offers created successfully!');
  } catch (error) {
    console.error(' Error creating offers:', error);
  } finally {
    await sequelize.close();
  }
};

createCompleteOffers();