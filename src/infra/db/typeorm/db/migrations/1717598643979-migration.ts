import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717598643979 implements MigrationInterface {
    name = 'Migration1717598643979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cardId\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`colors\` varchar(255) NOT NULL, \`deckId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deck\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL DEFAULT '', \`playerId\` int NULL, UNIQUE INDEX \`REL_fcd3a7bc021f6846ffe6e6fbfb\` (\`playerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`player\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`deckId\` int NULL, UNIQUE INDEX \`REL_569cc8422548e3f94a22535b61\` (\`deckId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tournament\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`startsAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tournament_player\` (\`id\` int NOT NULL AUTO_INCREMENT, \`playerId\` int NULL, \`tournamentId\` int NULL, UNIQUE INDEX \`REL_99a59c3d1bb85fa68e974b02e2\` (\`playerId\`), UNIQUE INDEX \`REL_e6d2fd1531abe3de6fd8212d88\` (\`tournamentId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_673081effbabe22d74757339c60\` FOREIGN KEY (\`deckId\`) REFERENCES \`deck\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deck\` ADD CONSTRAINT \`FK_fcd3a7bc021f6846ffe6e6fbfb7\` FOREIGN KEY (\`playerId\`) REFERENCES \`player\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`player\` ADD CONSTRAINT \`FK_569cc8422548e3f94a22535b615\` FOREIGN KEY (\`deckId\`) REFERENCES \`deck\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tournament_player\` ADD CONSTRAINT \`FK_99a59c3d1bb85fa68e974b02e2d\` FOREIGN KEY (\`playerId\`) REFERENCES \`player\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tournament_player\` ADD CONSTRAINT \`FK_e6d2fd1531abe3de6fd8212d882\` FOREIGN KEY (\`tournamentId\`) REFERENCES \`tournament\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tournament_player\` DROP FOREIGN KEY \`FK_e6d2fd1531abe3de6fd8212d882\``);
        await queryRunner.query(`ALTER TABLE \`tournament_player\` DROP FOREIGN KEY \`FK_99a59c3d1bb85fa68e974b02e2d\``);
        await queryRunner.query(`ALTER TABLE \`player\` DROP FOREIGN KEY \`FK_569cc8422548e3f94a22535b615\``);
        await queryRunner.query(`ALTER TABLE \`deck\` DROP FOREIGN KEY \`FK_fcd3a7bc021f6846ffe6e6fbfb7\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_673081effbabe22d74757339c60\``);
        await queryRunner.query(`DROP INDEX \`REL_e6d2fd1531abe3de6fd8212d88\` ON \`tournament_player\``);
        await queryRunner.query(`DROP INDEX \`REL_99a59c3d1bb85fa68e974b02e2\` ON \`tournament_player\``);
        await queryRunner.query(`DROP TABLE \`tournament_player\``);
        await queryRunner.query(`DROP TABLE \`tournament\``);
        await queryRunner.query(`DROP INDEX \`REL_569cc8422548e3f94a22535b61\` ON \`player\``);
        await queryRunner.query(`DROP TABLE \`player\``);
        await queryRunner.query(`DROP INDEX \`REL_fcd3a7bc021f6846ffe6e6fbfb\` ON \`deck\``);
        await queryRunner.query(`DROP TABLE \`deck\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
