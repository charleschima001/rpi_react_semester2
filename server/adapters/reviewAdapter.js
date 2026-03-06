const getBaseUrl = () => {
   const host = process.env.HOST || 'http://localhost';
   const port = process.env.PORT || 5000;
   return `${host}:${port}`;
};

const prepareUrl = (url) => {
   if (!url) return '';
   if (url.startsWith('http')) return url;
   const baseUrl = getBaseUrl();
   return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const adaptReviewToClient = (review) => {
  const baseUrl = getBaseUrl();
  
  const prepareUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return {
    id: String(review.id),
    comment: review.text,
    rating: parseFloat(review.rating),
    date: review.publishDate instanceof Date
      ? review.publishDate.toISOString()
      : new Date(review.publishDate).toISOString(),
    user: {
      name: review.author?.username || 'Unknown',
      avatarUrl: prepareUrl(review.author?.avatar || ''),
      isPro: review.author?.userType === 'pro'
    }
  };
};