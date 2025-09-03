import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  Settings,
  Newspaper,
  Trash2,
  Edit,
  Save,
  Plus,
  X,
  BarChart3,
  Users,
  Calendar,
  Globe,
  Star,
  TrendingUp
} from 'lucide-react';
import {
  getNewsData,
  getWebsiteData,
  saveWebsiteData,
  updateNews,
  deleteNews,
  getFeaturedNews,
  getLatestNews,
  addFeaturedNews,
  addLatestNews
} from '../utils/newsStorage';
import '../styles/AdminPage.css';

// Dropzone Component
const DropzoneComponent = ({ field, preview, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => onDrop(files, field),
    multiple: false
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {preview ? (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
          <div className="overlay">
            <Upload size={24} />
            <p>Click to change image</p>
          </div>
        </div>
      ) : (
        <div className="dropzone-content">
          <Upload size={32} />
          <p>Drag & drop or click to upload</p>
          <span>Supports: JPG, PNG, WebP</span>
        </div>
      )}
    </div>
  );
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [websiteData, setWebsiteData] = useState(getWebsiteData());
  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    category: 'Politics',
    image: '',
    type: 'latest' // 'latest' or 'featured'
  });
  const [uploadedImages, setUploadedImages] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allNews = getNewsData();
    setNews(allNews);
    setFeaturedNews(getFeaturedNews ? getFeaturedNews() : allNews.filter(n => n.type === 'featured'));
    setLatestNews(getLatestNews ? getLatestNews() : allNews.filter(n => n.type !== 'featured'));
    setWebsiteData(getWebsiteData());
  };

  const onDrop = useCallback((acceptedFiles, field) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        setUploadedImages(prev => ({ ...prev, [field]: dataUrl }));

        if (field === 'logo') {
          setWebsiteData(prev => ({ ...prev, logo: dataUrl }));
        } else if (field === 'cityHighlight') {
          setWebsiteData(prev => ({ ...prev, cityHighlight: dataUrl }));
        } else if (field === 'newsImage') {
          setNewsForm(prev => ({ ...prev, image: dataUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleNewsInputChange = (e) => {
    const { name, value } = e.target;
    setNewsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleWebsiteInputChange = (e) => {
    const { name, value } = e.target;
    setWebsiteData(prev => ({ ...prev, [name]: value }));
  };

  const handleWeatherChange = (e) => {
    const { name, value } = e.target;
    setWebsiteData(prev => ({
      ...prev,
      weather: { ...prev.weather, [name]: value }
    }));
  };

  const handleQuickLinkChange = (index, field, value) => {
    const updatedLinks = [...websiteData.quickLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setWebsiteData(prev => ({ ...prev, quickLinks: updatedLinks }));
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();

    if (editingNews) {
      updateNews(editingNews.id, newsForm);
      setEditingNews(null);
    } else {
      // Add news with type
      if (newsForm.type === 'featured') {
        addFeaturedNews(newsForm);
      } else {
        addLatestNews(newsForm);
      }
    }

    loadData();
    setNewsForm({
      title: '',
      excerpt: '',
      category: 'Politics',
      image: '',
      type: 'latest'
    });
    setUploadedImages(prev => ({ ...prev, newsImage: null }));
  };

  const handleWebsiteSubmit = (e) => {
    e.preventDefault();
    saveWebsiteData(websiteData);
    alert('Website settings saved successfully!');
  };

  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setNewsForm({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      category: newsItem.category,
      image: newsItem.image || '',
      type: newsItem.type || 'latest'
    });
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      deleteNews(id);
      loadData();
    }
  };

  const addQuickLink = () => {
    setWebsiteData(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { text: '', icon: '' }]
    }));
  };

  const removeQuickLink = (index) => {
    const updatedLinks = websiteData.quickLinks.filter((_, i) => i !== index);
    setWebsiteData(prev => ({ ...prev, quickLinks: updatedLinks }));
  };

  const stats = [
    { label: 'Total News', value: news.length, icon: Newspaper, color: '#4f46e5' },
    { label: 'Featured News', value: featuredNews.length, icon: Star, color: '#f59e0b' },
    { label: 'Latest News', value: latestNews.length, icon: TrendingUp, color: '#10b981' },
    { label: 'Categories', value: new Set(news.map(n => n.category)).size, icon: BarChart3, color: '#ef4444' }
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <Globe size={32} />
          <h2>BlueCity Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={20} /> Dashboard
          </button>
          <button
            className={activeTab === 'news' ? 'active' : ''}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={20} /> News Management
          </button>
          <button
            className={activeTab === 'featured' ? 'active' : ''}
            onClick={() => setActiveTab('featured')}
          >
            <Star size={20} /> Featured News
          </button>
          <button
            className={activeTab === 'latest' ? 'active' : ''}
            onClick={() => setActiveTab('latest')}
          >
            <TrendingUp size={20} /> Latest News
          </button>
          <button
            className={activeTab === 'website' ? 'active' : ''}
            onClick={() => setActiveTab('website')}
          >
            <Settings size={20} /> Website Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <button className="btn-primary" onClick={handleWebsiteSubmit}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                      <stat.icon size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{stat.value}</h3>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="recent-activity">
                <h2>Recent News</h2>
                <div className="activity-list">
                  {news.slice(0, 5).map((item) => (
                    <div key={item.id} className="activity-item">
                      <div className="activity-content">
                        <h4>{item.title}</h4>
                        <p>{item.category} • {item.date}</p>
                      </div>
                      <div className="activity-actions">
                        <button onClick={() => handleEditNews(item)} className="btn-edit">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="news-tab">
              <div className="card">
                <h2>{editingNews ? 'Edit News' : 'Create New News'}</h2>
                <form onSubmit={handleNewsSubmit} className="news-form">
                  <div className="form-group">
                    <label>News Type *</label>
                    <div className="type-selector">
                      <label className="type-option">
                        <input
                          type="radio"
                          name="type"
                          value="latest"
                          checked={newsForm.type === 'latest'}
                          onChange={handleNewsInputChange}
                        />
                        <div className="option-card">
                          <TrendingUp size={24} />
                          <span>Latest News</span>
                          <small>Appears in latest news section</small>
                        </div>
                      </label>
                      <label className="type-option">
                        <input
                          type="radio"
                          name="type"
                          value="featured"
                          checked={newsForm.type === 'featured'}
                          onChange={handleNewsInputChange}
                          disabled={featuredNews.length >= 3 && !editingNews}
                        />
                        <div className="option-card">
                          <Star size={24} />
                          <span>Featured News</span>
                          <small>Appears in featured section (Max 3)</small>
                          {featuredNews.length >= 3 && !editingNews && (
                            <div className="limit-badge">Limit Reached</div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={newsForm.title}
                        onChange={handleNewsInputChange}
                        required
                        placeholder="Enter news title"
                      />
                    </div>

                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        name="category"
                        value={newsForm.category}
                        onChange={handleNewsInputChange}
                        required
                      >
                        <option value="Politics">Politics</option>
                        <option value="Business">Business</option>
                        <option value="Sports">Sports</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Weather">Weather</option>
                        <option value="Heritage">Heritage</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label>Excerpt *</label>
                      <textarea
                        name="excerpt"
                        value={newsForm.excerpt}
                        onChange={handleNewsInputChange}
                        required
                        rows="3"
                        placeholder="Brief description of the news"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>News Image</label>
                      <DropzoneComponent
                        field="newsImage"
                        preview={newsForm.image || uploadedImages.newsImage}
                        onDrop={onDrop}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editingNews ? 'Update News' : 'Publish News'}
                    </button>
                    {editingNews && (
                      <button type="button" onClick={() => setEditingNews(null)} className="btn-secondary">
                        <X size={16} />
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="card">
                <h2>All News Articles ({news.length})</h2>
                <div className="news-list">
                  {news.map((newsItem) => (
                    <div key={newsItem.id} className={`news-item${newsItem.type === 'featured' ? ' featured' : ''}`}>
                      <div className="admin-news-image">
                        {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
                        {newsItem.type === 'featured' && <div className="featured-badge">Featured</div>}
                      </div>
                      <div className="news-content">
                        <h3>{newsItem.title}</h3>
                        <p>{newsItem.excerpt}</p>
                        <div className="news-meta">
                          <span className="category">{newsItem.category}</span>
                          <span className="date">{newsItem.date}</span>
                        </div>
                      </div>
                      <div className="news-actions">
                        <button onClick={() => handleEditNews(newsItem)} className="btn-edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteNews(newsItem.id)} className="btn-delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'featured' && (
            <div className="featured-tab">
              <div className="card">
                <h2>Featured News ({featuredNews.length}/3)</h2>
                <p className="subtitle">These articles appear in the featured section on the homepage</p>
                <div className="news-grid">
                  {featuredNews.map((newsItem) => (
                    <div key={newsItem.id} className="news-item featured">
                      <div className="news-image">
                        {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
                        <div className="featured-badge">Featured</div>
                      </div>
                      <div className="news-content">
                        <h3>{newsItem.title}</h3>
                        <p>{newsItem.excerpt}</p>
                        <div className="news-meta">
                          <span className="category">{newsItem.category}</span>
                          <span className="date">{newsItem.date}</span>
                        </div>
                      </div>
                      <div className="news-actions">
                        <button onClick={() => handleEditNews(newsItem)} className="btn-edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteNews(newsItem.id)} className="btn-delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {featuredNews.length === 0 && (
                    <p className="no-news">No featured news articles. Add some from the "News Management" tab.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'latest' && (
            <div className="latest-tab">
              <div className="card">
                <h2>Latest News ({latestNews.length})</h2>
                <p className="subtitle">These articles appear in the latest news section</p>
                <div className="news-list">
                  {latestNews.map((newsItem) => (
                    <div key={newsItem.id} className="news-item">
                      <div className="news-image">
                        {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
                      </div>
                      <div className="news-content">
                        <h3>{newsItem.title}</h3>
                        <p>{newsItem.excerpt}</p>
                        <div className="news-meta">
                          <span className="category">{newsItem.category}</span>
                          <span className="date">{newsItem.date}</span>
                        </div>
                      </div>
                      <div className="news-actions">
                        <button onClick={() => handleEditNews(newsItem)} className="btn-edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteNews(newsItem.id)} className="btn-delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {latestNews.length === 0 && (
                    <p className="no-news">No latest news articles. Add some from the "News Management" tab.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'website' && (
            <div className="website-tab">
              <div className="card">
                <h2>Logo Settings</h2>
                <DropzoneComponent
                  field="logo"
                  preview={websiteData.logo}
                  onDrop={onDrop}
                />
              </div>

              <div className="card">
                <h2>About Content</h2>
                <div className="form-group">
                  <textarea
                    name="aboutContent"
                    value={websiteData.aboutContent}
                    onChange={handleWebsiteInputChange}
                    rows="6"
                    placeholder="Write about Jodhpur city..."
                  />
                </div>
              </div>

              <div className="card">
                <h2>Weather Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Temperature</label>
                    <input
                      type="text"
                      name="temperature"
                      value={websiteData.weather.temperature}
                      onChange={handleWeatherChange}
                      placeholder="42°C"
                    />
                  </div>
                  <div className="form-group">
                    <label>High</label>
                    <input
                      type="text"
                      name="high"
                      value={websiteData.weather.high}
                      onChange={handleWeatherChange}
                      placeholder="45°C"
                    />
                  </div>
                  <div className="form-group">
                    <label>Low</label>
                    <input
                      type="text"
                      name="low"
                      value={websiteData.weather.low}
                      onChange={handleWeatherChange}
                      placeholder="32°C"
                    />
                  </div>
                  <div className="form-group">
                    <label>Humidity</label>
                    <input
                      type="text"
                      name="humidity"
                      value={websiteData.weather.humidity}
                      onChange={handleWeatherChange}
                      placeholder="25%"
                    />
                  </div>
                  <div className="form-group">
                    <label>Condition</label>
                    <input
                      type="text"
                      name="condition"
                      value={websiteData.weather.condition}
                      onChange={handleWeatherChange}
                      placeholder="Sunny"
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2>Quick Links</h2>
                {websiteData.quickLinks.map((link, index) => (
                  <div key={index} className="quick-link-item">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Icon</label>
                        <input
                          type="text"
                          value={link.icon}
                          onChange={(e) => handleQuickLinkChange(index, 'icon', e.target.value)}
                          placeholder="🚌"
                        />
                      </div>
                      <div className="form-group">
                        <label>Text</label>
                        <input
                          type="text"
                          value={link.text}
                          onChange={(e) => handleQuickLinkChange(index, 'text', e.target.value)}
                          placeholder="Bus Schedule"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuickLink(index)}
                      className="btn-delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addQuickLink} className="btn-secondary">
                  <Plus size={16} />
                  Add Quick Link
                </button>
              </div>

              <div className="card">
                <h2>City Highlight</h2>
                <DropzoneComponent
                  field="cityHighlight"
                  preview={websiteData.cityHighlight}
                  onDrop={onDrop}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;