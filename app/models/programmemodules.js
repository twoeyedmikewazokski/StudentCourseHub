import { db } from "../tools/db.js";

// GET METHOD
// Fetch all programme modules for a specific programme by programmeID
export function getPModules(ProgrammeID) {
    return db.prepare(`SELECT Modules.*, Staff.*, ProgrammeModules.* FROM ProgrammeModules 
        JOIN Modules JOIN Programmes JOIN Staff WHERE Programmes.ProgrammeID = ProgrammeModules.ProgrammeID 
        AND Modules.ModuleID = ProgrammeModules.ModuleID 
        AND Modules.ModuleLeaderID = Staff.StaffID 
        AND Programmes.ProgrammeID = (?)`).get(ProgrammeID);
}