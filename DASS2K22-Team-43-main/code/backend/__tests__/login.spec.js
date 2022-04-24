const server = require("../server");
const supertest = require("supertest");
const { it, expect } = require("@jest/globals");
const requestWithSupertest = supertest(server);

describe("Test Suite", () => {
    it("Test Registration", async () => {
        // const response = await requestWithSupertest.get("/");
        // expect(response.status).toBe(200);
        const res = await requestWithSupertest.post("/register").send({
            name: "TestSpinner",
            email: "testSpinner@gmail.com",
            password: "abc123",
            contact_no: "9876543210",
            address: "Bakul Nivas 209",
            type: "spinner"
        });
        expect(res.status).toEqual(200);
    });

    it("Test Login", async () => {
        const res = await requestWithSupertest.post("/login").send({
            email: "FinalSpinner1@gmail.com",
            password: "YWJjMTIz"
        });
        expect(res.status).toEqual(200);
    });

    it("Testing Weaver", async () => {
        const res = await requestWithSupertest
            .get("/weaver")
        //   .set("authorization", token);
        expect(res.status).toEqual(200);
    });

    it("Testing Spinner", async () => {
        const res = await requestWithSupertest
            .get("/spinner")
        //   .set("authorization", token);
        expect(res.status).toEqual(200);
    });

    it("Testing Dyer", async () => {
        const res = await requestWithSupertest
            .get("/dyer")
        //   .set("authorization", token);
        expect(res.status).toEqual(200);
    });

    it("Testing Fabric Details", async () => {
        const res = await requestWithSupertest
            .get("/fabric/6265296001c76f9c5ba2978a")
        //   .set("authorization", token);
        expect(res.status).toEqual(200);
    });

    it("Testing Yarn Package Details", async () => {
        const res = await requestWithSupertest
            .get("/yarnPackage")
        //   .set("authorization", token);
        expect(res.status).toEqual(200);
    });

});