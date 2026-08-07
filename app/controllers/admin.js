import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { adminView } from "../views/admin.js";

export function adminController(ctx) {
    try {
        const { request, user } = ctx
        if (!user) {
            return redirect("/", "Access to Admin Panel forbidden");
        }
        if (user.IsAdmin != 1) {
            return redirect("/", "Access to Admin Panel forbidden");
        }
        return render(adminView, {}, ctx);
    } catch (error) {
        console.error(error)
    }
}