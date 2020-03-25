import { Application } from "express";

import createApp from "@app/app";
import truncateTable from "@app/utils/truncate";
import User from "@app/entity/User";

import supertest = require("supertest");

describe("Auth tests", () => {
    let app: Application;

    const defaultUserData = {
        name: "Lorenzo",
        email: "lorenzooguimaraes@gmail.com",
        password: "123123"
    };

    const createUser = async (userData: object = defaultUserData) => {
        return supertest(app)
            .post("/users")
            .send(userData);
    };

    beforeAll(async done => {
        app = await createApp();
        done();
    });

    afterEach(async done => {
        await truncateTable(User);
        done();
    });

    beforeEach(async done => {
        await truncateTable(User);
        done();
    });

    it("should authenticate with valid credentials", async () => {
        const user = await createUser();

        console.log(user.body);

        expect(user.status).toBe(201);

        const response = await supertest(app)
            .post("/auth")
            .send({
                email: defaultUserData.email,
                password: defaultUserData.password
            });

        expect(response.status).toBe(200);
    });
});
