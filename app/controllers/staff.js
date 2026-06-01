import { createStaffUser } from "../models/staff.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { newStaffSchema, validateSchema } from "../tools/validation.js";
import { staffRegistrationFormView } from "../views/staffauth.js";

export function staffRegistrationFormController({ request }) {
    console.log(request)
    return render(staffRegistrationFormView, {}, 200);
}

export async function addStaffController({ request }) {
    const formData = await request.formData();
    console.log(request);
    // Validate incoming user form data
    const { isValid, errors, validated } = validateSchema(formData, newStaffSchema);
    if (!isValid) {
        return render(staffRegistrationFormView, { errors }, request, 404)
    }
    await createStaffUser(validated);
    const headers = new Headers();
    login (headers, validated.Username);

    return redirect("/", "User created", headers);
}