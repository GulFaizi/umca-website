import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { fetchNews } from '../services/api';
import './News.scss';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await fetchNews();
                setNews(data);
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    if (loading) {
        return (
            <div className="container news-loading">
                <p>Loading News...</p>
            </div>
        );
    }

    return (
        <div className="container news-page">
            <h1 className="text-center mb-lg">Latest News & Activities</h1>
            <div className="news-grid">
                {news.map(item => (
                    <Card
                        key={item.id}
                        title={item.title}
                        description={item.summary}
                        image={item.image}
                        link={`/news/${item.id}`} // We haven't implemented single view, but link is good practice
                        buttonText="Read More"
                    />
                ))}
            </div>
        </div>
    );
};

export default News;
