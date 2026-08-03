// Programme Model as part of the MVC app architecture which encapsulates 
// data of the database and handles business logic

import { db } from "../tools/db.js";

// Prepared or parameterised statement separate SQL code from data and pre-compiles it
// so that the database treats user input as literal form data not executable SQL code so
// that the malicious SQL input is treated as another harmless string

// Wihtout parameterised and prepared statements, SQL injection and XSS attacks can exploit
// form input to compromise user credentials, sensitive informations, modify or even destroy your entire database
// and cause denial of service.

// GET METHOD
export function getProgrammes() {
    return db.prepare(`SELECT * FROM Programmes`).all();
}

// GET METHOD 
export function getProgramme(ProgrammeID) {
    return db.prepare("SELECT * FROM Programmes JOIN Staff WHERE Programmes.ProgrammeLeaderID = Staff.StaffID AND Programmes.ProgrammeID = ?").get(ProgrammeID);
}

// GET METHOD 
export function getProgrammeByName(ProgrammeName) {
    return db.prepare("SELECT * FROM Programmes WHERE ProgrammeName = ?").get(ProgrammeName);
}


// GET METHOD 
export function getProgrammeByLevel(ProgrammeID) {
    return db.prepare("SELECT * FROM Programmes WHERE LevelID = ?").get(ProgrammeID);
}

// GET METHOD
export function getProgrammeLeaders() {
    return db.prepare("SELECT * FROM Staff JOIN Programmes WHERE Staff.StaffID = Programmes.ProgrammeLeaderID").all()
}

// GET Method
export function getProgrammesByProgrammeLeaderID(ProgrammeLeaderID) {
    return db.prepare("SELECT * FROM Programmes JOIN Staff WHERE Programmes.ProgrammeLeaderID = Staff.StaffID AND ProgrammeLeaderID = ?").all(ProgrammeLeaderID)
}

// POST METHOD 
export function createProgramme({ProgrammeName, Description, ProgrammeLeaderID}, LevelID) {
    return db.prepare(`INSERT INTO Programmes (ProgrammeName, Description, ProgrammeLeaderID, LevelID) VALUES (?, ?, ?, ?)`).run(ProgrammeName, Description, ProgrammeLeaderID, LevelID);
}

// POST METHOD
export function removeProgramme(ProgrammeID) {
    return db.prepare(`DELETE FROM Programmes WHERE ProgrammeID = ?`).run(ProgrammeID)
}

// Unprepared statement
// export function addItem(name, description) {
//     const query = `INSERT INTO items (name, description) VALUES ('${name}', '${description}')`;
//     db.exec(query)
// }

// Malicious SQL queries
// '); DELETE FROM programmes; --
// '); DROP TABLE programmes; -- crashes your database for fun

// Data exfilration SQL injection to leak all item names from the database
// ', (SELECT GROUP_CONCAT(name) FROM programmes), '

// Bypass validation and escalate priviledges if you  had a users table
// `admin'); UPDATE users SET role='admin' WHERE id=1; --`

// Database enumeration SQL to reveal all table names in your database
// ') UNION SELECT name FROM sqlite_master WHERE type='table';--

// <script>alert('XSS Attack!')</script>
// <img src=x onerror=alert('XSS')> - more dangerous instance of XSS attack
