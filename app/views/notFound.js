// function notFoundView() - Returns a HTML rendered fragment if a page has not been found in the file server
export function notFoundView() {
    return `
        <h2> Page not found <h2>
        <p> Sorry, the page that you are looking for does not exist <p>
        <a href = "/"> Return to home page </a>
    `
}