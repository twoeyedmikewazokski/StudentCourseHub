import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { adminView } from "../views/admin.js";

export function adminController({ request, user }) {
    try {
        console.log("????????")
        console.log({ request, user });
        console.log("????????")
        if (!user) {
            return redirect("/");
        }
        if (!user.IsAdmin == 1) {
            return redirect("/");
        }
        return render(adminView, { request, user }, 200);
    } catch (error) {
        console.error(error)
    }
}