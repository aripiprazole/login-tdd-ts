import "reflect-metadata";

import { Application } from "express";
import { Connection } from "typeorm";
import { Router } from "express";

import { createConnection } from "typeorm";

import dotenv from "dotenv";
import Express from "express";
import Fs from "fs";
import handleErrorMiddleware from "./routing/middlewares/HandleErrorMiddleware";
import Logger from "./utils/Logger";
import removeXssMiddleware from "./routing/middlewares/RemoveXSSMiddleware";
import User from "./entity/User";

dotenv.config();

export const appSecret = process.env.SECRET;

const readDir = async (directory: string) => {
    return new Promise<string[]>((resolve, reject) => {
        Fs.readdir(directory, (error, files) => {
            if (error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    });
};

interface RoutesAndMiddlewaresOptions {
    verbose?: boolean;
}

async function loadRoutesAndMiddlewares(
    app: Application,
    connection: Connection,
    routes: Promise<RouteModule>[],
    { verbose }: RoutesAndMiddlewaresOptions
) {
    app.use(Express.json());
    app.use(removeXssMiddleware);
    try {
        const loadedRoutes = await Promise.all(routes);
        const promiseRoutes = loadedRoutes.map(route => {
            console.log("Registering route");
            return async () => {
                const { baseRoute, default: moduleDefault } = route;
                app.use(moduleDefault(await createConnection(), Router()));
                if (verbose) {
                    Logger.info("Registered", baseRoute);
                }
            };
        });

        promiseRoutes.forEach(async route => {
            await route();
        });
    } catch (error) {
        if (verbose) {
            Logger.error("Couldn't register a route", error);
        }
    }
    app.use(handleErrorMiddleware);
}

interface RouteModule {
    baseRoute?: string;
    default: RouteHandler;
}

type RouteHandler = (connection: Connection, router: Router) => Router;

async function loadRoutesDir(directory: string) {
    const files = await readDir(directory);
    const unloadedRoutes = files.map(async file => {
        const filePath = `${directory}/${file}`;
        const routeModule: RouteModule = await import(filePath);

        return {
            baseRoute: routeModule.baseRoute || file,
            default: routeModule.default
        };
    });
    return unloadedRoutes;
}

export default async function createApp(
    verbose: boolean = false
): Promise<Application> {
    const connection = await createConnection();
    const app = Express();

    const routesDir = __dirname + "/routing/routes";

    const routes = await loadRoutesDir(routesDir);

    await loadRoutesAndMiddlewares(app, connection, routes, { verbose });

    if (verbose) {
        Logger.info("Server successfully created");
    }

    return app;
}
