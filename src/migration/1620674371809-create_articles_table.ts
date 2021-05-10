import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class createArticlesTable1620674371809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "articles",
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
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "body",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "author_id",
                    type: "bigInt",
                    unsigned: true,
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

        await queryRunner.createIndex("articles", new TableIndex({
            name: "articles_title_index",
            columnNames: ["title"]
        }));

        await queryRunner.createForeignKeys('articles', [
                new TableForeignKey({
                    columnNames: ['author_id'],
                    referencedTableName: 'authors',
                    referencedColumnNames: ['id'],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("articles");
    }

}
