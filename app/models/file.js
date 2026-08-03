import { db } from "../tools/db.js";

// File.js to handle file storage and retrieval

// The storeFile method stores the file's contents as purely binary data before
// being inserted into the database.'

export async function storeFile(File) {
    const bytes = await File.bytes();
    const result = db.prepare(`
        INSERT INTO Files (Name, Type, Bytes)
        VALUES (?, ?, ?)
        RETURNING FileID
    `).get(File.Name, File.Type, bytes)
    return result.id
}

// The getFile function reconstructs the File as an object from the stored binary data
// so it can be returned as a response to a client request/query
export function getFile(FileID) {
    const { name, type, bytes } = db.prepare(
        "SELECT * FROM Files WHERE FileID = ?"
    ).get(FileID) || {};
    if (!bytes) return null;

    // Reconstruct a file object with the stored binary data as an array.
    return new File([bytes], name, { type });
}