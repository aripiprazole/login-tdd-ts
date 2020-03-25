import { Repository } from "typeorm";
import { RequestHandler } from "express";
import { User } from "@app/entity/User";

import { appSecret } from "@app/app";

import jwt from "jsonwebtoken";
import Logger from "@app/utils/Logger";

interface AuthController {
    authenticate: RequestHandler;
    signOut: RequestHandler;
    validate: RequestHandler;
}

function setupAuthController(repository: Repository<User>): AuthController {
    return {
        async authenticate(req, res) {
            const { email } = req.body;

            console.log(await repository.find());

            const user = await repository.findOneOrFail({
                where: {
                    email
                }
            });

            const payload = {
                id: user.id
            };

            const token = await jwt.sign(payload, appSecret, {
                algorithm: "HS256",
                expiresIn: "15 days"
            });

            res.send({ token });
        },
        async signOut(req, res, next) {},
        async validate(req, res, next) {}
    };
}

export default setupAuthController;
