import { render } from "../tools/render.js";
import { getModule } from "../models/modules.js";
import { moduleView } from "../views/module.js";


export function moduleController(ctx) {
    try {
        const { moduleId } = ctx
        const module = getModule(moduleId);
        console.log(module);
        if (!module) {
            const status = 404
            return render(moduleView, { }, status)
        }
        else {
            return render(moduleView, { module }, ctx)
        }
    } catch (error) {
        console.error(error)
    }

}