import { db } from "../tools/db.js";

// GET METHOD
export function getModules() {
    return db.prepare(`SELECT * FROM Modules`).all();
}

// GET METHOD
export function getModule(ModuleID) {
    return db.prepare("SELECT * FROM Modules JOIN Staff WHERE Modules.ModuleLeaderID = Staff.StaffID AND ModuleID = ?").get(ModuleID)
}

// GET METHOD
export function getModuleByName(ModuleName) {
    return db.prepare(`SELECT * FROM Modules WHERE ModuleName = ?`).get(ModuleName);
}

// GET METHOD
export function getModuleLeaders() {
    return db.prepare("SELECT * FROM Staff JOIN Modules WHERE Staff.StaffID = Modules.ModuleLeaderID").all();
}

// GET Method
export function getModulesByModuleLeaderID(ModuleLeaderID) {
    return db.prepare("SELECT * FROM Modules JOIN Staff WHERE Modules.ModuleLeaderID = Staff.StaffID AND ModuleLeaderID = ?").all(ModuleLeaderID)
}

// POST METHOD
export function createModule({ ModuleName, Description, ModuleLeaderID }) {
    return db.prepare("INSERT INTO Modules (ModuleName, Description, ModuleLeaderID) VALUES (?, ?, ?)").run(ModuleName, Description, ModuleLeaderID);
}