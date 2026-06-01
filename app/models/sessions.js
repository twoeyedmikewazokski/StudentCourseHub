import { db } from "../tools/db.js";

// POST METHOD
export function createSession(Username) {
    const ID = crypto.randomUUID();
    db.prepare("INSERT into StaffSessions (ID, Username) VALUES (?, ?)").run(ID, Username);
    return id;
}

// GET METHOD
export function getSession(ID) {
    return db.prepare("SELECT * FROM StaffSessions WHERE ID = ?").get(ID);
}

// POST METHOD
export function deleteSession(ID) {
    return db.prepare("DELETE FROM StaffSessions WHERE ID = ?").run(ID);
}