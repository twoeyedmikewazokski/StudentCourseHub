import { getProgramme } from "../models/programmes.js";
import { render } from "../tools/render.js";
import { programmeView } from "../views/programme.js";
import { notFoundView } from "../views/notFound.js";
import { getPModules } from "../models/programmemodules.js";

export function programmeController({ programmeId }) {
    try {
        const programme = getProgramme(programmeId);
        const programmeModules = getPModules(programmeId);
        console.log(programme);
        console.log(programmeModules)
        if (!programme)
            return render(notFoundView, {}, 404);
        else
            return render(programmeView, { programme, programmeModules });
    } catch (error) {
        console.error(error)
    }
};

