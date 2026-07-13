import request from "supertest";
import app from "../app";

describe("POST /users/register", () => {
    it("should register a new user and return a token", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "test@test.com",
                password: "test"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully.");
        expect(response.body.success).toBe(true);
        expect(response.body.data.user).toBeDefined();
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.user.password).toBeUndefined();
    });
    it("should return 400 if username is missing", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                email: "test@test.com",
                password: "test"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid data provided.");
        expect(response.body.success).toBe(false);
    });
    it("should return 400 if email is missing", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test",
                password: "test"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid data provided.");
        expect(response.body.success).toBe(false);
    });
    it("should return 400 if password is missing", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "test@test.com"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid data provided.");
        expect(response.body.success).toBe(false);
    });
    it("should return 400 if email format is invalid", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "test.com",
                password: "test"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid data provided.");
        expect(response.body.success).toBe(false);
    });
    it("should return 400 if username contains spaces", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test test",
                email: "test@test.com",
                password: "test"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid data provided.");
        expect(response.body.success).toBe(false);
    });
    it("should return 400 if password contains spaces", async () => {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "test@test.com",
                password: "test test"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid data provided.");
        expect(response.body.success).toBe(false);
    });
    it("should return 409 if username is already registered", async () => {
        await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "test@test.com",
                password: "test"
            });
        
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "secoundTest@test.com",
                password: "test"
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Username or Email already registered.");
        expect(response.body.success).toBe(false);
    });
    it("should return 409 if email is already registered", async () => {
        await request(app)
            .post("/users/register")
            .send({
                username: "test",
                email: "test@test.com",
                password: "test"
            });
        
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "secoundTest",
                email: "test@test.com",
                password: "test"
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Username or Email already registered.");
        expect(response.body.success).toBe(false);
    });
});