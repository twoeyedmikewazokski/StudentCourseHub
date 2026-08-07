import { getProgramme } from "../models/programmes.js";
import { render } from "../tools/render.js";
import { programmeView } from "../views/programme.js";
import { notFoundView } from "../views/notFound.js";
import { getPModules } from "../models/programmemodules.js";

export function programmeController(ctx) {
    try {
        const { programmeId } = ctx
        const programme = getProgramme(programmeId);
        const programmeModules = getPModules(programmeId);
        console.log(programme);
        console.log(programmeModules)
        if (!programme) {
            const status = 404
            return render(notFoundView, {}, { status });
        } else {
            return render(programmeView, { programme, programmeModules }, ctx);
        }
    } catch (error) {
        console.error(error)
    }
};

