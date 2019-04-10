import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "src/web/views", "dist/web" );
shell.cp( "-R", "models/", "dist/web/models" );