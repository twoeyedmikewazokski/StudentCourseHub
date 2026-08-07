// The problem with static HTML files is that every file has repeat content such as
// header, nav, main and footer elements which violates the Don't Repeat Yourself Principle
// We use dynamically-rended HTML files which uses a singular template that
// wraps all the pages and use view functions to return unique content for each page of our website.
// Using a singular template in line with the MVC app architecture ensures maintainability and extensibility
// and create a proper separation of concerns. 

import { currentUser } from "./staffauth.js";

//render() function essentially takes a view function as an argument and then calls the view function
//to get the necessary fragment. It then wraps the fragment in HTML boilerplate using template literals (${})
//Finally, it returns an HTML response.

export function render(viewFunction, data = {}, ctx) {
    try {
        const { session, user, status=200 } = ctx
        const content = viewFunction(data);
        console.log({session, user});
        const sessionMessage = session ? `Logged in as ${user.Username}` : "?";
        const authNav = session ? `<form method="POST" action="/stafflogout"><button
            type="submit">Logout</button></form>`
            : `<a href="/staffauth">Sign-in</a>`;
        const adminNav = user?.IsAdmin ? `<a href="/admin"> Admin </a>` : "";
        return new Response(
            `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Student Course Hub</title>
                        <link rel = "icon" href = "/assets/minecraftgrassblock.png">
                        <link rel = "stylesheet" href = "/assets/styles.css">
                    </head>
                    <body>
                        <header>
                        <h1>Course Hub</h1>
                        </header>
                    <nav>
                        <ul>
                            <li><a href = "/"> Home </a></li>
                            <li><a href = "/about"> About </a></li>
                            <li><a href = "/programmes"> Programmes </a></li>
                            <li><a href = "/modules"> Modules </a></li>
                            <li><a href = "/staff"> Staff </a></li>
                            ${adminNav}
                            ${authNav}
                        </ul>
                    </nav>
                    <main>
                        ${content}
                    </main>
                    <footer>
                        <p>${sessionMessage}</p>
                        <p>&copy; 2026 Student Course Hub. All rights reserved.</p>
                    </footer>
                </body>
                </html>`,
                    { headers: {"content-type": "text/html; charset=utf-8"}, status}
                
        );
    } catch (error) {
        console.error(error)
    }
}

