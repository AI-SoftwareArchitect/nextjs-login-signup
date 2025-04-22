import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "crm_secret_key";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};