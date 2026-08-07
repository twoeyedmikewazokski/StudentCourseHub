import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { validateSchema, currentStaffSchema } from "../tools/validation.js";
import { staffLoginView } from "../views/staffauth.js";
import { currentSession, login, logout } from "../tools/staffauth.js"
import { getStaffById, getStaffIdByUsername, validateCredentials } from "../models/staff.js";

export function staffLoginFormController(ctx) {
    try {
        const { session } = ctx
        if (session)
            return redirect("/", "User has already logged in")
        return render(staffLoginView, {}, ctx);
    } catch {error} {
        console.error(error)
    }
}

export async function addSessionController(ctx) {
    try {
        console.log("Adding session")
        const { request } = ctx
        const formData = await request.formData()
        const username = formData.get('Username');
        const password = formData.get('Password');
        console.log("Username: ", username, ", Password: ", password)
        const status = 404

        // Validate incoming user form data
        console.log("Validating incoming form data")
        const { isValid, errors, validated } = validateSchema(formData, currentStaffSchema);
        if (!isValid) {
            //console.log({ isValid, errors, validated })
            return render(staffLoginView, { errors }, { request, status });
        }
       

        // Validate credentials
        console.log(`Validating ${username}'s credentials`)
        const {ok, err} = await validateCredentials(validated);
        if (!ok) {
            //console.log({ok, err})
            return render(staffLoginView, { errors: {...err, ...errors}}, { request, status });
        }
        // console.log(validated.Username)

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

export function logoutController(ctx) {
    try {
        //const session = currentSession(request.headers)
        const { session, request } = ctx
        const headers = new Headers();
        if (session)
            logout(headers, request);
        return redirect("/", "logged out", headers);
    } catch (error) {
        console.error(error)
    }
}