import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(
            "JWT secret exists:",
            !!process.env.JWT_SECRET
        );
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {userId: string};

    req.user={
      userId:decoded.userId
    };

    next();
  } catch (error) {
     console.error("JWT ERROR:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};