import express, {Express} from 'express';
import { noExtendLeft } from 'sequelize/types/lib/operators';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = require('../models').sequelize;
const post = require('../models').Post;
const user = require('../models').User;

const app: Express = express();

app.use(express.json());

export class SignupService {
    userRepository: any;

    constructor() {
        this.userRepository = user;
    }

    async signup(data: {userID: string, password: string}) {
        const password = data.password;
        const hashedPassword = await bcrypt.hash(password, 12)
        const signup = await this.userRepository.create({
            userID: data.userID,
            password: hashedPassword
        });
            return signup
    }

    async signin(data: {userID: string, password:string}) {
        const finduser = await this.userRepository.findOne({ where: { userID: data.userID} })
        const isValidPassword = await bcrypt.compare(data.password, finduser.password);
        if (!isValidPassword) throw new Error('invalid password');
        const token = jwt.sign({userID: finduser.userID}, config.secret);
        return token
    }
}