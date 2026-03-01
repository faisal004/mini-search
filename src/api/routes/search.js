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



    return router;
}

export default createSearchRouter;