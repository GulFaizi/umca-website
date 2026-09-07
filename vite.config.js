import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const newsFilePath = path.resolve(__dirname, 'src/data/news.json');
const uploadsDir = path.resolve(__dirname, 'src/assets/uploads');

// Helper to safely delete an uploaded picture file from src/assets/uploads/
const deletePictureFromAssets = (imgUrl) => {
    if (!imgUrl || typeof imgUrl !== 'string') return;
    try {
        let filename = '';
        if (imgUrl.includes('/uploads/')) {
            filename = imgUrl.split('/uploads/').pop();
        } else if (imgUrl.includes('src/assets/uploads/')) {
            filename = imgUrl.split('src/assets/uploads/').pop();
        }

        if (filename) {
            // Strip any query parameters or hash
            filename = filename.split('?')[0].split('#')[0];
            const filePath = path.resolve(uploadsDir, filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`[Vite API] Successfully deleted picture from assets: ${filePath}`);
            }
        }
    } catch (e) {
        console.error(`[Vite API] Error deleting picture from assets:`, e);
    }
};

function newsApiPlugin() {
    return {
        name: 'news-api-plugin',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (!req.url || (!req.url.startsWith('/api/news') && !req.url.startsWith('/api/upload'))) {
                    return next();
                }

                // Helper to parse JSON body
                const parseBody = (cb) => {
                    let body = '';
                    req.on('data', chunk => { body += chunk; });
                    req.on('end', () => {
                        try {
                            const parsed = JSON.parse(body || '{}');
                            cb(null, parsed);
                        } catch (err) {
                            cb(err);
                        }
                    });
                };

                const urlObj = new URL(req.url, 'http://localhost');

                // POST /api/upload (Upload image file from computer)
                if (req.method === 'POST' && req.url.startsWith('/api/upload')) {
                    parseBody((err, body) => {
                        if (err || !body || !body.data) {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ error: 'Invalid upload request: Missing image data' }));
                            return;
                        }

                        try {
                            if (!fs.existsSync(uploadsDir)) {
                                fs.mkdirSync(uploadsDir, { recursive: true });
                            }

                            const rawData = body.data;
                            const matches = rawData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                            let ext = 'jpg';
                            let base64Content = rawData;

                            if (matches && matches.length === 3) {
                                const mimeType = matches[1];
                                const sub = mimeType.split('/')[1] || 'jpg';
                                ext = sub.replace('+xml', '').replace('jpeg', 'jpg');
                                base64Content = matches[2];
                            }

                            const originalName = (body.filename || 'photo')
                                .replace(/[^a-zA-Z0-9.-]/g, '_')
                                .replace(/\.[^/.]+$/, '');
                            const finalFilename = `${Date.now()}-${originalName}.${ext}`;
                            const targetPath = path.resolve(uploadsDir, finalFilename);

                            const buffer = Buffer.from(base64Content, 'base64');
                            fs.writeFileSync(targetPath, buffer);

                            const fileUrl = `/src/assets/uploads/${finalFilename}`;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({
                                success: true,
                                url: fileUrl,
                                filename: finalFilename
                            }));
                        } catch (uploadErr) {
                            console.error('Failed to save uploaded image:', uploadErr);
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: uploadErr.message }));
                        }
                    });
                    return;
                }

                // DELETE /api/upload?url=... (Delete a specific uploaded picture file from assets)
                if (req.method === 'DELETE' && req.url.startsWith('/api/upload')) {
                    res.setHeader('Content-Type', 'application/json');
                    const targetUrl = urlObj.searchParams.get('url');
                    if (targetUrl) {
                        deletePictureFromAssets(targetUrl);
                        res.end(JSON.stringify({ success: true, deleted: targetUrl }));
                    } else {
                        parseBody((err, body) => {
                            if (body && body.url) {
                                deletePictureFromAssets(body.url);
                                res.end(JSON.stringify({ success: true, deleted: body.url }));
                            } else {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ error: 'Missing image url to delete' }));
                            }
                        });
                    }
                    return;
                }

                // NEWS API HANDLERS
                const pathname = urlObj.pathname;
                const pathParts = pathname.split('/').filter(Boolean);
                const idFromPath = pathParts[2];
                const id = idFromPath || urlObj.searchParams.get('id');

                const getArticles = () => {
                    if (!fs.existsSync(newsFilePath)) {
                        return [];
                    }
                    try {
                        const raw = fs.readFileSync(newsFilePath, 'utf-8');
                        return JSON.parse(raw);
                    } catch (e) {
                        console.error('Error reading news.json:', e);
                        return [];
                    }
                };

                const saveArticles = (data) => {
                    fs.writeFileSync(newsFilePath, JSON.stringify(data, null, 4), 'utf-8');
                };

                // GET /api/news or /api/news/:id
                if (req.method === 'GET') {
                    res.setHeader('Content-Type', 'application/json');
                    const articles = getArticles();
                    if (id) {
                        const article = articles.find(a => String(a.id) === String(id));
                        if (article) {
                            res.end(JSON.stringify(article));
                        } else {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ error: 'Article not found' }));
                        }
                    } else {
                        res.end(JSON.stringify(articles));
                    }
                    return;
                }

                // DELETE /api/news/:id or /api/news?id=... (Deletes article AND its uploaded picture assets from disk)
                if (req.method === 'DELETE') {
                    res.setHeader('Content-Type', 'application/json');
                    if (!id) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'Missing article id for deletion' }));
                        return;
                    }
                    const articles = getArticles();
                    const targetArticle = articles.find(item => String(item.id) === String(id));

                    // When deleting a news article, delete all related pictures from assets folder
                    if (targetArticle) {
                        const picturesToDelete = [];
                        if (targetArticle.image) {
                            picturesToDelete.push(targetArticle.image);
                        }
                        if (Array.isArray(targetArticle.relatedImages)) {
                            targetArticle.relatedImages.forEach(item => {
                                if (typeof item === 'string') {
                                    picturesToDelete.push(item);
                                } else if (item && item.url) {
                                    picturesToDelete.push(item.url);
                                }
                            });
                        }
                        const uniquePictures = Array.from(new Set(picturesToDelete));
                        uniquePictures.forEach(picUrl => {
                            deletePictureFromAssets(picUrl);
                        });
                    }

                    const filtered = articles.filter(item => String(item.id) !== String(id));
                    saveArticles(filtered);
                    res.end(JSON.stringify({ success: true, removedId: id, remaining: filtered.length }));
                    return;
                }

                // POST /api/news (Create article)
                if (req.method === 'POST') {
                    parseBody((err, newArticle) => {
                        if (err) {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ error: 'Invalid JSON body' }));
                            return;
                        }
                        const articles = getArticles();
                        const articleWithId = {
                            ...newArticle,
                            id: newArticle.id || Date.now()
                        };
                        const updated = [articleWithId, ...articles];
                        saveArticles(updated);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(articleWithId));
                    });
                    return;
                }

                // PUT /api/news/:id (Update article)
                if (req.method === 'PUT') {
                    parseBody((err, updateData) => {
                        if (err) {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ error: 'Invalid JSON body' }));
                            return;
                        }
                        const targetId = id || updateData.id;
                        const articles = getArticles();
                        const idx = articles.findIndex(a => String(a.id) === String(targetId));
                        if (idx === -1) {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ error: 'Article not found' }));
                            return;
                        }
                        articles[idx] = { ...articles[idx], ...updateData };
                        saveArticles(articles);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(articles[idx]));
                    });
                    return;
                }

                next();
            });
        }
    };
}

export default defineConfig({
    plugins: [react(), newsApiPlugin()],
    server: {
        watch: {
            ignored: ['**/src/data/news.json', '**/src/assets/uploads/**']
        }
    }
});
