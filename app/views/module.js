export function moduleView({ module }) {
    return `
        <section>
            <h2> ${module?.ModuleName} </h2>
            <p> 
                Module ID: ${module?.ModuleID}
            </p>
            <p>
                Module Leader: <a href = "/staff/${module?.ModuleLeaderID}"> ${module?.Name} </a>
            </p>
            <p>
                Description : ${module?.Description}
            </p>
            <a href = "/modules"> Return to modules list </a>
        </section>
    `;
}