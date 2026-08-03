import { escape } from "@std/html";

export function staffView({ staff = [] }) {
    const staffHTML = staff.map(member => `
        <article class = "staff-member">
        <figure>
            <img
                src = "/staff/${member.StaffID}/profile"
                alt = "${escape(member.Name)}"
                loading = "lazy"
            >
        <figcaption>
            <h3><a href = "/staff/${member.StaffID}"> ${member.Name} </a></h3>
        </figcaption>
        </figure>
        </article>

    `).join('');
    return `
        <h2> Staff Directory </h2>

        <section class = "staff-grid">
            ${staffHTML}
        </section>
    
    `
}