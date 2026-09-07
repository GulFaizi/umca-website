import img1 from '../assets/news/earthquake.jpg';
import img2 from '../assets/news/flood.jpg';
import img3 from '../assets/news/news1.jpg';
import img4 from '../assets/news/news2.jpg';
import winterSuppliesImg from '../assets/news/winter-supplies.jpg';
import winterConvoyImg from '../assets/news/winter-convoy.jpg';
import schoolCeremonyImg from '../assets/news/school-ceremony.jpg';
import schoolBagsImg from '../assets/news/school-bags.jpg';
import medicalClinicImg from '../assets/news/medical-clinic.jpg';
import medicalMedicineImg from '../assets/news/medical-medicine.jpg';
import waterWellImg from '../assets/news/water-well.jpg';
import waterPumpImg from '../assets/news/water-pump.jpg';
import newsInitialData from '../data/news.json';

// Image mapping for filenames stored in JSON
const imageMap = {
    'winter-supplies.jpg': winterSuppliesImg,
    'winter-convoy.jpg': winterConvoyImg,
    'school-ceremony.jpg': schoolCeremonyImg,
    'school-bags.jpg': schoolBagsImg,
    'medical-clinic.jpg': medicalClinicImg,
    'medical-medicine.jpg': medicalMedicineImg,
    'water-well.jpg': waterWellImg,
    'water-pump.jpg': waterPumpImg,
    'earthquake.jpg': img1,
    'flood.jpg': img2,
    'news1.jpg': img3,
    'news2.jpg': img4
};

export const resolveImageUrl = (img) => {
    if (!img) return winterSuppliesImg;
    if (typeof img !== 'string') return img;
    if (imageMap[img]) return imageMap[img];
    const filename = img.split('/').pop().split('\\').pop();
    if (imageMap[filename]) return imageMap[filename];
    return img;
};

const normalizeArticle = (article) => {
    if (!article) return article;
    const contentArray = Array.isArray(article.content)
        ? article.content
        : (typeof article.content === 'string'
            ? article.content.split('\n\n').filter(p => p.trim())
            : ["No details provided."]);

    return {
        ...article,
        content: contentArray,
        image: resolveImageUrl(article.image),
        relatedImages: (article.relatedImages || []).map(item => ({
            ...item,
            url: resolveImageUrl(item.url)
        }))
    };
};

export const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Data = reader.result;
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        filename: file.name,
                        data: base64Data
                    })
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.url) {
                        resolve(result.url);
                        return;
                    }
                }
            } catch (e) {
                console.warn("Could not post to /api/upload, using data URL fallback", e);
            }
            resolve(base64Data);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
};

export const deleteUploadedImage = async (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== 'string') return;
    if (!imageUrl.includes('/uploads/')) return;
    try {
        await fetch(`/api/upload?url=${encodeURIComponent(imageUrl)}`, {
            method: 'DELETE'
        });
    } catch (e) {
        console.warn("Could not call DELETE /api/upload", e);
    }
};

export const presetImages = [
    { label: "Winter Supplies Relief", url: winterSuppliesImg, filename: "winter-supplies.jpg" },
    { label: "Winter Mountain Convoy", url: winterConvoyImg, filename: "winter-convoy.jpg" },
    { label: "School Classroom", url: schoolCeremonyImg, filename: "school-ceremony.jpg" },
    { label: "School Backpacks & Books", url: schoolBagsImg, filename: "school-bags.jpg" },
    { label: "Medical Clinic Outreach", url: medicalClinicImg, filename: "medical-clinic.jpg" },
    { label: "Pharmacy & Medicine", url: medicalMedicineImg, filename: "medical-medicine.jpg" },
    { label: "Clean Solar Water Tap", url: waterWellImg, filename: "water-well.jpg" },
    { label: "Solar Pump Installation", url: waterPumpImg, filename: "water-pump.jpg" },
    { label: "Emergency Operations", url: img1, filename: "earthquake.jpg" },
    { label: "Community Development", url: img2, filename: "flood.jpg" }
];

const STORAGE_KEY = 'umca_news_articles_v2';

const getStoredNews = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Failed to read news from localStorage", e);
    }
    // Default to newsInitialData from news.json
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newsInitialData));
    } catch (e) {
        console.error("Failed to initialize news in localStorage", e);
    }
    return newsInitialData;
};

