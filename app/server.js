// Import necessary functions from their respective folders.

// import server directory from mapped file server dependencies in deno.json in order to read data on files
import { serveDir } from "@std/http/file-server";
console.log("Imported server directory from file server dependencies");

import { homeController } from "./controllers/home.js";
import { aboutController } from "./controllers/about.js";
import { notFoundController } from "./controllers/notFound.js";
import { addProgrammeController, programmesController } from "./controllers/programmes.js";
import { programmeController } from "./controllers/programme.js";
import { addSessionController, logoutController, staffLoginFormController } from "./controllers/sessions.js";
import { addStaffController, staffRegistrationFormController } from "./controllers/staff.js";
import { serverFailureView } from "./views/internalServerFailure.js";

// A deno server handler which is necessary to handle dynamic HTML pages instead of static ones only.

export function serverHandler(request) {
    try {
    // New URL object which obtains the URL of our web server
    const url = new URL(request.url);
    // acquire pathname from the URL object
    const pathname = url.pathname;
    // acquire request method GET/POST from the url request
    const method = request.method;
    // log every time you fetch files
    console.log(method, url.pathname, url.search);
    // URL Pattern for Programme
    const programmeProfilePattern = new URLPattern({ pathname: 
        "/programme/:programmeId"
    });

    // We first handle static files from the assets folder using the imported serveDir function
    // when we start up and request the file server
    if (pathname.startsWith("/assets/")) {
        console.log("Static files fetched");
        return serveDir(request);

    }

    // Server-side handing for dynamic views.
    if (pathname === "/") {
        console.log("home");
        return homeController();
    }

    if (pathname === "/about") {
        console.log("about");
        return aboutController();
    }

    if (pathname === "/programmes" && method === "GET") {
        console.log("programmes");
        return programmesController({ request });
    }

    if (pathname === "/programmes" && method === "POST") {
        console.log("programmes");
        return addProgrammeController({ request });
    }

    if (programmeProfilePattern.test(url) && method == "GET") {
        const { programmeId } = programmeProfilePattern.exec(url).pathname.groups;
        console.log("Programme details loaded successfully")
        return programmeController({ programmeId });
    }

    if (pathname === "/staffauth" && method === "GET") {
        console.log("Staff Login Form")
        return staffLoginFormController({ request });
    }

    if (pathname === "/staffregister" && method === "GET") {
        console.log("Staff Register Form")
        return staffRegistrationFormController({ request });
    }

    if (pathname === "/staffsessions" && method === "POST") {
        console.log("Create staff session");
        return addSessionController({ request });
    }

    if (pathname === "/staffregister" && method === "POST") {
        console.log("Created user account");
        return addStaffController({ request });
    }

    if (pathname === "/stafflogout" && method === "POST") {
        console.log("User logged out");
        return logoutController({ request });
    }

    // If no such file can be found if you request a path that does not exist
    else { 
        console.log("notFound", pathname);
        console.debug(request)
        return notFoundController();
    }

    } catch (error) {
        console.error(error)
    }

}

