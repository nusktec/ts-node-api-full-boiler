import { Sequelize } from 'sequelize-typescript';
import process from "process";
import config from "./config";

const con = config[process.env.NODE_ENV!];

const sequelize = new Sequelize({
    ...con['mysql'],
    models: [__dirname + '/../models']  // Adjust to where your models are located
});

export default sequelize;