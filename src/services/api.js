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
import uploadPic1 from '../assets/uploads/1788804961487-pexels-steve-30018097.jpg';
import uploadPic2 from '../assets/uploads/1788804961512-pexels-amal-a-s-2150318757-31913642.jpg';
import uploadPic3 from '../assets/uploads/1788804961522-pexels-christina99999-38524143.jpg';
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
    'news2.jpg': img4,
    '1788804961487-pexels-steve-30018097.jpg': uploadPic1,
    '1788804961512-pexels-amal-a-s-2150318757-31913642.jpg': uploadPic2,
    '1788804961522-pexels-christina99999-38524143.jpg': uploadPic3
};

export const resolveImageUrl = (img) => {
    if (!img) return winterSuppliesImg;
    if (typeof img !== 'string') return img;
    // Data URLs, Blobs, and external HTTP URLs can be used directly without parsing
    if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http://') || img.startsWith('https://')) {
        return img;
    }
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
            url: resolveImageUrl(item && item.url ? item.url : item)
        }))
    };
};

/**
 * Client-side Canvas Image Compression
 * Shrinks uploaded 5MB-15MB photos down to ~120KB while preserving retina clarity.
 */
export const compressImageFile = (file, maxWidth = 1600, maxHeight = 1600, quality = 0.82) => {
    return new Promise((resolve) => {
        if (!file) {
            resolve('');
            return;
        }
        if (typeof file === 'string') {
            resolve(file);
            return;
        }
        // If not an image or is an animated GIF, read as regular data URL
        if (!file.type || !file.type.startsWith('image/') || file.type === 'image/gif') {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve('');
            reader.readAsDataURL(file);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Use JPEG for optimal photo compression and compatibility
                const outputFormat = file.type === 'image/png' ? 'image/jpeg' : (file.type || 'image/jpeg');
                const compressedUrl = canvas.toDataURL(outputFormat, quality);
                resolve(compressedUrl);
            };
            img.onerror = () => {
                resolve(reader.result);
            };
            img.src = e.target.result;
        };
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
    });
};

/**
 * IndexedDB Native Storage Engine
 * High-capacity client database (hundreds of MBs) that prevents 5MB localStorage quota errors.
 */
const DB_NAME = 'umca_news_db';
const DB_VERSION = 1;
const STORE_NAME = 'articles';
const STORAGE_KEY = 'umca_news_articles_v2';
const INIT_KEY = 'umca_news_initialized_v2';

const openDB = () => {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
            reject(new Error("IndexedDB is not available"));
            return;
        }
        const req = window.indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
};

const idbGetAll = async () => {
    try {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => resolve([]);
        });
    } catch (e) {
        return [];
    }
};

const idbPut = async (item) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.put(item);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        return false;
    }
};

const idbPutAll = async (items) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            items.forEach(item => store.put(item));
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    } catch (e) {
        return false;
    }
};

const idbDelete = async (id) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const numId = Number(id);
            const strId = String(id);
            if (!isNaN(numId)) store.delete(numId);
            store.delete(strId);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    } catch (e) {
        return false;
    }
};

const idbClear = async () => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.clear();
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    } catch (e) {
        return false;
    }
};

/**
 * LocalStorage sync helper with size guard to avoid QuotaExceededError
 */
const saveToLocalStorage = (articles) => {
    try {
        const sanitized = articles.map(item => {
            const isDataUrl = item.image && item.image.startsWith('data:');
            return {
                ...item,
                image: isDataUrl && item.image.length > 300000 ? '' : item.image,
                relatedImages: (item.relatedImages || []).map(r => ({
                    ...r,
                    url: r.url && r.url.startsWith('data:') && r.url.length > 300000 ? '' : r.url
                }))
            };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch (e) {
        console.warn("LocalStorage quota reached; relying on IndexedDB", e);
    }
};

const getFromLocalStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (e) {}
    return [];
};

/**
 * Helper to safely check if response is real JSON (preventing HTML SyntaxError on Vercel)
 */
const isRealJsonResponse = (response) => {
    if (!response || !response.ok) return false;
    const contentType = response.headers.get('content-type') || '';
    return contentType.includes('application/json');
};

/**
 * Upload Image: Compresses on canvas, uploads to server if available, or returns data URL
 */
export const uploadImage = async (file) => {
    const compressedDataUrl = await compressImageFile(file, 1600, 1600, 0.82);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filename: file.name || 'photo.jpg',
                data: compressedDataUrl
            })
        });
        if (isRealJsonResponse(response)) {
            const result = await response.json();
            if (result && result.url) {
                return result.url;
            }
        }
    } catch (e) {
        // Dev server / API not available (production Vercel)
    }

    return compressedDataUrl;
};

export const deleteUploadedImage = async (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== 'string') return;
    if (!imageUrl.includes('/uploads/')) return;
    try {
        const response = await fetch(`/api/upload?url=${encodeURIComponent(imageUrl)}`, {
            method: 'DELETE'
        });
        if (isRealJsonResponse(response)) {
            // Deleted on server
        }
    } catch (e) {}
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

