import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
})

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
testConnection();
  
export default sequelize;