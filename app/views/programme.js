import { escape } from "@std/html";

function programmeModulesToHTML(programmeModules) {
    return `
        <li>
            <a href = "/module/${programmeModules.ProgrammeID}"> ${escape(programmeModules.ModuleName)} </a>: ${escape(programmeModules.Description)}
        </li>
    `
}

export function programmeView({ programme, programmeModules }) {
    const programmeModulesHTML = programmeModules.map(programmeModulesToHTML).join('');
    return `
        <section>
            <h2> ${programme?.ProgrammeName} </h2>
            <p> 
                Programme ID: ${programme?.ProgrammeID}
            </p>
            <p> 
                Level: ${programme?.LevelID}
            </p>
            <p>
                Programme Leader: <a href = "/staff/${programme?.ProgrammeLeaderID}"> ${programme?.Name} </a>
            </p>
            <p>
                Description : ${programme?.Description}
            </p>
            <ul>
                ${programmeModulesHTML}
            </ul>
            <a href = "/programmes"> Return to programmes list </a>
        </section>
    `;
}