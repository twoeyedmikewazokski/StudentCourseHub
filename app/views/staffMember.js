import { escape } from "@std/html"

function programmesToHTML(programme) {
    return `
        <li>
            <a href = "/programme/${programme.ProgrammeID}"> ${programme.ProgrammeName}</a>
        </li>
    `
}

function modulesToHTML(module) {
    return `
        <li>
            <a href = "/module/${module.ModuleID}"> ${module.ModuleName}</a>
        </li>
    `
}

export function staffMemberView({ staffMember, programmes, modules }) {
    const programmesHTML = programmes.map(programmesToHTML).join('');
    const modulesHTML = modules.map(modulesToHTML).join('');
    return `
        <section>
            <h2> ${escape(staffMember.Name)} </h2>
            <h3> Staff Details: </h3>
            <p>
                StaffID: ${staffMember.StaffID}
            </p>
            <h3> Does Programmes: </h3>
            <ul>
                ${programmesHTML}
            </ul>
            <h3> Does Modules: </h3>   
            <ul>
                ${modulesHTML}
            </ul>
        </section>
    
    `
}