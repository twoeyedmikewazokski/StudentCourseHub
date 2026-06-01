import { createProgramme, getProgrammes } from "../models/programmes.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { newProgrammeSchema, validateSchema } from "../tools/validation.js";
import { programmesView } from "../views/programmes.js";

export function programmesController() {
    const programmes = getProgrammes();
    console.log(programmes)
    return render(programmesView, { programmes });
}

export async function addProgrammeController({ request }) {
    // Parse form data from POST request
    const formData = await request.formData();
    // Validate programme form data
    const { isValid, errors, validated } = validateSchema(formData, newProgrammeSchema);
    
    if (!isValid) {
        const programmes = getProgrammes();
        return render(programmesView, {programmes, errors}, 400);
    }

    // const pname = formData.get("ProgrammeName");
    // const pdescription = formData.get("Description");
    // createProgramme(pname, pdescription);

    createProgramme(validated);
    return redirect("/programmes")

}