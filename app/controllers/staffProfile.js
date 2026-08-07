import { getFile, storeFile } from "../models/file.js";
import { getStaffById } from "../models/staff.js";

// This function controller retrieves the staff member, finds their profile image
// and returns the image with the correct content-type and content-size headers so the browser know it's 
// an image.
export function staffProfileController(ctx) {
    const { staffId } = ctx
    const staff = getStaffById(staffId);

    if (!staff || !staff.ProfileImageID) {
        // const placeholderProfile = storeFile("assets/placeholderprofile.png")
        
        return new Response("Not Found", { status: 404 });
    }

    const file = getFile(staff.ProfileImageID);
    if (!file) {
        return new Response("Not Found", { status: 404 });
    }

    return new Response(file)
}