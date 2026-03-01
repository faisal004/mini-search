/**
 * Input validation middleware
 */
class Validator {
    static validateSearchQuery(req, res, next) {
        const { q } = req.query;

        // Validate query
        if (!q || typeof q !== 'string' || q.trim().length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Query parameter "q" is required and must be a non-empty string'
            });
        }


        next();
    }


}

export default Validator;