import React from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import '../styles/Category.css';

// Sample news data (replace with API fetch in real app)
const newsData = [
  {
    id: 1,
    title: "Jodhpur MLA Announces New Development Projects",
    excerpt: "The local MLA has announced ₹50 crore worth of infrastructure projects for the city.",
    category: "Politics",
    date: "May 20, 2023",
    image: "/images/politics1.jpg"
  },
  {
    id: 2,
    title: "Tourism Booms in Jodhpur Post-Pandemic",
    excerpt: "Jodhpur sees a 120% increase in tourist footfall compared to last year.",
    category: "Business",
    date: "May 19, 2023",
    image: "/images/business1.jpg"
  },
  {
    id: 3,
    title: "RJCA Stadium to Host International Cricket Match",
    excerpt: "Jodhpur’s RCA Stadium selected for an India vs. Australia T20 match in November.",
    category: "Sports",
    date: "May 18, 2023",
    image: "/images/sports1.jpg"
  },
  {
    id: 4,
    title: "Local Artist Wins National Award for Rajasthani Folk Art",
    excerpt: "Jodhpur-based artist awarded for reviving traditional Phad paintings.",
    category: "Entertainment",
    date: "May 17, 2023",
    image: "/images/entertainment1.jpg"
  }
];

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL (e.g., /category/politics)
  const filteredNews = newsData.filter(news => news.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category} News</h1>
        <p>Latest updates from Jodhpur on {category}</p>
      </div>

      <div className="news-grid">
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