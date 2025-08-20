// Utility functions to handle news data in localStorage
export const newsStorage = {
  // Get all news
  getAllNews: () => {
    const news = localStorage.getItem('bluecity-news');
    return news ? JSON.parse(news) : [];
  },

  // Add new news article
  addNews: (newsItem) => {
    const news = newsStorage.getAllNews();
    const newNews = {
      id: Date.now(), // Unique ID using timestamp
      ...newsItem,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    news.push(newNews);
    localStorage.setItem('bluecity-news', JSON.stringify(news));
    return newNews;
  },

  // Update news article
  updateNews: (id, updatedNews) => {
    const news = newsStorage.getAllNews();
    const index = news.findIndex(item => item.id === id);
    if (index !== -1) {
      news[index] = { ...news[index], ...updatedNews };
      localStorage.setItem('bluecity-news', JSON.stringify(news));
      return true;
    }
    return false;
  },

  // Delete news article
  deleteNews: (id) => {
    const news = newsStorage.getAllNews();
    const filteredNews = news.filter(item => item.id !== id);
    localStorage.setItem('bluecity-news', JSON.stringify(filteredNews));
    return true;
  },

  // Get news by category
  getNewsByCategory: (category) => {
    const news = newsStorage.getAllNews();
    return news.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Get featured news (for homepage)
  getFeaturedNews: () => {
    const news = newsStorage.getAllNews();
    return news.slice(0, 4); // First 4 articles as featured
  }
};