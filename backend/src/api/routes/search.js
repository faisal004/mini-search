import Validator from "../middleware/validator.js";
import express from "express";
const router = express.Router();

function createSearchRouter(searchEngine) {

    router.get('/', Validator.validateSearchQuery, (req, res) => {
        try {
            const { q } = req.query;

            const results = searchEngine.search(q);

            res.json({
                success: true,
                data: results
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });



    router.get('/naive', Validator.validateSearchQuery, (req, res) => {
        try {
            const { q } = req.query;
            const queryLower = q.toLowerCase();

            const allDocs = Array.from(searchEngine.index.documents.values());
            const hits = [];

            allDocs.forEach(doc => {
                const title = doc.getField('title') || "";
                const desc = doc.getField('description') || "";

                if (title.toLowerCase().includes(queryLower) || desc.toLowerCase().includes(queryLower)) {
                    hits.push({
                        docId: doc.id,
                        score: 0,
                        document: doc
                    });
                }
            });

            res.json({
                success: true,
                data: {
                    total: hits.length,
                    hits: hits
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    return router;
}

export default createSearchRouter;