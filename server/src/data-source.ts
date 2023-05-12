import { DataSource } from "typeorm";
import { DATABASE_CONFIG } from "./deployment.js";
import { entities } from "./entity/index.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DATABASE_CONFIG.host,
  port: DATABASE_CONFIG.port,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: DATABASE_CONFIG.database,
  synchronize: true, // Change to false once database is created
  logging: true,
  entities: entities, 
  subscribers: [],
  migrations: []
})
