import { render } from "../tools/render.js";
import { homeView } from "../views/home.js";

export function homeController() {
    return render(homeView);
}