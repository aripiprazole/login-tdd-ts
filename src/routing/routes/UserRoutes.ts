import { Connection } from "typeorm";
import { Router } from "express";
import { User } from "../../entity/User";

import setupUserController from "../../controllers/UserController";

function userRoutes(connection: Connection, router: Router) {
    const userController = setupUserController(connection.getRepository(User));

    router.get("/users", userController.index);
    router.post("/users", userController.store);
    router.get("/users/:id", userController.show);
    router.put("/users/:id", userController.update);
    router.delete("/users/:id", userController.delete);

    return router;
}

export const baseRoute = "/users";

export default userRoutes;
