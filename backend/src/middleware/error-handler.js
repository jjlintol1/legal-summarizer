const { CustomAPIError } = require("../errors");

const { StatusCodes } = require("http-status-codes");

function errorHandlerMiddleware(err, req, res, next) {
    if (err instanceof CustomAPIError) {
        res.status(err.statusCode).json({
            message: err.message
        });
    } else {
        console.log(err);
        const statusCode = err.status || 500;
        res.status(statusCode).json({
            message: err
        });
    }
}

module.exports = errorHandlerMiddleware;