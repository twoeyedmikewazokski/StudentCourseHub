export function programmeView({ programme }) {
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
                Programme Leader: ${programme?.Name}
            </p>
            <p>
                Description : ${programme?.Description}
            </p>
            <a href = "/programmes"> Return to programmes list </a>
        </section>
    `;
}

        // ProgrammeID INTEGER PRIMARY KEY AUTOINCREMENT,
        // ProgrammeName TEXT NOT NULL,
        // LevelID INTEGER,
        // ProgrammeLeaderID INTEGER,
        // Description TEXT,
        // Image BLOB,