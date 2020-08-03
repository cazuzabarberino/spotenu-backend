export default interface ICryptoManager {
  encrypt(password: string): Promise<string>;
  match(password: string, hashedPassword: string): Promise<boolean>;
}
