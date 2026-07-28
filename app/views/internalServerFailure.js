// function serverFailureView() - Returns a HTML rendered fragment if an internal server failure occurs
export function serverFailureView() {
    return `
        <!DOCTYPE HTML>
        </html>
            <title> Internal Server Error 500 </title>
        <head>
        </head>
        <body>
            <h2> Internal Server Error 500 <h2>
            <p> Sorry, the server encountered an unexpected condition that prevented it from fulfilling this request. <p>
            <a href = "/"> Try returning to home page </a>
        </body>
        <html>

    `;
}