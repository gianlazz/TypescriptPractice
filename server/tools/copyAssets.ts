import * as shell from "shelljs";

// Copy face-api.js models to be statically served
shell.cp( "-R", process.cwd() + "/models/", "dist/web/" );