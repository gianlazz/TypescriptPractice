export function envVariablesConfigured() {
    if (
        process.env.PORT
//        && process.env.HOST_URL
        && process.env.ACCESS_TOKEN_SECRET
        && process.env.MODELS_PATH
    ) {
        return true;
    } else {
        return false;
    }
}