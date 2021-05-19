import { Request, Response, NextFunction, json } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw Error('Token not provided');
    // return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    return next();
  } catch (err) {
    throw Error('Invalid token!');
    // return res.status(401).json({ "error": "Invalid token!" });
  }
}