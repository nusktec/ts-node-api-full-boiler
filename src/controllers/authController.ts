import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { Model_User } from '../models/Model_User';
import {outJson} from "../utils/renders";
import {PrintDebug, RandomAscii} from "../utils/tools";
import {HttpStatusCode} from "../interfaces/system";
import {Model_EmailVerification} from "../models/Model_EmailVerification";
import {EmailCategoryEnum, SendMail} from "../services/emailService";
import {EmailTemplate_SEND_OTP} from "../services/template/emailTemplates";

export const register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(404).json(outJson(true, "Validation error", { errors: errors.array() }));
        return; // Ensure we return after sending a response
    }

    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Model_User.create({ email, password: hashedPassword, name });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '90d' });
        res.status(201).json(outJson(true, "Created successfully", { token, userId: user.id }));
    } catch (error) {
        res.status(500).json(outJson(false, "Server error", {code: null}));
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(outJson(true, "Email sent successfully", { errors: errors.array() }));
        return; // Ensure we return after sending a response
    }

    const { email, password } = req.body;

    try {
        const user = await Model_User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json(outJson(false, "User not found !", {}));
            return; // Ensure we return after sending a response
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json(outJson(false, "Invalid Credential", {}));
            return; // Ensure we return after sending a response
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json(outJson(false, "Server error", {code: null}));
    }
};

export const sendOtpEmail = async (req: Request, res: Response): Promise<void> => {
    //start email verifications by sending just an otp
    try{
        const {email} = req.body
        const CODE_6 = RandomAscii(6)
        //push to database
        const [pushEmail, status] = await Model_EmailVerification.findOrCreate({where: {email}, defaults: {email, code: CODE_6}})
        if(pushEmail){
            //blind operations, send email
            SendMail(EmailCategoryEnum.GENERAL, "OTP REQUEST", email.split("@")[0], EmailTemplate_SEND_OTP(CODE_6), email)
            await pushEmail.update({code: CODE_6})
            res.status(HttpStatusCode.OK).json(outJson(true, "Email sent successfully", {code: "XXXXXX"}));
        }else{
            res.status(HttpStatusCode.BAD_REQUEST).json(outJson(false, "Failed sending OTP, confirm email and try again", {code: "XXXXXX"}));
        }
    }catch (e) {
        PrintDebug(e)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(outJson(false, "An error has occur...500ET", null));
    }
};