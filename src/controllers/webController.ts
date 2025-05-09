/**
 Author: Revelation.AF
 Git: nusktec
 **/
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';
import {Model_User} from '../models/Model_User';
import {HttpStatusCode} from "../interfaces/system";
import {outJson} from "../utils/renders";

export const index = async (req: Request, res: Response): Promise<void> => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  res.status(HttpStatusCode.OK).json(outJson(true, "Welcome Index", {code: "XXXXXX"}));
  return; // Ensure we return after sending a response
 }
};