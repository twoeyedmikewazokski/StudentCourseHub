export function redirect(location, _flash, headers = new Headers()) {
    headers.set("Location", location)
    const status = 303;
    return new Response(null, {headers, status})
}