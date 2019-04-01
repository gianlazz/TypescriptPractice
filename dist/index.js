"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const app = express_1.default();
const typeorm_1 = require("typeorm");
const sessionAuth = __importStar(require("./middleware/sessionAuth"));
const routes = __importStar(require("./routes"));
// Configure Express to parse incoming JSON data
app.use(express_1.default.json());
// initialize configuration
dotenv_1.default.config();
// port is now available to the Node.js runtime
// as if it were an enviroment variable
const port = process.env.SERVER_PORT;
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// Configure Express to serve static files in the public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Configure session auth
sessionAuth.register(app);
// Configure routes
routes.register(app);
// Create connection to database with TypeORM ormconfig.json
typeorm_1.createConnection()
    .then((connection) => {
    // Here you can start working with your entities
    // tslint:disable-next-line:no-console
    console.log("Connected to database with TypeORM.");
})
    .catch((error) => {
    // tslint:disable-next-line:no-console
    console.log(error);
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map