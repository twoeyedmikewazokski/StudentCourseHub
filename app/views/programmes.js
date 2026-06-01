import { escape } from "@std/html"

// We need a models for programmes so that we can export data from the database
// and initalise in our programmes view.

// It is paramount that we escape user input before sending queries to the database
// and displaying it on HTML to prevent cross-site scripting attacks.

// Escaping: 
// - " becomes "&quot;"
// - & becomes "&amp;"
// - ' becomes "&#x27;"
// -  < becomes "&lt;"
// - > becomes "&gt;"

// Cross-site scripting attacks happens when user input is displayed as HTML without proper
// escaping which can lead to injection of malicious HTML scripts that executes in other user's browsers
// which leads to session hijacking, data theft and other dangerous attacks.

function programmesToHTML(programme) {
    return `
        <li>
            <a href = "/programme/${programme.ProgrammeID} "> ${escape(programme.ProgrammeName)} </a>: ${escape(programme.Description)}
        </li>
    `
}

export function programmesView({ programmes, errors = {} }) {
    const programmesHTML = programmes.map(programmesToHTML).join('');
    console.log("Programmes List initalised")
    // console.log(programmesHTML)
    return `
        <section>
            <h2> Course list </h2>
            <form method = "POST" action = "/programmes">
                <div>
                    <label for = "ProgrammeName"> Programme Name: </label>
                    <input type = "text" id = "ProgrammeName" name = "ProgrammeName" required value ="${errors.ProgrammeName?.value || ""}">
                    <span class = "error">${errors.ProgrammeName?.message || ""}</span>
                </div>
                <div>
                    <label for = "Description"> Description: </label>
                    <input type = "text" id = "Description" name = "Description" required value ="${errors.Description?.value || ""}">
                    <span class = "error">${errors.Description?.message || ""}</span>
                </div>
                <button type="submit"> Add Programme </button>
            </form>
            <ul>
                ${programmesHTML}
            </ul>
        </section>
    `
}