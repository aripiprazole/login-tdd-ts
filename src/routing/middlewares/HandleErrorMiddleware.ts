import { ErrorRequestHandler } from "express";

import HttpError from "../errors/HttpError";

const handleErrorMiddleware: ErrorRequestHandler = (
    err: HttpError,
    _req,
    res,
    next
) => {
    if (err) {
        res.status(err.status).json(err);
    }
};

export default handleErrorMiddleware;
