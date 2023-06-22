require("dotenv").config();
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: true,
  }
);

const basename = path.basename(__filename);

const modelDefiners: Function[] = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => {
  model(sequelize);
});

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

const models = Object.fromEntries(capsEntries);

const { Product, Mark, User } = models;

const exporter = {
  ...models,
  conn: sequelize,
};

export default exporter;
