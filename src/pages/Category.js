import React from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { getNewsByCategory } from '../utils/newsStorage';
import '../styles/Category.css';

const CategoryPage = () => {
  const { category } = useParams();
  const filteredNews = getNewsByCategory(category);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category} News</h1>
        <p>Latest updates from Jodhpur on {category}</p>
      </div>

      <div className="category-news-grid">
        {filteredNews.length > 0 ? (
          filteredNews.map(news => (
            <NewsCard 
              key={news.id}
              title={news.title}
              excerpt={news.excerpt}
              category={news.category}
              date={news.date}
              image={news.image}
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