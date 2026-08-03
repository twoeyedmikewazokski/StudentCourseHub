import { db } from "../tools/db.js";
import { hashPassword, verifyPassword } from "../tools/hash.js";

// GET METHOD
// Function to get staffID and names from all staff from the database, ordered by staffID
export function getAllStaffUsers() {
    return db.prepare("SELECT StaffID, Name FROM Staff ORDER BY StaffID").all();
}

// GET METHOD
// Function to get staff user by staffID
export function getStaffById(StaffID) {
    return db.prepare("SELECT * FROM Staff WHERE StaffID = ?").get(StaffID);
}

// GET METHOD
// Function to get staff user by username from database
export function getStaffByUsername(Username) {
    return db.prepare("SELECT * FROM Staff WHERE Username = ?").get(Username);
}

// GET METHOD
// Function to get staffID from staff user by username 
export function getStaffIdByUsername(Username) {
    return db.prepare("SELECT StaffID FROM Staff WHERE Username = ?").get(Username);
}

// GET METHOD
// Function to get roleID from staff user by username
export function getIsAdminByUsername(Username) {
    return db.prepare("SELECT IsAdmin FROM Staff WHERE Username = ?").get(Username);
}

// POST METHOD
// Parameters are wrapped for createStaffUser to pass validated data which will be pass
// as a singular object as a singular argument. Post methods are always asynchronous, not idiocratic and 
// require the run command to add submmited details to the database. 
export async function createStaffUser({Name, Username, Password}) {
    try {
        console.log({Name, Username, Password})
        const PasswordHash = await hashPassword(Password);
        return db.prepare("INSERT INTO Staff (Name, Username, Password) VALUES (?, ?, ?)").run(Name, Username, PasswordHash);
    }
    catch (error) {
        console.error(error)
    }

}

// POST METHOD
// Insert profile picture for a staff member
export function uploadProfilePic(ProfileImageID, StaffID) {
    return db.prepare(`UPDATE Staff (ProfileImageID) VALUES (?) WHERE StaffID = ?`).run(ProfileImageID, StaffID);
}


// POST METHOD
// Validate credentials when submitting details on the staffLoginView
export async function validateCredentials({Username, Password}) {
    const staffUser = getStaffByUsername(Username);
    const ok = staffUser && await verifyPassword(Password, staffUser.Password);
    const err = {
        credentials: !ok && "Problem with username and/or password"
    }
    console.log("User credentials validated")
    return { ok, err };
}