import { DataSource } from "typeorm";
import { DATABASE_CONFIG } from "./deployment.js";
import { entities } from "./entity/index.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DATABASE_CONFIG.host,
  port: DATABASE_CONFIG.port,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: "LearnDatabase",
  synchronize: true,
  logging: true,
  entities: entities, 
  subscribers: [],
  migrations: []
})
