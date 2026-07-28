import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { validateSchema, currentStaffSchema } from "../tools/validation.js";
import { staffLoginView } from "../views/staffauth.js";
import { currentSession, login, logout } from "../tools/staffauth.js"
import { getStaffIdByUsername, validateCredentials } from "../models/staff.js";

export function staffLoginFormController({ request }) {
    try {
        return render(staffLoginView, request, 200);
    } catch {error} {
        console.error(error)
    }
}

export async function addSessionController({ request }) {
    try {
        console.log("Adding session")
        const formData = await request.formData()
        const username = formData.get('Username');
        const password = formData.get('Password');
        console.log("Username: ", username, ", Password: ", password)

        // Validate incoming user form data
        console.log("Validating incoming form data")
        const { isValid, errors, validated } = validateSchema(formData, currentStaffSchema);
        if (!isValid) {
            console.log("error")
            return render(staffLoginView, { errors }, 400);
        }
        console.log({ isValid, errors, validated })

        // Validate credentials
        console.log(`Validating ${username}'s credentials`)
        const {ok, err} = await validateCredentials(validated);
        if (!ok) {
            return render(staffLoginView, { errors: {...err, ...errors}}, 400);
        }
        console.log({ok, err})
        console.log(validated.Username)

        // Create session with headers and staffID
        const headers = new Headers();
        const staffID = getStaffIdByUsername(validated.Username)
        console.log(staffID)
        login(headers, staffID);
        return redirect("/", `logged in as '${validated.Username}'`, headers);
    } catch (error) {
        console.error(error)
    }
}

export function logoutController({ request }) {
    try {
        const session = currentSession(request.headers)
        const headers = new Headers();
        if (session)
            logout(headers, request);
        return redirect("/", "logged out", headers);
    } catch (error) {
        console.error(error)
    }
}