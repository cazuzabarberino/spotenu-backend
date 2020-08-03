import { TokenData } from "@shared/utils/IAuthenticator";

declare global {
  namespace Express {
    interface Request {
      user: TokenData;
    }
  }
}
