import * as shell from "shelljs";

// Copy client dist folder to be served statically
shell.cp( "-R", "../client/dist/AngularFrontEnd", "dist/web")