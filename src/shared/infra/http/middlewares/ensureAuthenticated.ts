import { Request, Response, NextFunction } from "express";
import AppError from "../../../error";
import Authenticator from "@shared/infra/jsonwebtoken/Authenticator";

interface Permissions {
  [key: string]: boolean | undefined;
  admin?: boolean;
  regular?: boolean;
  premium?: boolean;
  band?: boolean;
}

const ensureAuthenticated = (
  permission: Permissions = {
    admin: true,
    regular: true,
    premium: true,
    band: true,
  }
) => (request: Request, response: Response, next: NextFunction): void => {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("JWT token is missing.", 401);

  const authenticator = new Authenticator();

  const data = authenticator.getData(authHeader);

  if (!permission[data.role]) throw new AppError("Unauthorized", 401);

  request.user = data;

  return next();
};

export default ensureAuthenticated;
