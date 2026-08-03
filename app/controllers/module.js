import { render } from "../tools/render.js";
import { getModule } from "../models/modules.js";
import { moduleView } from "../views/module.js";


export function moduleController({ moduleId }) {
    try {
        const module = getModule(moduleId);
        console.log(module);
        if (!module) {
            return render(moduleView, { }, 404)
        }
        else {
            return render(moduleView, { module })
        }
    } catch (error) {
        console.error(error)
    }

}