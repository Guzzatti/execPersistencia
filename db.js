import * as SQLite from "expo-sqlite";

let db;

const SQL_CREATE = `CREATE TABLE IF NOT EXISTS locations (
id INTEGER PRIMARY KEY autoincrement, latitude varchar(255) NOT NULL,
longitude varchar(255) NOT NULL)`;

function openDB() {
  if (!db) {
    db = SQLite.openDatabaseSync("exemploApp.sqlite");
  }

  db.execSync(SQL_CREATE);
}

export async function getAllLocations() {
  openDB();
  return await db.getAllAsync("SELECT * FROM locations ORDER BY id DESC");
}

export async function insertLocation(data) {
  openDB();
  const params = [data.latitude, data.longitude];
  console.log(params);
  return await db.runAsync(
    "INSERT INTO locations (latitude, longitude) VALUES (?,?)",
    params
  );
}
