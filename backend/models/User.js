import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      followerCount: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      connectionCount: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
}, {
    tableName: 'users',  
    timestamps: false,
});

export default User;