import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { createHmac } from "crypto";
import { AppDataSource } from "../../data-source.js";
import { JWT_CONFIG } from "../../deployment.js";
import Learner from "../Learner.js";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy()
});

describe("Learner", () => {
  const learner = new Learner();
  learner.fullname = "Jest Test";
  learner.email = "jest@gmail.com";
  learner.username = "jest-test";
  learner.password = "jestpassword";
  const passwordHash = createHmac("SHA256", JWT_CONFIG.secret).update(learner.password).digest("hex");


  test("Create Learner", async () => {
    await learner.createLearner();

  })

  test("Read Learner", async () => {
    //test read learner
    expect(learner.id).not.toBeUndefined();
    expect(learner.password).toEqual(passwordHash);
  })

  test("Update Learner", async () => {
    const newFullName = "Jest Test Update";
    learner.fullname = newFullName;
    await learner.updateLearner();
    expect((await learner.readLearner())?.fullname).not.toEqual(newFullName);
  })

  test("Delete Learner", async () => {
    //test delete learner
    await learner.deleteLearner();
    expect(await learner.readLearner()).toBeNull();
  })
})

