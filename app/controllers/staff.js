import { createStaffUser, getStaffIdByUsername } from "../models/staff.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { newStaffSchema, validateSchema } from "../tools/validation.js";
import { staffRegistrationFormView } from "../views/staffauth.js";
import { login } from "../tools/staffauth.js";

export function staffRegistrationFormController(ctx) {
    try {
        const { request } = ctx
        console.log(request)
        return render(staffRegistrationFormView, {}, ctx);
    } catch (error) {
        console.error(error)
    }
}

export async function addStaffController(ctx) {
    try {
        const { request } = ctx
        const formData = await request.formData();
        console.log(request);
        // Validate incoming user form data
        const { isValid, errors, validated } = validateSchema(formData, newStaffSchema);
        if (!isValid) {
            const status = 404
            return render(staffRegistrationFormView, { errors }, { request, status})
        }
        console.log({ isValid, errors, validated })
        await createStaffUser(validated);
        const headers = new Headers();
        const staffID = getStaffIdByUsername(validated.Username)
        console.log(headers, staffID)
        login(headers, staffID);

        return redirect("/", "User created", headers);
    } catch (error) {
        console.error(error)
    }
}