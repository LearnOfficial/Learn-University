import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { AppDataSource } from "../../data-source.js";
import Learner from "../Learner.js";

beforeAll(async()=> {
  await AppDataSource.initialize();
});

afterAll(async() => {
  await AppDataSource.destroy()
});

describe("Student", () => {
  test("Create Student", () => {
    expect(async() => {
      const learnerTest = new Learner();
      learnerTest.name = "Jest Test";
      learnerTest.username = "jest-test"
      learnerTest.password = "jest";
      const studentRepo = AppDataSource.getRepository(Learner);
      await studentRepo.save(learnerTest);
    })
  })
})

