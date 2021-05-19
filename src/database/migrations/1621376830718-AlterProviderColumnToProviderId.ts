import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderColumnToProviderId1621376830718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('appointments', 'provider',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }));

        await queryRunner.createForeignKey('appointments',
            new TableForeignKey({
                name: 'ProviderUser',
                columnNames: ["provider_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'ProviderUser');

        await queryRunner.changeColumn('appointments', 'provider_id',
            new TableColumn({
                name: 'provider',
                type: 'varchar'
            }));
    }

}


