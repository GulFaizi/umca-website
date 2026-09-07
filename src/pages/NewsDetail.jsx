import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchNewsById, fetchNews, updateNews, deleteNews } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import NewsModal from '../components/NewsModal';
import {
    FaArrowLeft,
    FaRegCalendarAlt,
    FaUser,
    FaClock,
    FaQuoteLeft,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaExpand,
    FaShareAlt,
    FaCheck,
    FaHeart,
    FaEdit,
    FaTrash
} from 'react-icons/fa';
import './NewsDetail.scss';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [article, setArticle] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // Lightbox modal state
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchNewsById(id);
                setArticle(data);

                // Fetch all news for "More Stories"
                const allNews = await fetchNews();
                setRelatedNews(allNews.filter(item => String(item.id) !== String(id)).slice(0, 3));
            } catch (err) {
                console.error("Error loading news detail", err);
                setError("Unable to find this news article.");
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxIndex === null || !article?.relatedImages) return;

            if (e.key === 'Escape') {
                setLightboxIndex(null);
            } else if (e.key === 'ArrowRight') {
                setLightboxIndex((prev) => (prev + 1) % article.relatedImages.length);
            } else if (e.key === 'ArrowLeft') {
                setLightboxIndex((prev) => (prev - 1 + article.relatedImages.length) % article.relatedImages.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, article]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSaveEdit = async (formData) => {
        try {
            const updated = await updateNews(article.id, formData);
            setArticle(updated);
        } catch (err) {
            console.error("Failed to update article", err);
            alert("Failed to update article: " + err.message);
        }
    };

    const handleDeleteArticle = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete the article: "${article.title}"? This cannot be undone.`);
        if (!confirmed) return;

        try {
            await deleteNews(article.id);
            navigate('/news');
        } catch (err) {
            console.error("Failed to delete article", err);
            alert("Failed to delete article: " + err.message);
        }
    };

    if (loading) {
        return (
            <div className="news-detail-loading container">
                <div className="detail-spinner"></div>
                <p>Loading news details and photography...</p>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="news-detail-error container">
                <h2>Article Not Found</h2>
                <p>{error || "The news article you are looking for does not exist or has been relocated."}</p>
                <Link to="/news" className="button primary">
                    <FaArrowLeft /> Return to News
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className="news-detail-page">
            {/* Top Navigation Bar */}
            <div className="detail-top-bar">
                <div className="container">
                    <Link to="/news" className="back-link">
                        <FaArrowLeft className="back-icon" /> Back to All News
                    </Link>
                </div>
            </div>

            <div className="container detail-container">
                {/* Header Section */}
                <header className="detail-header">
                    <div className="detail-meta-tags">
                        {article.readTime && (
                            <span className="detail-meta-item">
                                <FaClock className="meta-icon" /> {article.readTime}
                            </span>
                        )}
                        <span className="detail-meta-item">
                            <FaRegCalendarAlt className="meta-icon" /> {formattedDate}
                        </span>
                    </div>

                    <h1 className="detail-title">{article.title}</h1>

                    <div className="detail-byline-bar">
                        <div className="author-info">
                            <div className="author-avatar">
                                <FaUser />
                            </div>
                            <div>
                                <p className="author-name">{article.author || "UMCA Media Team"}</p>
                                <span className="author-role">Humanitarian Field Report</span>
                            </div>
                        </div>

                        <div className="header-actions">
                            {user && (
                                <div className="detail-admin-group">
                                    <button
                                        className="detail-admin-btn edit"
                                        onClick={() => setEditModalOpen(true)}
                                        title="Edit this article"
                                    >
                                        <FaEdit /> Edit Article
                                    </button>
                                    <button
                                        className="detail-admin-btn delete"
                                        onClick={handleDeleteArticle}
                                        title="Delete this article"
                                    >
                                        <FaTrash /> Delete Article
                                    </button>
                                </div>
                            )}

                            <button
                                className={`share-button ${copied ? 'copied' : ''}`}
                                onClick={handleCopyLink}
                                aria-label="Share article link"
                            >
                                {copied ? (
                                    <>
                                        <FaCheck className="share-icon" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <FaShareAlt className="share-icon" /> Share
                                    </>
                                )}
                            </button>
                            <Link to="/donate" className="button primary donate-quick-btn">
                                <FaHeart className="donate-icon" /> Donate
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Featured Image */}
                <div className="detail-hero-media">
                    <img src={article.image} alt={article.title} className="detail-hero-img" />
                </div>

                {/* Main Article Content Narrative */}
                <div className="detail-content-body">
                    {article.content && article.content.map((paragraph, index) => (
                        <p key={index} className="content-paragraph">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Field Quote Callout */}
                {article.quote && (
                    <blockquote className="detail-quote-card">
                        <FaQuoteLeft className="quote-mark" />
                        <p className="quote-text">"{article.quote.text}"</p>
                        <footer className="quote-footer">
                            <cite className="quote-author">{article.quote.author}</cite>
                            <span className="quote-role">{article.quote.role}</span>
                        </footer>
                    </blockquote>
                )}

                {/* Related Pictures Gallery */}
                {article.relatedImages && article.relatedImages.length > 0 && (
                    <section className="detail-gallery-section">
                        <div className="gallery-header">
                            <h2 className="gallery-title">Related Pictures</h2>
                        </div>

                        <div className="gallery-grid">
                            {article.relatedImages.map((imgItem, idx) => (
                                <div
                                    key={idx}
                                    className="gallery-item"
                                    onClick={() => setLightboxIndex(idx)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
                                    aria-label="View enlarged photo"
                                >
                                    <div className="gallery-image-wrapper">
                                        <img
                                            src={imgItem.url}
                                            alt=""
                                            className="gallery-thumb"
                                            loading="lazy"
                                        />
                                        <div className="gallery-overlay">
                                            <span className="zoom-indicator">
                                                <FaExpand /> View Full Size
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Call to Action Banner */}
                <section className="detail-cta-banner">
                    <div className="cta-content">
                        <h3>Help Us Deliver Hope & Immediate Relief</h3>
                        <p>
                            Your generous contribution powers our ground teams to respond to crises, feed families, build schools, and provide life-saving healthcare.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/donate" className="button primary cta-btn">
                                Donate Now
                            </Link>
                            <Link to="/get-involved" className="button secondary cta-btn">
                                Volunteer With Us
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Related / More Stories */}
                {relatedNews.length > 0 && (
                    <section className="detail-related-news">
                        <h2 className="related-section-title">More News & Field Stories</h2>
                        <div className="related-news-grid">
                            {relatedNews.map(item => (
                                <Card
                                    key={item.id}
                                    title={item.title}
                                    description={item.summary}
                                    image={item.image}
                                    link={`/news/${item.id}`}
                                    buttonText="Read More ↗"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    date={item.date}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Interactive Lightbox Modal */}
            {lightboxIndex !== null && article.relatedImages && (
                <div
                    className="lightbox-backdrop"
                    onClick={() => setLightboxIndex(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview lightbox"
                >
                    <div
                        className="lightbox-dialog"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="lightbox-close-btn"
                            onClick={() => setLightboxIndex(null)}
                            aria-label="Close photo preview"
                        >
                            <FaTimes />
                        </button>

                        <div className="lightbox-image-container">
                            <img
                                src={article.relatedImages[lightboxIndex].url}
                                alt={article.relatedImages[lightboxIndex].title}
                                className="lightbox-image"
                            />

                            {article.relatedImages.length > 1 && (
                                <>
                                    <button
                                        className="lightbox-nav-btn prev"
                                        onClick={() => setLightboxIndex((prev) => (prev - 1 + article.relatedImages.length) % article.relatedImages.length)}
                                        aria-label="Previous image"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button
                                        className="lightbox-nav-btn next"
                                        onClick={() => setLightboxIndex((prev) => (prev + 1) % article.relatedImages.length)}
                                        aria-label="Next image"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Article Modal */}
            <NewsModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveEdit}
                initialData={article}
                currentUser={user}
            />
        </article>
    );
};

export default NewsDetail;
