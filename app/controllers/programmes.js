import { createProgramme, getProgrammes } from "../models/programmes.js";
import { getAllStaffUsers } from "../models/staff.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { getProgrammeLevelID, newProgrammeSchema, validateSchema} from "../tools/validation.js";
import { programmesView } from "../views/programmes.js";

// Programmme controller for displaying all programmes from the database in a list view
export function programmesController(ctx) {
    try {
        // Call programmes using getProgrammes model method
        const programmes = getProgrammes();
        const programmeLeaders = getAllStaffUsers();
        console.log(programmes)
        console.log(programmeLeaders)
        // Return programmesView populated with programmes and programme leaders through the render function
        return render(programmesView, { programmes, programmeLeaders }, ctx);
    } catch (error) {
        console.error(error)
    }
}

// Programme controller to add Programme by submitting details through a form using a POST method.
export async function addProgrammeController(ctx) {
    try {
        const { request } = ctx
        // Parse form data from POST request
        const formData = await request.formData();
        // const pname = formData.get("ProgrammeName");
        // const pdescription = formData.get("Description");
        // createProgramme(pname, pdescription);
        // Validate programme form data
        const { isValid, errors, validated } = validateSchema(formData, newProgrammeSchema); 
        
        // Check if form data passes all validation methods when it gets passed to a validation schema
        if (!isValid) {
            const programmes = getProgrammes();
            const programmeLeaders = getAllStaffUsers();
            const status = 400
            return render(programmesView, { programmes, programmeLeaders, errors }, { request, status });
        }
        console.log({ isValid, errors, validated })

        const LevelID = getProgrammeLevelID(validated.ProgrammeName)
        console.log(LevelID)

        await createProgramme(validated, LevelID);
        return redirect("/programmes")
    } catch (error) {
        console.error(error)
    }
}