const saveStoredNews = (articles) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
        console.error("Failed to save news to localStorage", e);
    }
};

export const fetchNews = async () => {
    try {
        const response = await fetch('/api/news');
        if (response.ok) {
            const articles = await response.json();
            if (Array.isArray(articles)) {
                saveStoredNews(articles);
                return articles.map(normalizeArticle);
            }
        }
    } catch (e) {
        console.warn("Could not fetch /api/news, using local cache", e);
    }

    const fallback = getStoredNews();
    return fallback.map(normalizeArticle);
};

export const fetchNewsById = async (id) => {
    try {
        const response = await fetch(`/api/news/${id}`);
        if (response.ok) {
            const article = await response.json();
            if (article) {
                return normalizeArticle(article);
            }
        }
    } catch (e) {
        console.warn(`Could not fetch /api/news/${id}, using local cache`, e);
    }

    const articles = getStoredNews();
    const found = articles.find(item => String(item.id) === String(id));
    if (found) {
        return normalizeArticle(found);
    }
    throw new Error("News article not found");
};

export const createNews = async (newsItem) => {
    const newArticle = {
        id: Date.now(),
        title: newsItem.title || "Untitled News",
        date: newsItem.date || new Date().toISOString().split('T')[0],
        author: newsItem.author || "UMCA Team",
        readTime: newsItem.readTime || "3 min read",
        summary: newsItem.summary || "",
        image: newsItem.image || "winter-supplies.jpg",
        content: Array.isArray(newsItem.content)
            ? newsItem.content
            : (newsItem.content ? newsItem.content.split('\n\n').filter(p => p.trim()) : ["No details provided."]),
        quote: newsItem.quote || null,
        relatedImages: newsItem.relatedImages && newsItem.relatedImages.length > 0
            ? newsItem.relatedImages
            : [{ url: newsItem.image || "winter-supplies.jpg", title: newsItem.title || "News Photo" }]
    };

    try {
        const response = await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArticle)
        });
        if (response.ok) {
            const saved = await response.json();
            const current = getStoredNews();
            const updated = [saved, ...current.filter(item => String(item.id) !== String(saved.id))];
            saveStoredNews(updated);
            return normalizeArticle(saved);
        }
    } catch (e) {
        console.warn("Could not post to /api/news, creating locally", e);
    }

    const current = getStoredNews();
    const updated = [newArticle, ...current];
    saveStoredNews(updated);
    return normalizeArticle(newArticle);
};

export const updateNews = async (id, updatedFields) => {
    try {
        const response = await fetch(`/api/news/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields)
        });
        if (response.ok) {
            const saved = await response.json();
            const current = getStoredNews();
            const idx = current.findIndex(item => String(item.id) === String(id));
            if (idx !== -1) {
                current[idx] = { ...current[idx], ...saved };
                saveStoredNews(current);
            }
            return normalizeArticle(saved);
        }
    } catch (e) {
        console.warn(`Could not put to /api/news/${id}, updating locally`, e);
    }

    const articles = getStoredNews();
    const index = articles.findIndex(item => String(item.id) === String(id));
    if (index === -1) {
        throw new Error("Article not found for update");
    }

    const existing = articles[index];
    const updated = {
        ...existing,
        ...updatedFields,
        id: existing.id,
        content: Array.isArray(updatedFields.content)
            ? updatedFields.content
            : (typeof updatedFields.content === 'string'
                ? updatedFields.content.split('\n\n').filter(p => p.trim())
                : existing.content)
    };

    articles[index] = updated;
    saveStoredNews(articles);
    return normalizeArticle(updated);
};

export const deleteNews = async (id) => {
    // 1. Send DELETE to /api/news/:id so the server removes the item from src/data/news.json
    try {
        const response = await fetch(`/api/news/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const resData = await response.json();
            console.log(`Successfully removed article ${id} from news.json on server:`, resData);
        } else {
            console.warn(`Server responded with ${response.status} when deleting news article ${id}`);
        }
    } catch (e) {
        console.warn("Could not delete from /api/news, removing from local storage only", e);
    }

    // 2. Synchronize localStorage
    const articles = getStoredNews();
    const filtered = articles.filter(item => String(item.id) !== String(id));
    saveStoredNews(filtered);
    return true;
};
