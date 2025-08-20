import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { newsStorage } from '../utils/newsStorage';
import '../styles/Category.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const categoryNews = newsStorage.getNewsByCategory(category);
    setNews(categoryNews);
  }, [category]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category} News</h1>
        <p>Latest updates from Jodhpur on {category}</p>
      </div>

      <div className="news-grid">
        {news.length > 0 ? (
          news.map(newsItem => (
            <NewsCard
              key={newsItem.id}
              title={newsItem.title}
              excerpt={newsItem.excerpt}
              category={newsItem.category}
              date={newsItem.date}
              image={newsItem.image}
            />
          ))
        ) : (
          <p className="no-news">No news articles found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;