import { db } from "../tools/db.js";

// GET METHOD
export function getModules() {
    return db.prepare(`SELECT * FROM Modules`).all();
}

// GET METHOD
export function getProgrammeModulesByID(ProgrammeID) {
    return db.prepare('SELECT Modules.*, Staff.*, ProgrammeModules.* FROM ProgrammeModules JOIN ON Modules JOIN ON Programmes JOIN ON Staff WHERE Programmes.ProgrammeID = ProgrammeModules.ProgrammeID AND Modules.ModuleID = ProgrammeModules.ModuleID AND Modules.ModuleLeaderID = Staff.StaffID AND Programmes.ProgrammeID = (?);').get(ProgrammeID)
}

// GET METHOD
export function getModuleLeaders() {
    return db.prepare("SELECT * FROM Staff JOIN Modules WHERE Staff.StaffID = Modules.ModuleLeaderID").all();
}