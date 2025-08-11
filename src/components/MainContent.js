import React from 'react';
import '../styles/MainContent.css';
import NewsCard from './NewsCard.js';

const MainContent = () => {
  const mainNews = {
    title: "Mehrangarh Fort to Get New Lighting System",
    excerpt: "The historic Mehrangarh Fort will soon be illuminated with a new energy-efficient lighting system as part of the city's heritage conservation efforts. The ₹5 crore project will highlight the fort's architecture while reducing light pollution.",
    category: "Heritage",
    date: "May 15, 2023",
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  };

  const newsItems = [
    {
      title: "Jodhpur Records Highest Temperature of the Season",
      excerpt: "The mercury soared to 45°C yesterday, breaking previous records for this time of the year. The meteorological department has issued a heatwave alert for the next three days.",
      category: "Weather",
      date: "May 14, 2023",
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: "New Flight Routes from Jodhpur Airport Announced",
      excerpt: "Three new domestic routes will be operational starting next month, connecting Jodhpur to Bangalore, Hyderabad, and Ahmedabad directly.",
      category: "Transport",
      date: "May 13, 2023",
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: "Blue City Cultural Festival Begins Next Week",
      excerpt: "The annual celebration of Jodhpur's arts and culture will feature performances from local and international artists across 10 venues in the city.",
      category: "Entertainment",
      date: "May 12, 2023",
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: "Local Startup Wins National Innovation Award",
      excerpt: "A Jodhpur-based tech startup has been recognized for its innovative water conservation solution that helps farmers reduce water usage by up to 40%.",
      category: "Business",
      date: "May 11, 2023",
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <section className="featured-news">
          <h2 className="section-title">Featured Story</h2>
          <NewsCard {...mainNews} featured={true} />
        </section>
        
        <section className="about-jodhpur" id="jodhpur">
          <div className="about-container">
            <div className="about-text">
              <h2 className="section-title">About Jodhpur - The Blue City</h2>
              <p>
                Jodhpur, the second largest city in Rajasthan, is famously known as the "Blue City" 
                for the blue-painted houses around the Mehrangarh Fort. This historic city was founded 
                in 1459 by Rao Jodha and served as the capital of the Marwar kingdom.
              </p>
              <p>
                The city is renowned for its magnificent forts, palaces, temples, and vibrant culture. 
                Key attractions include Mehrangarh Fort, Umaid Bhawan Palace, Jaswant Thada, and the 
                bustling Sardar Market.
              </p>
              <p>
                Jodhpur's economy thrives on tourism, handicrafts, and agriculture. The city is also 
                famous for its spicy cuisine, particularly the Mawa Kachori and Mirchi Bada.
              </p>
            </div>
            <div className="about-image">
              <img src='https://media.istockphoto.com/id/805563154/photo/mehrangharh-fort-and-jaswant-thada-mausoleum-in-jodhpur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=5r9UxPkz9mIkfAIFPLyTwqBQyqSO7mcAdQtcqGHOboA=' alt="Jodhpur city view" />
            </div>
          </div>
        </section>
        
        <section className="latest-news">
          <h2 className="section-title">Latest News</h2>
          <div className="news-grid">
            {newsItems.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </section>
      </div>
      
      <aside className="sidebar">
        <div className="weather-widget">
          <h3>Jodhpur Weather</h3>
          <div className="weather-info">
            <div className="weather-temp">42°C</div>
            <div className="weather-details">
              <p>High: 45°C / Low: 32°C</p>
              <p>Humidity: 25%</p>
              <p>Sunny</p>
            </div>
          </div>
        </div>
        
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#bus-schedule"><span>🚌</span> Bus Schedule</a></li>
            <li><a href="#events"><span>🎪</span> Upcoming Events</a></li>
            <li><a href="#emergency"><span>🚨</span> Emergency Numbers</a></li>
            <li><a href="#tourist-info"><span>🏰</span> Tourist Information</a></li>
          </ul>
        </div>

        {/* Random City Highlight Image */}
        <div className="city-highlight">
          <h3>City Highlight</h3>
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
            alt="Random city view" 
            style={{ width: '100%', borderRadius: '8px', marginTop: '8px' }}
          />
        </div>
      </aside>
    </main>
  );
};

export default MainContent;