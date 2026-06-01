// Import databate from SQLite which is a self-contained efficient database engine that does not require
// another server to run it.
import { Database } from "@db/sqlite";

// create and export new db object which will be our file server database
export const db = new Database("webapp.db");
