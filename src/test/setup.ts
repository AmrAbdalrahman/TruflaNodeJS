import {Connection, createConnection, getConnection, getConnectionManager, getConnectionOptions} from 'typeorm';

const connection = {
    async create() {
        let connection: Connection;

        if (!getConnectionManager().has('default')) {
            const connectionOptions = await getConnectionOptions();
            connection = await createConnection(connectionOptions);
        } else {
            connection = await getConnection();
        }
        return connection;
        //await createConnection();
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        const entityDeletionPromises = entities.map((entity) => async () => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
        await Promise.all(entityDeletionPromises);
    },
};

beforeAll(async () => {
    await connection.create();
});

afterAll(async () => {
    await connection.close();
});

beforeEach(async () => {
    await connection.clear();
});
