// Import necessary functions from their respective folders.

// import server directory from mapped file server dependencies in deno.json in order to read data on files
import { serveDir } from "@std/http/file-server";
// console.log("Imported server directory from file server dependencies");

import { homeController } from "./controllers/home.js";
import { aboutController } from "./controllers/about.js";
import { notFoundController } from "./controllers/notFound.js";
import { addProgrammeController, programmesController } from "./controllers/programmes.js";
import { programmeController } from "./controllers/programme.js";
import { addSessionController, logoutController, staffLoginFormController } from "./controllers/sessions.js";
import { addStaffController, staffRegistrationFormController } from "./controllers/staff.js";
import { modulesController, addModuleController } from "./controllers/modules.js";
import { moduleController } from "./controllers/module.js";
import { staffListController } from "./controllers/staffList.js";
import { staffProfileController } from "./controllers/staffProfile.js";
import { staffMemberController } from "./controllers/staffMember.js";
import { currentSession, currentUser} from "./tools/staffauth.js";
import { adminController } from "./controllers/admin.js";

// A deno server handler which is necessary to handle dynamic HTML pages instead of static ones only.

export async function serverHandler(request) {
    try {
    // acquire the current session as a constant
    const session = await currentSession(request);
    // New URL object which obtains the URL of our web server
    const url = new URL(request.url);
    // acquire pathname from the URL object
    const pathname = url.pathname;
    // acquire request method GET/POST from the url request
    const method = request.method;
    // Get current user in session
    const user = currentUser(request);
    // new context object which has both request and session
    const ctx = { request, session, user }
    // log every time you fetch files
    console.log(method, url.pathname, url.search);
    // URL Pattern for Programme pages
    const programmeProfilePattern = new URLPattern({ pathname: 
        "/programme/:programmeId"
    });
    // URL Pattern for Module pages
    const moduleProfilePattern = new URLPattern({ pathname:
        "/module/:moduleId"
    });
    // URL Pattern for Staff Profiles
    const staffProfilePattern = new URLPattern({ pathname:
        "/staff/:staffId/profile"
    });
    // URL Pattern for Staff Profiles
    const staffMemberProfilePattern = new URLPattern({ pathname:
        "/staff/:staffId"
    });

   

    // We first handle static files from the assets folder using the imported serveDir function
    // when we start up and request the file server
    if (pathname.startsWith("/assets/")) {
        console.log("Static files fetched");
        return serveDir(request);

    }

    // Server-side handing for dynamic views.
    if (pathname === "/") {
        // console.log("home");
        return homeController(ctx);
    }

    if (pathname === "/about") {
        // console.log("about");
        return aboutController(ctx);
    }

    if (pathname === "/programmes" && method === "GET") {
        // console.log("programmes");
        return programmesController(ctx);
    }

    if (pathname === "/programmes" && method === "POST") {
        // console.log("programmes");
        return addProgrammeController(ctx);
    }

    if (programmeProfilePattern.test(url) && method == "GET") {
        const { programmeId } = programmeProfilePattern.exec(url).pathname.groups;
        // console.log("Programme details loaded successfully")
        return programmeController({ programmeId });
    }

    if (pathname === "/modules" && method == "GET") {
        // console.log("modules")
        return modulesController(ctx)
    }

    if (pathname === "/modules" && method == "POST") {
        // console.log("Creating Module")
        return addModuleController(ctx)
    }

    if (moduleProfilePattern.test(url) && method == "GET") {
        const { moduleId } = moduleProfilePattern.exec(url).pathname.groups;
        // console.log("Module Details successfully loaded")
        return moduleController({ moduleId })
    }

    if (pathname === "/staffauth" && method === "GET") {
        // console.log("Staff Login Form")
        return staffLoginFormController(ctx);
    }

    if (pathname === "/staffregister" && method === "GET") {
        // console.log("Staff Register Form")
        return staffRegistrationFormController(ctx);
    }

    if (pathname === "/staffsessions" && method === "POST") {
        // console.log("Create staff session");
        return addSessionController(ctx);
    }

    if (pathname === "/staffregister" && method === "POST") {
        // console.log("Created user account");
        return addStaffController(ctx);
    }

    if (pathname === "/stafflogout" && method === "POST") {
        // console.log("User logged out");
        return logoutController(ctx);
    }

    if (pathname == "/staff" && method == "GET") {
        // console.log("Staff List");
        return staffListController(ctx);
    }

    if (staffProfilePattern.test(url) && method == "GET") {
        const { staffId } = staffProfilePattern.exec(url).pathname.groups;
        // console.log(`Staff Profile '${ staffId }'`);
        return staffProfileController({ staffId });
    }

    if (staffMemberProfilePattern.test(url) && method == "GET") {
        const { staffId } = staffMemberProfilePattern.exec(url).pathname.groups;
        // console.log(`Loading Staff Member page`);
        return staffMemberController({ staffId });
    }

    if (pathname == "/admin" && method == "GET") {
        // console.log("Getting admin page");
        return adminController(ctx)
    }

    // If no such file can be found if you request a path that does not exist
    else { 
        // console.log("notFound", pathname);
        return notFoundController(ctx);
    }

    } catch (error) {
        console.error(error)
    }

}

