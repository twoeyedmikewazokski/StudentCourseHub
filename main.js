// This is a web project for a dynamically rendered student course hub website in Model-View-Controller app architecture.
// This web project uses the SQLite database, JavaScript handles the business logic such as server routing and rendering,
// HTML displays the content on the web server while CSS dictates how HTML will be displayed and how the UI will appear like.

import { serverHandler } from "./app/server.js"

console.log("Executing main.js")

Deno.serve(serverHandler)


// When you want to add new features to your MVC application, follow this pattern:
// 1. Create a Model (models/new-feature.js)
//  Define functions for database operations
// 2. Create Views (views/new-feature.js)
//  Design the HTML interface
//  Accept data parameters for dynamic content
// 3. Create Controllers (controllers/new-feature.js)
//  Process form data and business logic
//  Coordinate between models and views
// 4. Update Routing (server.js)
//  Import new controller
//  Add routes for the new functionality
//  Handle different paths and HTTP methods appropriately
// This structure makes it easy to add new features while keeping your code
// organized. Each component has a single responsibility, making debugging
// and testing much simpler.
