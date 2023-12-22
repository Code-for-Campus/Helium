import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const schema = {};

export * from "drizzle-orm";

const connection = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_TOKEN,
});

export const db = drizzle(connection, { schema });
