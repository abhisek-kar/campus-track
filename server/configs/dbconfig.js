import mysql from "mysql2";

// Creating the connection pool

let connectDB = async () => {
  // create the pool
  const pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db",
  });
  // now get a Promise wrapped instance of that pool
  const db = pool.promise();

  return db;
};

export default connectDB;
