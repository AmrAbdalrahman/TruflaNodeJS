import {createConnection, getConnection} from 'typeorm';

const connection = {
    async create() {
        await createConnection();
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        //set TESTING_MODE to true
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
