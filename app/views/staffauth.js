import { escape } from "@std/html"

// POST method to process staff details at /Sessions page
export function staffLoginView({ errors = {} }) {
    return `<section class="center">
        <h2>Sign in</h2>
            <p>
            Don't have an account?
            <a href="/staffregister">Sign up here</a>
        </p>
        <form action="/StaffSessions" method="POST" class="fancy">
            <span class="error">${errors.credentials || ""}</span>
            <label for="Username">Username: </label>
            <input type="text" id="Username" name="Username"
            value="${errors.Username?.value || ""}" required>
            <span class="error">${errors.Username?.message || ""}</span>
            <label for="Password">Password: </label>
            <input type="password" id="Password" name="Password"
            value="${errors.Password?.value || ""}" required>
            <span class="error">${errors.Password?.message || ""}</span>
        <button>Sign in</button>
        </form>
    </section>`
}

// POST method to process staff details at /Staff page
export function staffRegistrationFormView({ errors = {} }) {
    return `
    <section class="center">
        <h2>Create an account</h2>
        <p>
            Already have an account?
            <a href="/staffauth">Sign in here</a>
        </p>
        <form action="/Staff" method="POST" class="fancy">
            <label for="Name"> Name: </label>
            <input type="text" id="Name" name="Name"
            value="${errors.Name?.value || ""}" required>
            <span class="error">${errors.Name?.message || ""}</span>
            <label for="Username">Username: </label>
            <input type="text" id="Username" name="Username"
            value="${errors.Username?.value || ""}" required>
            <span class="error">${errors.Username?.message || ""}</span>
            <label for="Password">Password: </label>
            <input type="password" id="Password" name="Password"
            value="${errors.Password?.value || ""}" required>
            <span class="error">${errors.Password?.message || ""}</span>
            <label for="confirm">Confirm password: </label>
            <input type="password" id="confirm">
            <button>register</button>
        </form>
    </section>`
}