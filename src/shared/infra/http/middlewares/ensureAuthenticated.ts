import { Request, Response, NextFunction } from "express";
import AppError from "../../../error";
import Authenticator from "@shared/infra/jsonwebtoken/Authenticator";

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("JWT token is missing.", 401);

  const authenticator = new Authenticator();

  const data = authenticator.getData(authHeader);

  request.user = data;

  return next();
}
