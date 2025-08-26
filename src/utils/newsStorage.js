// Utility functions to handle all website data in localStorage
export const getNewsData = () => {
  const news = localStorage.getItem('bluecity-news');
  return news ? JSON.parse(news) : [];
};

export const getWebsiteData = () => {
  const data = localStorage.getItem('bluecity-website');
  return data ? JSON.parse(data) : {
    logo: '',
    featuredNews: [],
    latestNews: [],
    aboutContent: `Jodhpur, the second largest city in Rajasthan, is famously known as the "Blue City" for the blue-painted houses around the Mehrangarh Fort. This historic city was founded in 1459 by Rao Jodha and served as the capital of the Marwar kingdom.`,
    weather: {
      temperature: '42°C',
      high: '45°C',
      low: '32°C',
      humidity: '25%',
      condition: 'Sunny'
    },
    quickLinks: [
      { text: 'Bus Schedule', icon: '🚌' },
      { text: 'Upcoming Events', icon: '🎪' },
      { text: 'Emergency Numbers', icon: '🚨' },
      { text: 'Tourist Information', icon: '🏰' }
    ],
    cityHighlight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  };
};

export const saveNewsData = (news) => {
  localStorage.setItem('bluecity-news', JSON.stringify(news));
};

export const saveWebsiteData = (data) => {
  localStorage.setItem('bluecity-website', JSON.stringify(data));
};

export const addNews = (newsItem) => {
  const news = getNewsData();
  const newNews = {
    id: Date.now(),
    ...newsItem,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  news.push(newNews);
  saveNewsData(news);
  return newNews;
};

export const updateNews = (id, updatedNews) => {
  const news = getNewsData();
  const index = news.findIndex(item => item.id === id);
  if (index !== -1) {
    news[index] = { ...news[index], ...updatedNews };
    saveNewsData(news);
    return news[index];
  }
  return null;
};

export const deleteNews = (id) => {
  const news = getNewsData();
  const filteredNews = news.filter(item => item.id !== id);
  saveNewsData(filteredNews);
  return filteredNews;
};

export const getNewsByCategory = (category) => {
  const news = getNewsData();
  return news.filter(item => item.category.toLowerCase() === category.toLowerCase());
};