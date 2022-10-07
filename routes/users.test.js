const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");

const { connectDB, disconnectDB } = require("../database");

const request = supertest(app);
const dummyUser = new User({
  name: "Test",
  surname: "SuperTest",
  email: "test@supertest.com",
});

let testId = null;

describe("Users Endpoint", () => {
  beforeAll(async () => {
    await connectDB();
    const response = await dummyUser.save();
    testId = response._id.toHexString();
  });

  afterAll(() => {
    disconnectDB();
  });

  it("GET all users", async () => {
    return await request
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              surname: expect.any(String),
              email: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET an user by ID", async () => {
    return await request
      .get(`/users/${testId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: testId,
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
          })
        );
      });
  });

  it("GET a 404 error if not found", async () => {
    const badtestId = "6320d412764e84089ed2700f";
    return await request
      .get(`/users/${badtestId}`)
      .expect("Content-Type", /json/)
      .expect(404);
  });

  it("POST a new user", async () => {
    const testUser = {
      name: "TestName",
      surname: "TestSurname",
      email: "testemail@test.com",
    };
    return await request
      .post("/users")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
          })
        );
      });
  });

  it("Validates new user emails", async () => {
    const badUserEmail = {
      name: "Bad",
      surname: "Man",
      email: "pirippi",
    };
    return await request
      .post("/users")
      .send(badUserEmail)
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
