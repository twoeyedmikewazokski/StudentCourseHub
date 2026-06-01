// A salt is randomly generated data that is used to make hashed passwords unique and independent from
// eachother especially when users routinely re-use the same password.
// This is to mitigate attacks using pre-computed rainbow tables or database based lookups. 

// For security purposes, this should be randomised everytime and it should be unpredictable.
const secret = "randomdata9320rgskwfwf42fw!"
const options = {
    name: "PBKDF2",
    hash: "SHA-256",
    iterations: 20000,
    // Converts salt from string to binary format.
    salt: new Uint8Array(Array.from(new TextEncoder().encode(secret)))
}

// Hashing passwords is more secure than encrypting them.
// Encryption is two-way as it is possible for the process to be reverse with the right key, as it is one-way, it irreversibly transforms data
// into a unreadable format.
export async function hashPassword(password) {
    //convert input into bytes
    const inputBytes = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey("raw", inputBytes, "PBKDF2", false, ["deriveBits"]);
    const buffer = await crypto.subtle.deriveBits(options, key, 256);
    // convert hashed into hexadecimal
    const padded = Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, 0));
    // return hash digest in hexadecimal and without whitespaces.
    return padded.join("");

}

// Password verification - create a hash of inputted password and check if it's the same hash of the password
// already stored in the system.
export async function verifyPassword(password, storedHash) {
    const candidateHash = await hashPassword(password);
    return candidateHash == storedHash;
}