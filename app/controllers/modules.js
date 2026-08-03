import { getModuleLeaders, getModules, createModule } from "../models/modules.js";
import { getAllStaffUsers } from "../models/staff.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { newModuleSchema, validateSchema } from "../tools/validation.js";
import { modulesView } from "../views/modules.js"

export function modulesController() {
    try {
        const modules = getModules();
        const moduleLeaders = getAllStaffUsers();
        console.log(modules)
        // console.log(moduleLeaders)
        return render(modulesView, { modules, moduleLeaders });
        
    } catch (error) {
        console.error(error);
    }
}

export async function addModuleController({ request }) {
    try {
        // Parse form data from the POST request
        const formData = await request.formData();

        // Validate form data with our validation schema
        const { isValid, errors, validated } = validateSchema(formData, newModuleSchema);

        // Checks if the form data passes all validation methods and return exception if it is not the case
        if (!isValid) {
            const modules = getModules();
            const moduleLeaders = getAllStaffUsers();
            return render(modulesView, { modules, moduleLeaders, errors }, 400)
        }
        console.log({ isValid, errors, validated })

        // Create new module and initialise with validated details
        await createModule(validated)
        return redirect("/modules")

    } catch (error) {
        console.error(error);
    }
}