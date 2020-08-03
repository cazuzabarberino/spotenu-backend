import IAuthenticator, { TokenData } from "@shared/utils/IAuthenticator";
import jwt from "jsonwebtoken";
import AppError from "../../error";

export default class Authenticator implements IAuthenticator {
  public getToken(data: TokenData) {
    return jwt.sign(data, process.env.JWT_KEY as string, { expiresIn: "1d" });
  }

  public getData(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);

      console.log(payload);

      return payload as TokenData;
    } catch (err) {
      throw new AppError("Invalid JWT token", 401);
    }
  }
}
