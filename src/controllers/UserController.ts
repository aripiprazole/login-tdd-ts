import { Repository } from "typeorm";
import { User } from "@app/entity/User";

import Controller from "./Controller";
import HttpError from "@app/routing/errors/HttpError";

function setupUserController(repository: Repository<User>): Controller {
    return {
        async index(_req, res) {
            const users = await repository.find();

            res.status(200).json(users);
        },
        async store(req, res, next) {
            try {
                const user = repository.create(req.body);

                const anyUser = await repository.save(user);

                console.log("User created.. ", await repository.find());

                res.status(201).json(anyUser);
            } catch (error) {
                next(new HttpError(error.message, 409));
            }
        },
        async update(req, res, next) {
            const { id } = req.params;
            const { check } = req.body;
            try {
                const user = await repository.findOneOrFail(id, {
                    select: ["password"]
                });
                if (user.password === check) {
                    delete req.body.check;
                    try {
                        await repository.update(id, req.body);

                        res.status(200).json(
                            await repository.findOneOrFail(id)
                        );
                    } catch (error) {
                        next(new HttpError(error.message, 409));
                    }
                } else {
                    next(new HttpError("Check password is incorrect", 400));
                }
            } catch (error) {
                next(new HttpError(error.message, 400));
            }
        },
        async show(req, res, next) {
            const { id } = req.params;

            console.log(await repository.find());

            try {
                const user = await repository.findOneOrFail(id);
                res.status(200).json(user);
            } catch (error) {
                next(new HttpError(error.message, 404));
            }
        },
        async delete(req, res, next) {
            const { id } = req.params;
            const { check } = req.body;
            try {
                const user = await repository.findOneOrFail(id, {
                    select: ["password"]
                });
                if (user.password === check) {
                    await repository.delete(id);

                    res.status(200).json({
                        message: "Successfully deleted"
                    });
                } else {
                    next(new HttpError("Check password is incorrect", 400));
                }
            } catch (error) {
                next(new HttpError(error.message, 400));
            }
        }
    };
}

export default setupUserController;
