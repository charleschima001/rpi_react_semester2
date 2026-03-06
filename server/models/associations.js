import { User } from './user.js';
import { Offer } from './offer.js';
import { Review } from './review.js';

console.log('🔄 Setting up associations...');

User.hasMany(Offer, { 
    as: 'offers', 
    foreignKey: 'authorId' 
});

Offer.belongsTo(User, { 
    as: 'author', 
    foreignKey: 'authorId' 
});

User.hasMany(Review, { 
    as: 'reviews', 
    foreignKey: 'authorId' 
});

Review.belongsTo(User, { 
    as: 'author', 
    foreignKey: 'authorId' 
});

Offer.hasMany(Review, { 
    as: 'reviews', 
    foreignKey: 'offerId' 
});

Review.belongsTo(Offer, { 
    foreignKey: 'offerId' 
});

console.log(' Associations set up successfully!');