import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "src/web/views", "dist/web" );
// Copy face-api.js models to be statically served
shell.cp( "-R", "../models/", "dist/web/" );
// Copy client dist folder to be served statically
shell.cp( "-R", "../client/dist/AngularFrontEnd", "dist/web")