import React, { useState, useEffect } from 'react';
import '../styles/MainContent.css';
import NewsCard from './NewsCard.js';
import { getNewsData, getWebsiteData } from '../utils/newsStorage';

const MainContent = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [websiteData, setWebsiteData] = useState({});

  useEffect(() => {
    const news = getNewsData();
    const website = getWebsiteData();
    
    setWebsiteData(website);
    
    if (news.length > 0) {
      setFeaturedNews([news[0]]);
      setLatestNews(news.slice(1, 5));
    }
  }, []);

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <section className="featured-news">
          <h2 className="section-title">Featured Story</h2>
          {featuredNews.length > 0 ? (
            <NewsCard {...featuredNews[0]} featured={true} />
          ) : (
            <p className="no-news">No featured news available</p>
          )}
        </section>
        
        <section className="about-jodhpur" id="jodhpur">
          <div className="about-container">
            <div className="about-text">
              <h2 className="section-title">About Jodhpur - The Blue City</h2>
              <p>{websiteData.aboutContent || 'Loading...'}</p>
            </div>
            <div className="about-image">
              <img src='https://media.istockphoto.com/id/805563154/photo/mehrangharh-fort-and-jaswant-thada-mausoleum-in-jodhpur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=5r9UxPkz9mIkfAIFPLyTwqBQyqSO7mcAdQtcqGHOboA=' alt="Jodhpur city view" />
            </div>
          </div>
        </section>
        
        <section className="latest-news">
          <h2 className="section-title">Latest News</h2>
          <div className="news-grid">
            {latestNews.length > 0 ? (
              latestNews.map(newsItem => (
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
              <p className="no-news">No latest news available</p>
            )}
          </div>
        </section>
      </div>
      
      <aside className="sidebar">
        <div className="weather-widget">
          <h3>Jodhpur Weather</h3>
          <div className="weather-info">
            <div className="weather-temp">{websiteData.weather?.temperature || '42°C'}</div>
            <div className="weather-details">
              <p>High: {websiteData.weather?.high || '45°C'} / Low: {websiteData.weather?.low || '32°C'}</p>
              <p>Humidity: {websiteData.weather?.humidity || '25%'}</p>
              <p>{websiteData.weather?.condition || 'Sunny'}</p>
            </div>
          </div>
        </div>
        
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            {websiteData.quickLinks?.map((link, index) => (
              <li key={index}>
                <a href={`#${link.text.toLowerCase().replace(' ', '-')}`}>
                  <span>{link.icon}</span> {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="city-highlight">
          <h3>City Highlight</h3>
          <img 
            src={websiteData.cityHighlight || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"} 
            alt="City highlight" 
          />
        </div>
      </aside>
    </main>
  );
};

export default MainContent;