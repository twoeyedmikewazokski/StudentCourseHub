import { db } from "../tools/db.js";
import { hashPassword, verifyPassword } from "../tools/hash.js";

// Function to get user by username from database
export function getStaffByUsername(Username) {
    return db.prepare("SELECT * FROM Staff WHERE Username = ?").get(Username);
}

// Parameters are wrapped for createStaffUser to pass validated data as a singular argument
export async function createStaffUser({Name, Username, Password}) {
    const PasswordHash = await hashPassword(Password);
    return db.prepare("INSERT INTO Staff (Name, Username, Password) VALUES (?, ?, ?)").run({Name, Username, PasswordHash});

}

export async function validateCredentials({Username, Password}) {
    const staffUser = getStaffByUsername(Username);
    const ok = staffUser && await verifyPassword(Password, user.Password);
    const err = {
        credentials: !ok && "Problem with username and/or password"
    }
    console.log("User credentials validated")
    return { ok, err };
}