import { escape } from "@std/html"

function modulesToHTML(module) {
    return `
        <li>
            <a href = "/module/${module.ModuleID}"> ${escape(module.ModuleName)} </a>: ${escape(module.Description)}
        </li>
    `
}

function moduleLeadersToHTML(staff) {
    return `<option value = "${staff.StaffID}"> ${staff.Name} </option>`
}

export function modulesView({ modules, moduleLeaders, errors = {} }) {
    const modulesHTML = modules.map(modulesToHTML).join('')
    const moduleLeadersHTML = moduleLeaders.map(moduleLeadersToHTML).join('')
    return `
        <section>
            <h2> Modules List </h2>
            <form method = "POST" action = "/modules">
                <div>
                    <label for = "ModukeName"> Module Name: </label>
                    <input type = "text" id = "ModuleName" name = "ModuleName" required value ="${errors.ModuleName?.value || ""}">
                    <span class = "error">${errors.ModuleName?.message || ""}</span>
                </div>
                <div>
                    <label for = "Description"> Description: </label>
                    <input type = "text" id = "Description" name = "Description" required value ="${errors.Description?.value || ""}">
                    <span class = "error">${errors.Description?.message || ""}</span>
                </div>
                </div>
                    <label for="ModuleLeaderID"> Module Leader </label>

                    <select id="ModuleLeaderID"
                        name = "ModuleLeaderID"
                        required
                    >
                        <option value="">Choose a Module Leader</option>
                        ${moduleLeadersHTML}

                    </select>
                <div>
                <button type="submit"> Add Module </button>
            </form>
            <p>
            <ul>
                ${modulesHTML}
            <ul>
            </p>
        </section>
    
    `
}