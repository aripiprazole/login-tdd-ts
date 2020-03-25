import { Application } from "express";
import { User } from "@app/entity/User";

import createApp from "@app/app";
import supertest from "supertest";
import truncateTable from "@app/utils/truncate";

describe("Users tests", () => {
    let app: Application;

    const defaultUserData = {
        name: "Lorenzo",
        email: "lorenzooguimaraes@gmail.com",
        password: "123123"
    };

    const createUser = async (userData: object = defaultUserData) => {
        return await supertest(app)
            .post("/users")
            .send(userData);
    };

    const updateUser = async (
        id: number,
        userData: object = defaultUserData
    ) => {
        return await supertest(app)
            .put(`/users/${id}`)
            .send(userData);
    };

    const deleteUser = async (id: number, check: string) => {
        return await supertest(app)
            .delete(`/users/${id}`)
            .send({ check });
    };

    const getUsers = async () => {
        return await supertest(app)
            .get("/users")
            .send();
    };

    const getUser = async (id: number) => {
        return await supertest(app)
            .get(`/users/${id}`)
            .send();
    };

    beforeAll(async done => {
        app = await createApp(true);
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

    it("should get all users", async () => {
        const response = await getUsers();

        expect(response.status).toBe(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    it("should show an user", async () => {
        const user = await createUser();

        expect(user.status).toBe(201);

        const response = await getUser(1);

        expect(response.body).toEqual({
            ...response.body,
            id: 1,
            name: "Lorenzo",
            email: "lorenzooguimaraes@gmail.com"
        });

        expect(response.status).toBe(200);
    });

    it("should not show an inexistent user", async () => {
        const response = await getUser(2);

        expect(response.status).toBe(404);
    });

    it("should create a new user with email that never used before", async () => {
        const response = await createUser();

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            ...response.body,
            id: 1,
            name: "Lorenzo",
            email: "lorenzooguimaraes@gmail.com"
        });
    });

    it("should not create a new user with email that was used before", async () => {
        await createUser();

        const secondUserResponse = await createUser();

        expect(secondUserResponse.status).toBe(409);
    });

    it("should update an user email with correct password", async () => {
        await createUser();

        const response = await updateUser(1, {
            check: "123123",
            email: "lorenzete@gmail.com"
        });

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            ...response.body,
            id: 1,
            name: "Lorenzo",
            email: "lorenzete@gmail.com"
        });
    });

    it("should not update an user with incorrect password", async () => {
        await createUser();

        const response = await updateUser(1, {
            check: "incorrect",
            email: "lorenzete@gmail.com"
        });

        expect(response.status).toBe(400);
    });

    it("should not update an user with same email of another user", async () => {
        await createUser();
        await createUser({
            name: "Lorenzo",
            email: "lorenzete@gmail.com",
            password: "123123"
        });

        const response = await updateUser(1, {
            check: "123123",
            email: "lorenzete@gmail.com"
        });

        expect(response.status).toBe(409);
    });

    it("should not update an inexistent user", async () => {
        await createUser();

        const response = await updateUser(2, {
            check: "incorrect",
            email: "lorenzete@gmail.com"
        });

        expect(response.status).toBe(400);
    });

    it("should delete an account with correct password", async () => {
        await createUser();

        const response = await deleteUser(1, "123123");

        expect(response.status).toBe(200);
    });

    it("should not delete an user with incorrect password", async () => {
        await createUser();

        const response = await deleteUser(1, "incorrect");

        expect(response.status).toBe(400);
    });

    it("should not delete an inexistent user", async () => {
        await createUser();

        const response = await deleteUser(2, "incorrect");

        expect(response.status).toBe(400);
    });
});
