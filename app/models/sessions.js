import { db } from "../tools/db.js";

// POST METHOD
export function createSession(StaffID) {
    const SessionID = crypto.randomUUID();
    db.prepare("INSERT into StaffSessions (SessionID, StaffID) VALUES (?, ?)").run(SessionID, StaffID);
    return SessionID;
}

// GET METHOD
export function getSession(SessionID) {
    return db.prepare("SELECT * FROM StaffSessions WHERE SessionID = ?").get(SessionID);
}

// POST METHOD
export function deleteSession(SessionID) {
    return db.prepare("DELETE FROM StaffSessions WHERE SessionID = ?").run({ SessionID });
}