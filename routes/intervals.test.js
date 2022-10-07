const supertest = require("supertest");
const Interval = require("../models/interval");
const app = require("../app");

const { connectDB, disconnectDB } = require("../database");
const request = supertest(app);

const dummyInterval = new Interval({
  owner: "631c8c9694ebae7ccb8258b9",
  startdate: "2022-10-01",
  enddate: "2022-10-10",
});

let testId = null;

describe("Intervals Endpoint", () => {
  beforeAll(async () => {
    await connectDB();
    const response = await dummyInterval.save();
    testId = response._id.toHexString();
  });

  afterAll(() => {
    disconnectDB();
  });

  it("GET all intervals", async () => {
    return await request
      .get("/intervals")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              owner: expect.any(String),
              startdate: expect.any(String),
              enddate: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET an interval by ID", async () => {
    return await request
      .get(`/intervals/${testId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            owner: expect.any(String),
            startdate: expect.any(String),
            enddate: expect.any(String),
          })
        );
      });
  });

  it("POST a new interval", async () => {
    const testInterval = {
      owner: "631c8c9694ebae7ccb8258b9",
      startdate: "2022-09-15",
      enddate: "2022-09-20",
    };
    return await request
      .post("/intervals")
      .send(testInterval)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            owner: expect.any(String),
            startdate: expect.any(String),
            enddate: expect.any(String),
          })
        );
      });
  });

  it("Validates correct ISO date", async () => {
    const badIntervalDateFormat = {
      owner: "631c8c9694ebae7ccb8258b9",
      startdate: "12/07/2025",
      enddate: "15/07/2027",
    };
    return await request
      .post("/intervals")
      .send(badIntervalDateFormat)
      .expect("Content-Type", /json/)
      .expect(400);
  });

  //need to test search endpoint and patch endpoint, about date control
});
