import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from "./sequelize.js";

export type ConversationI = {
  id: number;
  toId: string;
  fromId: string;
  text: string;
  ts: number;
};

const Conversation = sequelize.define('Conversation', {
  toId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fromId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ts: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
}, {
});

export default Conversation;