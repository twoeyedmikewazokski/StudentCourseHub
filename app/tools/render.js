//render() function essentially takes a view function as an argument and then calls the view function
//to get the necessary fragment. It then wraps the fragment in HTML boilerplate using template literals (${})
//Finally, it returns an HTML response.

export function render(viewFunction, data, status) {
    try {
        const content = viewFunction(data);
        // const sessionMessage = data ? `Logged in as ${data.username}` : "";
        // const authNav = data ? `<form method="POST" action="/stafflogout"><button
        //     type="submit">Logout</button></form>`
        //     : `<a href="/staffauth">Sign-in</a>`;
        console.log("HTML rendered")
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
                            <li><a href = "/staffauth"> Sign-in </a></li>
                        </ul>
                    </nav>
                    <main>
                        ${content}
                    </main>
                    <footer>
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

