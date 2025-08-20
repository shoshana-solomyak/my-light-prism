const DEFAULT_HOST = "localhost";

/**
 * Function for constructing mongoDb Uri
 *
 * TODO: implementation for prod - add srv, username & password to URI
 */
export function createMongoDbUri() {
    const {
        MONGO_DB_HOST: host = DEFAULT_HOST,
        MONGO_DB_PORT: port,
        MONGO_DB_NAME: dbName,
    } = process.env;

    return `mongodb://${host}${port ? `:${port}` : ""}/${dbName}`;
}
