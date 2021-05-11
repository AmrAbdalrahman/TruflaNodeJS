import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class createCommentsTable1620722701966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
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
                    name: "comment",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "bigInt",
                    unsigned: true,
                    isNullable: false
                },
                {
                    name: "article_id",
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

        await queryRunner.createForeignKeys('comments', [
                new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedTableName: 'authors',
                    referencedColumnNames: ['id'],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }),
                new TableForeignKey({
                    columnNames: ['article_id'],
                    referencedTableName: 'articles',
                    referencedColumnNames: ['id'],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments");
    }

}
