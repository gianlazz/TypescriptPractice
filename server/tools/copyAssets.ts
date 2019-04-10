import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "src/web/views", "dist/web" );
// Copy face-api.js models to be statically served
shell.cp( "-R", "../models/", "dist/web/" );
// Copy images folder for examples for face-api.js
shell.cp( "-R", "../images/", "dist/web/")