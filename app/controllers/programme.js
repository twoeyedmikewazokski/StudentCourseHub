import { getProgramme } from "../models/programmes.js";
import { render } from "../tools/render.js";
import { programmeView } from "../views/programme.js";
import { notFoundView } from "../views/notFound.js";

export function programmeController({ programmeId }) {
    try {
        const programme = getProgramme(programmeId);
        console.log(programme);
        if (!programme)
            return render(notFoundView, {}, 404);
        else
            return render(programmeView, { programme });
    } catch (error) {
        console.error(error)
    }
};