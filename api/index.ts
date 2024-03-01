import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import pkg, { Pool, PoolConfig } from 'pg';
import { router } from "./accounts/controller";

dotenv.config();

if (!process.env.PORT) {
  console.log("Could not access port, shutting down application");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// Set up middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/accounts", router);

// Set up server
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});

// Set up database pool
let pool: Pool;
const getDatabasePool = () => {
  if (!pool) {
    const pgConfig: PoolConfig = {
      host: 'localhost',
      port: 5432,
      database: `${process.env.POSTGRES_DB}`,
      user: `${process.env.POSTGRES_USER}`,
      password: `${process.env.POSTGRES_PASSWORD}`,
    };

      initialize(pgConfig)
  }

  return pool;
};

const initialize = (pgDbConfig: PoolConfig) => {
  pool = new pkg.Pool(pgDbConfig);
};

export const dbQuery = async (sql: string, params: (number | string)[]) => {
  try {
      return await getDatabasePool().query(sql, params);
  } catch (error) {
      throw error;
  }
};
