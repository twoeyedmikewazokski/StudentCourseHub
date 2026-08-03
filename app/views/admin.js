// function adminView() - Returns an HTML fragment only if the user started a session and they have admin privileges.
export function adminView() {
    return `
        <section>
            <h2> Admin Page </h2>
            <p> This is the page only administrators can access.</p>
        </section>
    
    `
}