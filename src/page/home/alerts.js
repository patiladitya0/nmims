import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Alerts.css'; // Importing the CSS file

const Alerts = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          apiKey: '1ee17a07805e4ab8b52f359a44e4e026',
        },
      });
      setArticles(response.data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p className="loading">Loading news...</p>;
  if (error) return <p className="error">Error fetching news: {error}</p>;

  return (
    <div className="alerts-container">
      <h2>Latest News</h2>
      <ul className="articles-list">
        {articles.map((article, index) => (
          <li key={index} className="article-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="article-image" />
              )}
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
