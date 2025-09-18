import React, { useState } from 'react';
import '../styles/NewsCard.css';

const NewsCard = ({ title, excerpt, category, date, featured = false, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={`news-card ${featured ? 'featured' : ''}`}>
      <div className="news-image-container">
        <img src={image} alt={title} className="news-image" />
        {category && <span className="news-category">{category}</span>}
      </div>
      <div className="news-card-content">
        <h3>{title}</h3>
        <p className={`news-excerpt ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {excerpt}
        </p>
        <div className="news-footer">
          <p className="news-date">{date}</p>
          <button className="read-more" onClick={toggleExpand}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;