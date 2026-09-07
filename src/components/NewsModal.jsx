import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaSave, FaCloudUploadAlt, FaTrash, FaPlus, FaCheckCircle, FaStar, FaRegStar, FaFileImage } from 'react-icons/fa';
import { uploadImage, deleteUploadedImage } from '../services/api';
import './NewsModal.scss';

const NewsModal = ({ isOpen, onClose, onSave, initialData = null, currentUser = null }) => {
    const isEditMode = !!initialData;
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [pictures, setPictures] = useState([]);
    const [removedPictureUrls, setRemovedPictureUrls] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title || '');
                setAuthor(initialData.author || currentUser?.name || 'UMCA Team');
                setDate(initialData.date || new Date().toISOString().split('T')[0]);
                setSummary(initialData.summary || '');
                setContent(
                    Array.isArray(initialData.content)
                        ? initialData.content.join('\n\n')
                        : (initialData.content || '')
                );

                // Reconstruct existing pictures
                const loadedPics = [];
                const seenUrls = new Set();

                if (initialData.image) {
                    loadedPics.push({
                        id: 'cover-' + Date.now(),
                        url: initialData.image,
                        file: null,
                        isCover: true,
                        name: 'Cover Photo'
                    });
                    seenUrls.add(initialData.image);
                }

                if (Array.isArray(initialData.relatedImages)) {
                    initialData.relatedImages.forEach((imgItem, idx) => {
                        const imgUrl = typeof imgItem === 'string' ? imgItem : imgItem?.url;
                        if (imgUrl && !seenUrls.has(imgUrl)) {
                            seenUrls.add(imgUrl);
                            loadedPics.push({
                                id: 'rel-' + idx + '-' + Date.now(),
                                url: imgUrl,
                                file: null,
                                isCover: loadedPics.length === 0,
                                name: (imgItem && imgItem.title) || `Picture ${loadedPics.length + 1}`
                            });
                        }
                    });
                }

                if (loadedPics.length > 0 && !loadedPics.some(p => p.isCover)) {
                    loadedPics[0].isCover = true;
                }

                setPictures(loadedPics);
                setRemovedPictureUrls([]);
            } else {
                setTitle('');
                setAuthor(currentUser?.name || 'UMCA Team');
                setDate(new Date().toISOString().split('T')[0]);
                setSummary('');
                setContent('');
                setPictures([]);
                setRemovedPictureUrls([]);
            }
            setError('');
            setIsDragging(false);
        }
    }, [isOpen, initialData, currentUser]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const formatBytes = (bytes) => {
        if (!bytes) return '';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const processFiles = (files) => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        const validImageFiles = fileArray.filter(f => f.type.startsWith('image/'));

        if (validImageFiles.length === 0) {
            setError('Please select valid image files (PNG, JPG, JPEG, WEBP, or GIF).');
            return;
        }

        // Check 15MB limit on individual files
        const oversized = validImageFiles.find(f => f.size > 15 * 1024 * 1024);
        if (oversized) {
            setError(`File "${oversized.name}" exceeds 15MB. Please choose smaller image files.`);
            return;
        }

        setError('');
        const newPictures = [];
        let pending = validImageFiles.length;

        validImageFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                newPictures.push({
                    id: 'new-' + Date.now() + '-' + index + '-' + Math.random().toString(36).substring(2, 7),
                    url: reader.result,
                    file: file,
                    isCover: false,
                    name: file.name,
                    size: formatBytes(file.size)
                });
                pending--;
                if (pending === 0) {
                    setPictures(prev => {
                        const updated = [...prev, ...newPictures];
                        // If no picture is set as cover, set the first one as cover
                        if (updated.length > 0 && !updated.some(p => p.isCover)) {
                            updated[0].isCover = true;
                        }
                        return updated;
                    });
                }
            };
            reader.readAsDataURL(file);
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    // Remove a specific picture
    const handleRemoveSpecificPicture = (picId) => {
        setPictures(prev => {
            const target = prev.find(p => p.id === picId);
            if (target && target.url && target.url.includes('/uploads/')) {
                setRemovedPictureUrls(r => [...r, target.url]);
            }

            const remaining = prev.filter(p => p.id !== picId);
            // If the deleted picture was the cover, assign cover to the first remaining picture
            if (target && target.isCover && remaining.length > 0) {
                remaining[0].isCover = true;
            }
            return remaining;
        });
    };

    // Set specific picture as cover photo
    const handleSetCover = (picId) => {
        setPictures(prev => prev.map(p => ({
            ...p,
            isCover: p.id === picId
        })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            setError('Please enter a title for the news article.');
            return;
        }

        if (!summary.trim()) {
            setError('Please enter a short summary for the news preview.');
            return;
        }

        if (!content.trim()) {
            setError('Please provide the full story content.');
            return;
        }

        if (pictures.length === 0) {
            setError('Please upload at least one picture for the news article from your computer.');
            return;
        }

        setSaving(true);
        try {
            // 1. Delete any specific pictures that the user removed from assets folder
            if (removedPictureUrls.length > 0) {
                await Promise.all(removedPictureUrls.map(url => deleteUploadedImage(url)));
            }

            // 2. Upload any new picture files from the user's computer
            const finalProcessedPictures = await Promise.all(
                pictures.map(async (p, idx) => {
                    if (p.file) {
                        const uploadedUrl = await uploadImage(p.file);
                        return {
                            ...p,
                            finalUrl: uploadedUrl
                        };
                    }
                    return {
                        ...p,
                        finalUrl: p.url
                    };
                })
            );

            // 3. Find designated cover picture (or default to the first picture)
            const coverPic = finalProcessedPictures.find(p => p.isCover) || finalProcessedPictures[0];

            // 4. Build related images list containing all pictures
            const allRelatedImages = finalProcessedPictures.map((p, idx) => ({
                url: p.finalUrl,
                title: p.name || `Photo ${idx + 1}`
            }));

            const payload = {
                title: title.trim(),
                author: author.trim() || 'UMCA Team',
                date: date || new Date().toISOString().split('T')[0],
                summary: summary.trim(),
                content: content.trim(),
                image: coverPic.finalUrl,
                relatedImages: allRelatedImages
            };

            await onSave(payload);
            setSaving(false);
            onClose();
        } catch (err) {
            console.error("Failed to save article", err);
            setError(err.message || 'Failed to save news article.');
            setSaving(false);
        }
    };

    return (
        <div className="news-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="news-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditMode ? 'Edit News Article' : 'Add New News Article'}</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                        <FaTimes />
                    </button>
                </div>

                {error && (
                    <div className="modal-error-alert" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group flex-2">
                            <label htmlFor="article-title">Article Title *</label>
                            <input
                                id="article-title"
                                type="text"
                                placeholder="Enter impactful headline..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group flex-1">
                            <label htmlFor="article-date">Publish Date</label>
                            <input
                                id="article-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="article-author">Author / Byline</label>
                        <input
                            id="article-author"
                            type="text"
                            placeholder="e.g. Tariq Mansoor (Field Operations)"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="article-summary">Summary (Card Preview) *</label>
                        <textarea
                            id="article-summary"
                            rows={2}
                            placeholder="A concise 1-2 sentence overview shown on the main news page..."
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="article-content">Full News Story Details *</label>
                        <span className="field-hint">Tip: Separate paragraphs with an empty line (double enter).</span>
                        <textarea
                            id="article-content"
                            rows={6}
                            placeholder="Write the full report, challenges faced, people helped, and future plans..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    {/* Multiple Pictures Upload from Computer (Only Option) */}
                    <div className="form-group multi-upload-group">
                        <div className="upload-header-row">
                            <div>
                                <label>News Photography ({pictures.length} {pictures.length === 1 ? 'Picture' : 'Pictures'}) *</label>
                                <span className="field-hint">
                                    Upload one or multiple pictures from your computer. You can choose a cover picture and remove specific pictures.
                                </span>
                            </div>

                            {pictures.length > 0 && (
                                <button
                                    type="button"
                                    className="button outline small add-more-pics-btn"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <FaPlus /> Add More Pictures
                                </button>
                            )}
                        </div>

                        {/* Hidden native multi-file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />

                        {pictures.length === 0 ? (
                            <div
                                className={`computer-upload-dropzone ${isDragging ? 'is-dragging' : ''}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                            >
                                <div className="upload-icon-wrapper">
                                    <FaCloudUploadAlt className="cloud-icon" />
                                </div>
                                <div className="upload-text-content">
                                    <p className="upload-heading">
                                        <strong>Click to browse</strong> or drag & drop one or multiple pictures
                                    </p>
                                    <p className="upload-subtext">
                                        Select multiple photos at once from your computer (PNG, JPG, WEBP, GIF up to 15MB each)
                                    </p>
                                </div>
                                <button type="button" className="button outline browse-computer-btn">
                                    Browse from Computer
                                </button>
                            </div>
                        ) : (
                            <div className="pictures-gallery-manager">
                                <div className="pictures-grid">
                                    {pictures.map((pic, idx) => (
                                        <div
                                            key={pic.id || idx}
                                            className={`picture-card-tile ${pic.isCover ? 'is-cover' : ''}`}
                                        >
                                            <div className="picture-thumb-wrap">
                                                <img src={pic.url} alt={pic.name || `Photo ${idx + 1}`} />

                                                {/* Cover Photo Badge or Button */}
                                                {pic.isCover ? (
                                                    <div className="cover-badge" title="Main featured image for card and article hero">
                                                        <FaStar className="star-icon" /> Cover Photo
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="set-cover-btn"
                                                        onClick={() => handleSetCover(pic.id)}
                                                        title="Set this picture as the main cover photo"
                                                    >
                                                        <FaRegStar /> Set as Cover
                                                    </button>
                                                )}

                                                {/* Specific Picture Delete / Remove Button */}
                                                <button
                                                    type="button"
                                                    className="delete-specific-pic-btn"
                                                    onClick={() => handleRemoveSpecificPicture(pic.id)}
                                                    aria-label="Remove this picture"
                                                    title="Remove this specific picture"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>

                                            <div className="picture-info-footer">
                                                <span className="pic-name" title={pic.name}>
                                                    {pic.name || `Photo ${idx + 1}`}
                                                </span>
                                                {pic.size && <span className="pic-size">{pic.size}</span>}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Quick add slot tile at end of grid */}
                                    <div
                                        className="add-picture-slot-tile"
                                        onClick={() => fileInputRef.current?.click()}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                                        title="Add more pictures from computer"
                                    >
                                        <FaPlus className="plus-icon" />
                                        <span>Add Pictures</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="button outline"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="button primary save-submit-btn"
                            disabled={saving}
                        >
                            <FaSave /> {saving ? 'Saving Article...' : (isEditMode ? 'Update Article' : 'Publish Article')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsModal;
