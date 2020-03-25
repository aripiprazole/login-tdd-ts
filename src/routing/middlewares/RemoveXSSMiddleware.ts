import { RequestHandler } from "express";

import sanitizeHtml from "@app/utils/sanitizeHtml";

const removeXssMiddleware: RequestHandler = (req, _res, next) => {
    Object.keys(req.body).forEach(key => {
        req.body[key] = sanitizeHtml(req.body[key]);
    });
    Object.keys(req.params || {}).forEach(key => {
        req.params[key] = sanitizeHtml(req.params[key]);
    });
    Object.keys(req.query).forEach(key => {
        req.query[key] = sanitizeHtml(req.query[key]);
    });
    next();
};

export default removeXssMiddleware;
