import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configurando a conexão com o banco (arquivo .env)
export const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        dialect: 'mysql',
        //parseInt para transformar string da porta em number
        port: parseInt(process.env.MYSQL_PORT as string)
    }
);