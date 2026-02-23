import { Review } from '../types/review'

export const reviews: Review[] = [
  {
    id: '463623e8-eecc-42a2-b2fc-797a299b5230',
    comment: 'The room was spacious and clean. The pool looked nothing like the photos.',
    date: '2023-06-29T21:00:00.465Z',
    rating: 4,
    user: {
      name: 'Isaac',
      avatarUrl: 'img/avatar-angelina.jpg', 
      isPro: true,
    },
  },
  {
    id: '563623e8-eecc-42a2-b2fc-797a299b5231',
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2023-05-15T14:30:00.465Z',
    rating: 5,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg', 
      isPro: false,
    },
  },
];