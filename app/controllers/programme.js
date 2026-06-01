import { getProgramme } from "../models/programmes.js";
import { render } from "../tools/render.js";
import { programmeView } from "../views/programme.js";

export function programmeController({ programmeId }) {
    const programme = getProgramme(programmeId);
    console.log(programme);
    return render(programmeView, { programme });
};