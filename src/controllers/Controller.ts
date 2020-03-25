import Express from "express";

interface Controller {
    index: Express.RequestHandler;
    store: Express.RequestHandler;
    update: Express.RequestHandler;
    show: Express.RequestHandler;
    delete: Express.RequestHandler;
}
export default Controller;
