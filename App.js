import { SQLiteProvider } from "expo-sqlite";
import UserForm from "./components/Userform";
import UserList from "./components/UserList";
import { useState } from "react";


export default function App() {

  const [needsRefresh, setNeedsRefresh] = useState(false);
  // This flag is used to trigger a refresh in the UserList component
  // Whenever a new user is added or deleted, the UserList will re-fech the data
  return (
    <SQLiteProvider
    databaseName="userDatabase.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL
          );
          PRAGMA journal_mode=WAL;
          `);
        }}
        options={{useNewConnection: false}}
     >
        <UserForm onSuccess={() => setNeedsRefresh(prev => !prev)} />
        <UserList needsRefresh={needsRefresh} />
    </SQLiteProvider>
  );
}


