import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { validateSchema, newStaffSchema } from "../tools/validation.js";
import { staffLoginView } from "../views/staffauth.js";
import { login, logout } from "../tools/staffauth.js"
import { validateCredentials } from "../models/staff.js";

export function staffLoginFormController({ request }) {
    return render(staffLoginView, request, 200);
}

export async function addSessionController({ request }) {
    console.log("Adding session")
    const formData = await request.formData()
    const username = formData.get('Username');
    // const password = formData.get('Password');
    // console.log("Username: ", username, "Password: ", password)

    // Validate incoming user form data
    console.log("Validating incoming form data")
    const { isValid, errors, validated } = validateSchema(formData, newStaffSchema);
    if (!isValid) {
        return render(staffLoginView, { errors }, request);
    }

    // Validate credentials
    console.log(`Validating ${username}'s credentials`)
    const {ok, err} = await validateCredentials(validated);
    if (!ok) {
        return render(staffLoginView, {errors: {...err, ...errors}}, request);
    }

    const headers = new Headers();
    login(headers, validated.Username);
    return redirect("/", `logged in as '${validated.Username}'`, headers)
}

export function logoutController({ request }) {
    const headers = new Headers();
    if (session)
        logout(headers, request);
    return redirect("/", "logged out", headers);
}