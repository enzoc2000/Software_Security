import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET non definito");
  process.exit(1);
}

export interface jwtPayload {
  userId: number;
  role: string;
}

// Estendi Request “in-place” (non serve un tipo separato per la firma)
declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
    role?: string;
  }
}
// Qui usiamo esattamente la signature RequestHandler
export const authMiddleware: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token mancante o malformato" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwtPayload;
    // Qui scrivo direttamente su req.userId e req.role
    req.userId = payload.userId;
    req.role   = payload.role;
    next();
  } catch {
    res.status(401).json({ message: "Token non valido o scaduto" });
    return;
  }
};