import { Connection } from "typeorm";
import { Router } from "express";
import { User } from "../../entity/User";

import setupController from "../../controllers/AuthenticationController";

function userRoutes(connection: Connection, router: Router) {
    const userController = setupController(connection.getRepository(User));

    router.post("/auth", userController.authenticate);
    router.post("/auth/validate", userController.validate);
    router.delete("/auth", userController.signOut);

    return router;
}

export const baseRoute = "/auth";

export default userRoutes;
