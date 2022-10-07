const supertest = require("supertest");
const Target = require("../models/target");
const app = require("../app");

const { connectDB, disconnectDB } = require("../database");
const request = supertest(app);

const dummyTarget = new Target({
  title: "Test",
  description: "SuperTest",
  days: 10,
});

let testId = null;

describe("Targets Endpoint", () => {
  beforeAll(async () => {
    await connectDB();
    const response = await dummyTarget.save();
    testId = response._id.toHexString();
  });

  afterAll(() => {
    disconnectDB();
  });

  it("GET all targets", async () => {
    return await request
      .get("/targets")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: expect.any(String),
              description: expect.any(String),
              days: expect.any(Number),
            }),
          ])
        );
      });
  });

  it("GET a target by ID", async () => {
    return await request
      .get(`/targets/${testId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: testId,
            title: expect.any(String),
            description: expect.any(String),
            days: expect.any(Number),
          })
        );
      });
  });

  it("POST a new target", async () => {
    const testTarget = {
      title: "TestName",
      description: "TestDescription",
      days: 20,
    };
    return await request
      .post("/targets")
      .send(testTarget)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            days: expect.any(Number),
          })
        );
      });
  });

  it("Validates target days", async () => {
    const badTargetDays = {
      title: "Bad",
      description: "Target",
      days: "pirippi",
    };
    return await request
      .post("/targets")
      .send(badTargetDays)
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
