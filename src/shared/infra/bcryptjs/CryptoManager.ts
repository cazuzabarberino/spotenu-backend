import ICryptoManager from "@shared/utils/ICryptoManager";
import { hash, compare } from "bcryptjs";

export default class CryptoManager implements ICryptoManager {
  public async encrypt(password: string) {
    return await hash(password, 8);
  }

  public async match(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