/**
 * Fetch all news: syncs with /api/news if available, otherwise reads from IndexedDB
 */
export const fetchNews = async () => {
    // 1. If backend API is running (e.g. Vite dev server), sync with /api/news
    try {
        const response = await fetch('/api/news');
        if (isRealJsonResponse(response)) {
            const apiArticles = await response.json();
            if (Array.isArray(apiArticles)) {
                await idbClear();
                await idbPutAll(apiArticles);
                saveToLocalStorage(apiArticles);
                localStorage.setItem(INIT_KEY, 'true');
                return apiArticles.map(normalizeArticle);
            }
        }
    } catch (e) {
        // Backend API not reachable
    }

    // 2. Read from IndexedDB
    let stored = await idbGetAll();

    // 3. Seed if this is the very first time
    const isInitialized = localStorage.getItem(INIT_KEY);
    if (!isInitialized && stored.length === 0) {
        const lsData = getFromLocalStorage();
        const initialList = lsData.length > 0 ? lsData : newsInitialData;
        await idbPutAll(initialList);
        saveToLocalStorage(initialList);
        localStorage.setItem(INIT_KEY, 'true');
        stored = initialList;
    }

    // Sort newest first
    const sorted = [...stored].sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        if (dateB !== dateA) return dateB - dateA;
        return Number(b.id || 0) - Number(a.id || 0);
    });

    return sorted.map(normalizeArticle);
};

export const fetchNewsById = async (id) => {
    try {
        const response = await fetch(`/api/news/${id}`);
        if (isRealJsonResponse(response)) {
            const article = await response.json();
            if (article) return normalizeArticle(article);
        }
    } catch (e) {}

    const articles = await idbGetAll();
    let found = articles.find(item => String(item.id) === String(id));

    if (!found) {
        const ls = getFromLocalStorage();
        found = ls.find(item => String(item.id) === String(id));
    }

    if (!found && Array.isArray(newsInitialData)) {
        found = newsInitialData.find(item => String(item.id) === String(id));
    }

    if (found) {
        return normalizeArticle(found);
    }
    throw new Error("News article not found");
};

export const createNews = async (newsItem) => {
    const newArticle = {
        id: newsItem.id || Date.now(),
        title: newsItem.title || "Untitled News",
        date: newsItem.date || new Date().toISOString().split('T')[0],
        author: newsItem.author || "UMCA Team",
        readTime: newsItem.readTime || "3 min read",
        summary: newsItem.summary || "",
        image: newsItem.image || "winter-supplies.jpg",
        content: Array.isArray(newsItem.content)
            ? newsItem.content
            : (typeof newsItem.content === 'string'
                ? newsItem.content.split('\n\n').filter(p => p.trim())
                : ["No details provided."]),
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
        if (isRealJsonResponse(response)) {
            const saved = await response.json();
            if (saved && saved.id) {
                Object.assign(newArticle, saved);
            }
        }
    } catch (e) {
        // Backend API not reachable
    }

    // Persist to IndexedDB and sync localStorage
    await idbPut(newArticle);
    const all = await idbGetAll();
    saveToLocalStorage(all);
    localStorage.setItem(INIT_KEY, 'true');

    return normalizeArticle(newArticle);
};

export const updateNews = async (id, updatedFields) => {
    try {
        const response = await fetch(`/api/news/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields)
        });
        if (isRealJsonResponse(response)) {
            const saved = await response.json();
            // Server updated
        }
    } catch (e) {}

    const articles = await idbGetAll();
    let existing = articles.find(item => String(item.id) === String(id));
    if (!existing) {
        existing = getFromLocalStorage().find(item => String(item.id) === String(id));
    }
    if (!existing && Array.isArray(newsInitialData)) {
        existing = newsInitialData.find(item => String(item.id) === String(id));
    }

    if (!existing) {
        throw new Error("Article not found for update");
    }

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

    await idbPut(updated);
    const all = await idbGetAll();
    saveToLocalStorage(all);
    localStorage.setItem(INIT_KEY, 'true');

    return normalizeArticle(updated);
};

export const deleteNews = async (id) => {
    try {
        const response = await fetch(`/api/news/${id}`, {
            method: 'DELETE'
        });
        if (isRealJsonResponse(response)) {
            const resData = await response.json();
            console.log(`Successfully removed article ${id} from server:`, resData);
        }
    } catch (e) {}

    await idbDelete(id);
    const remaining = (await idbGetAll()).filter(item => String(item.id) !== String(id));
    saveToLocalStorage(remaining);
    localStorage.setItem(INIT_KEY, 'true');

    return true;
};

/**
 * Admin export tool: Downloads the current news dataset as news.json
 * Allows the admin to commit updated news to the git repository for global deployment.
 */
export const exportNewsData = async () => {
    const articles = await idbGetAll();
    const list = articles.length > 0 ? articles : newsInitialData;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(list, null, 4)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'news.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
};
