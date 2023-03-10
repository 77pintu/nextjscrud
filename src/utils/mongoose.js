import { connect, connection } from "mongoose";

const conn = { isConnected: false };
export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect("mongodb://127.0.0.1/taskCrudApp");
  // mongodb://127.0.0.1/schooldb
  conn.isConnected = db.connections[0].readyState;
  // to display the database name below line of the code.
  //   console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
  console.log("connection successful");
});
connection.on("error", (error) => {
  console.log("connection error", error.message);
});
