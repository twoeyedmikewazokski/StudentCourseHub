import { render } from "../tools/render.js";
import { aboutView } from "../views/about.js";

export function aboutController() {
    return render(aboutView);
}