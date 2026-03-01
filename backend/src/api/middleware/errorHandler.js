/**
 * Global error handler
 */
function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: status === 500 ? 'Internal Server Error' : err.name,
        message: status === 500 ? 'Something went wrong' : message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

export default errorHandler;
