import dotenv from "dotenv";
import * as path from "path";

//TODO: create a constant file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

await new Promise((resolve, reject) => {
  const env = dotenv.config({
    path: path.resolve(".env-dev"),
  });

  const error = env.error;
  if(error){
    reject(error);
  }else{
    resolve(env);
  }
});


const env = process.env;
console.log(env);

const DATABASE_CONFIG = {
  port: parseInt(env?.DB_PORT as string),
  host: env?.DB_HOST,
  username: env?.DB_USERNAME,
  password: env?.DB_PASSWORD,
  database: env?.DB_DATABASE
}

const JWT_CONFIG = {
  secret: env?.JWT_SECRET as string
}

export {
  DATABASE_CONFIG,
  JWT_CONFIG
};
