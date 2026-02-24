const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

const prepareUrl = (url) => {
  if (!url) return null;
  const baseUrl = getBaseUrl();
  return url.startsWith('http') 
    ? url 
    : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const adaptReviewToClient = (review) => {
  return {
    id: String(review.id),
    comment: review.text,
    rating: parseFloat(review.rating),
    date: review.publishDate instanceof Date
      ? review.publishDate.toISOString()
      : new Date(review.publishDate).toISOString(),
    user: {
      name: review.author?.username || 'Unknown',
      avatarUrl: prepareUrl(review.author?.avatar),
      isPro: review.author?.userType === 'pro'
    }
  };
};