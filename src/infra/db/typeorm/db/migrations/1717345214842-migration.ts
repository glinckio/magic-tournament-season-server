import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717345214842 implements MigrationInterface {
    name = 'Migration1717345214842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`deckId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deck\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`player\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`deckId\` int NULL, UNIQUE INDEX \`REL_569cc8422548e3f94a22535b61\` (\`deckId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_673081effbabe22d74757339c60\` FOREIGN KEY (\`deckId\`) REFERENCES \`deck\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`player\` ADD CONSTRAINT \`FK_569cc8422548e3f94a22535b615\` FOREIGN KEY (\`deckId\`) REFERENCES \`deck\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`player\` DROP FOREIGN KEY \`FK_569cc8422548e3f94a22535b615\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_673081effbabe22d74757339c60\``);
        await queryRunner.query(`DROP INDEX \`REL_569cc8422548e3f94a22535b61\` ON \`player\``);
        await queryRunner.query(`DROP TABLE \`player\``);
        await queryRunner.query(`DROP TABLE \`deck\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
