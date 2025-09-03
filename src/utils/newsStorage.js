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

// Add regular news (goes to latest news)
export const addLatestNews = (newsItem) => {
  const news = getNewsData();
  const websiteData = getWebsiteData();
  
  const newNews = {
    id: Date.now(),
    ...newsItem,
    type: 'latest',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  
  news.push(newNews);
  saveNewsData(news);
  
  // Add to latest news in website data
  const updatedLatest = [newNews, ...websiteData.latestNews].slice(0, 20); // Keep last 20
  saveWebsiteData({
    ...websiteData,
    latestNews: updatedLatest
  });
  
  return newNews;
};

// Add featured news (separate from latest news)
export const addFeaturedNews = (newsItem) => {
  const news = getNewsData();
  const websiteData = getWebsiteData();
  
  const newNews = {
    id: Date.now(),
    ...newsItem,
    type: 'featured',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  
  news.push(newNews);
  saveNewsData(news);
  
  // Add to featured news (limit to 3)
  const updatedFeatured = [newNews, ...websiteData.featuredNews].slice(0, 3);
  saveWebsiteData({
    ...websiteData,
    featuredNews: updatedFeatured
  });
  
  return newNews;
};

export const updateNews = (id, updatedNews) => {
  const news = getNewsData();
  const websiteData = getWebsiteData();
  
  const index = news.findIndex(item => item.id === id);
  if (index !== -1) {
    const oldType = news[index].type;
    news[index] = { ...news[index], ...updatedNews };
    
    // Update in featured/latest arrays if type changed
    if (oldType !== updatedNews.type) {
      if (oldType === 'featured') {
        websiteData.featuredNews = websiteData.featuredNews.filter(item => item.id !== id);
      } else {
        websiteData.latestNews = websiteData.latestNews.filter(item => item.id !== id);
      }
      
      if (updatedNews.type === 'featured') {
        websiteData.featuredNews = [news[index], ...websiteData.featuredNews].slice(0, 3);
      } else {
        websiteData.latestNews = [news[index], ...websiteData.latestNews].slice(0, 20);
      }
    }
    
    saveNewsData(news);
    saveWebsiteData(websiteData);
    return news[index];
  }
  return null;
};

export const deleteNews = (id) => {
  const news = getNewsData();
  const websiteData = getWebsiteData();
  
  // Remove from both featured and latest arrays
  websiteData.featuredNews = websiteData.featuredNews.filter(item => item.id !== id);
  websiteData.latestNews = websiteData.latestNews.filter(item => item.id !== id);
  
  const filteredNews = news.filter(item => item.id !== id);
  
  saveNewsData(filteredNews);
  saveWebsiteData(websiteData);
  
  return filteredNews;
};

export const getFeaturedNews = () => {
  const websiteData = getWebsiteData();
  return websiteData.featuredNews;
};

export const getLatestNews = () => {
  const websiteData = getWebsiteData();
  return websiteData.latestNews;
};

export const getNewsByCategory = (category) => {
  const news = getNewsData();
  return news.filter(item => item.category.toLowerCase() === category.toLowerCase());
};