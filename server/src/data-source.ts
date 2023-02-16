import { DataSource } from "typeorm";
import { DATABASE_CONFIG } from "./deployment.js";
import Learner from "./entity/Learner.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DATABASE_CONFIG.host,
  port: 3306,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: "LearnDatabase",
  synchronize: true,
  logging: true,
  entities: [Learner],
  subscribers: [],
  migrations: []
})
