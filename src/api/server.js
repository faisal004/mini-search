import express from 'express';
import cors from 'cors';
import createSearchRouter from './routes/search.js';
import errorHandler from './middleware/errorHandler.js';

/**
 * Create and configure Express server
 */
function createServer(searchEngine) {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Request logging
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });

    // Health check
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API routes
    app.use('/api/search', createSearchRouter(searchEngine));

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: `Route ${req.method} ${req.path} not found`
        });
    });

    // Error handler
    app.use(errorHandler);

    return app;
}

export default createServer;