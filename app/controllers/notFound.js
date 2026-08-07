import { render } from "../tools/render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController(ctx) {
    const { request } = ctx
    const status = 404
    return render(notFoundView, {}, { request, status });
}