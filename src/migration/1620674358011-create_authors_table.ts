import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class createAuthorsTable1620674358011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "authors",
            columns: [
                {
                    name: "id",
                    type: "bigInt",
                    isPrimary: true,
                    unsigned: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "job_title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: 'created_at',
                    default: 'now()',
                    type: 'timestamp',
                },
                {
                    name: 'updated_at',
                    default: 'now()',
                    type: 'timestamp',
                },
            ]
        }), true);

        await queryRunner.createIndex("authors", new TableIndex({
            name: "authors_name_index",
            columnNames: ["name"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authors");
    }

}
