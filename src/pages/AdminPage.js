import React, { useState, useEffect, useRef } from 'react';
import { newsStorage } from '../utils/newsStorage';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Politics',
    image: null,
    imagePreview: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Load news on component mount
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    const allNews = newsStorage.getAllNews();
    setNews(allNews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage('Image size should be less than 2MB');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        image: e.target.result, // base64 string
        imagePreview: e.target.result
      }));
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      setMessage('Error uploading image');
      setIsUploading(false);
      setTimeout(() => setMessage(''), 3000);
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt) {
      setMessage('Please fill in all required fields');
      return;
    }

    const newsData = {
      title: formData.title,
      excerpt: formData.excerpt,
      category: formData.category,
      image: formData.image
    };

    if (editingId) {
      // Update existing news
      const success = newsStorage.updateNews(editingId, newsData);
      if (success) {
        setMessage('News updated successfully!');
        setEditingId(null);
      }
    } else {
      // Add new news
      newsStorage.addNews(newsData);
      setMessage('News added successfully!');
    }

    // Reset form and reload news
    setFormData({ 
      title: '', 
      excerpt: '', 
      category: 'Politics', 
      image: null,
      imagePreview: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    loadNews();
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (newsItem) => {
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      category: newsItem.category,
      image: newsItem.image || null,
      imagePreview: newsItem.image || ''
    });
    setEditingId(newsItem.id);
    setMessage('Editing mode activated');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      newsStorage.deleteNews(id);
      setMessage('News deleted successfully!');
      loadNews();
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const cancelEdit = () => {
    setFormData({ 
      title: '', 
      excerpt: '', 
      category: 'Politics', 
      image: null,
      imagePreview: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setEditingId(null);
    setMessage('Edit cancelled');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>BlueCity News Admin Panel</h1>
        
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'info'}`}>
            {message}
          </div>
        )}

        {/* News Form */}
        <div className="admin-form">
          <h2>{editingId ? 'Edit News' : 'Add New News'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter news title"
                required
              />
            </div>

            <div className="form-group">
              <label>Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Enter news summary"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Politics">Politics</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Weather">Weather</option>
                <option value="Heritage">Heritage</option>
                <option value="Transport">Transport</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Image (optional, max 2MB)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              
              {isUploading && <div className="uploading">Uploading...</div>}
              
              {formData.imagePreview && (
                <div className="image-preview-container">
                  <div className="image-preview">
                    <img src={formData.imagePreview} alt="Preview" />
                    <button 
                      type="button" 
                      onClick={removeImage}
                      className="remove-image-btn"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="form-buttons">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : (editingId ? 'Update News' : 'Add News')}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn-secondary">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* News List */}
        <div className="news-list">
          <h2>Manage News Articles ({news.length})</h2>
          {news.length === 0 ? (
            <p className="no-news">No news articles found. Add some news to get started!</p>
          ) : (
            <div className="news-grid">
              {news.map((newsItem) => (
                <div key={newsItem.id} className="news-item">
                  <div className="news-content">
                    <h3>{newsItem.title}</h3>
                    <p className="category">{newsItem.category}</p>
                    <p className="excerpt">{newsItem.excerpt}</p>
                    <p className="date">{newsItem.date}</p>
                    {newsItem.image && (
                      <div className="image-preview-small">
                        <img src={newsItem.image} alt="News" />
                      </div>
                    )}
                  </div>
                  <div className="news-actions">
                    <button 
                      onClick={() => handleEdit(newsItem)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(newsItem.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;