import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import NewsModal from '../components/NewsModal';
import { fetchNews, createNews, updateNews, deleteNews, exportNewsData } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaNewspaper, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaDownload } from 'react-icons/fa';
import './News.scss';

const News = () => {
    const { user } = useAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

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

    useEffect(() => {
        loadNews();
    }, []);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleOpenAdd = () => {
        setEditingArticle(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (article) => {
        setEditingArticle(article);
        setModalOpen(true);
    };

    const handleSaveArticle = async (formData) => {
        try {
            if (editingArticle) {
                // Update
                const updated = await updateNews(editingArticle.id, formData);
                setNews(prev => prev.map(item => item.id === updated.id ? updated : item));
                showToast('Article updated successfully!');
            } else {
                // Create
                const created = await createNews(formData);
                setNews(prev => [created, ...prev]);
                showToast('New article published successfully!');
            }
        } catch (err) {
            console.error("Failed to save article:", err);
            alert("Could not save article: " + (err.message || 'Unknown error'));
        }
    };

    const handleExport = async () => {
        try {
            await exportNewsData();
            showToast('news.json exported successfully!');
        } catch (err) {
            console.error("Failed to export news data:", err);
            alert("Failed to export data: " + err.message);
        }
    };

    const handleDelete = async (id, title) => {
        const confirmed = window.confirm(`Are you sure you want to remove the article: "${title}"? This action cannot be undone.`);
        if (!confirmed) return;

        try {
            await deleteNews(id);
            setNews(prev => prev.filter(item => item.id !== id));
            showToast('Article removed successfully!');
        } catch (err) {
            console.error("Failed to delete article", err);
            alert("Failed to delete article: " + err.message);
        }
    };

    if (loading) {
        return (
            <div className="container news-loading">
                <div className="loading-spinner"></div>
                <p>Loading Latest News & Activities...</p>
            </div>
        );
    }

    return (
        <div className="news-page">
            {/* News Header Section */}
            <section className="news-hero-section">
                <div className="container">
                    <span className="news-subheading">
                        <FaNewspaper className="hero-icon" /> Field Updates & Announcements
                    </span>
                    <h1 className="news-hero-title">Latest News & Activities</h1>
                    <p className="news-hero-desc">
                        Explore firsthand stories of humanitarian relief, community empowerment, and ongoing initiatives by UMCA.
                    </p>
                </div>
            </section>

            {/* Notification Toast */}
            {toastMessage && (
                <div className="news-toast-notification">
                    <FaCheckCircle className="toast-icon" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* All News in One Page */}
            <div className="container news-content-wrapper">
                {/* Admin Management Toolbar */}
                {user && (
                    <div className="news-management-bar">
                        <div className="management-info">
                            <span className="user-role-tag">{user.role}</span>
                            <span>Signed in as <strong>{user.name}</strong> • You can create, edit, and remove news.</span>
                        </div>
                        <div className="management-actions">
                            <button
                                type="button"
                                className="button outline export-news-btn"
                                onClick={handleExport}
                                title="Download all current articles as news.json for GitHub deployment"
                            >
                                <FaDownload /> Export news.json
                            </button>
                            <button
                                type="button"
                                className="button primary add-article-btn"
                                onClick={handleOpenAdd}
                            >
                                <FaPlus /> Add New Article
                            </button>
                        </div>
                    </div>
                )}

                <div className="news-grid">
                    {news.map(item => (
                        <div key={item.id} className="news-card-wrapper">
                            <Card
                                title={item.title}
                                description={item.summary}
                                image={item.image}
                                link={`/news/${item.id}`}
                                buttonText="Read More ↗"
                                target="_blank"
                                rel="noopener noreferrer"
                                date={item.date}
                            />

                            {/* Action Bar for Logged-In Users */}
                            {user && (
                                <div className="card-admin-bar">
                                    <button
                                        className="admin-action-btn edit"
                                        onClick={() => handleOpenEdit(item)}
                                        title="Edit this news article"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="admin-action-btn delete"
                                        onClick={() => handleDelete(item.id, item.title)}
                                        title="Delete this news article"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Insert / Edit Modal */}
            <NewsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveArticle}
                initialData={editingArticle}
                currentUser={user}
            />
        </div>
    );
};

export default News;
