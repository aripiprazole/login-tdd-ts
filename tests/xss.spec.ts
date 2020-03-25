import { Application } from "express";

import createApp from "@app/app";

import supertest = require("supertest");

describe("XSS Protection tests", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createApp();
        app.post("/xss/test-params/:xss", (req, res) => {
            res.send(req.params || {});
        });
        app.post("/xss/test-query", (req, res) => {
            res.send(req.query || {});
        });
        app.post("/xss/test-body", (req, res) => {
            res.send(req.body || {});
        });
    });

    it("should return nothing when sending xss in params", async () => {
        const xss = `<script> alert("Hello, this is a test."); </script>`;
        const response = await supertest(app).post(`/xss/test-params/${xss}`);

        expect(response.body).toEqual({});
    });

    it("should return what i have sent when not sending xss in params", async () => {
        const notXss = `Hello, this is a test.`;
        const response = await supertest(app).post(
            `/xss/test-params/${notXss}`
        );

        expect(response.body).toEqual({ xss: `Hello, this is a test.` });
    });

    it("should return nothing when sending xss in query", async () => {
        const xss = `<script> alert("Hello, this is a test."); </script>`;
        const response = await supertest(app).post(
            `/xss/test-query/?xss=${xss}`
        );

        expect(response.body).toEqual({ xss: "" });
    });

    it("should return what i have sent when not sending xss in query", async () => {
        const notXss = `Hello, this is a test.`;
        const response = await supertest(app).post(
            `/xss/test-query/?xss=${notXss}`
        );

        expect(response.body).toEqual({ xss: `Hello, this is a test.` });
    });
});
