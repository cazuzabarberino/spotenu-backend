export interface TokenData {
  id: string;
  role: string;
}

export default interface IAuthenticator {
  getToken(data: TokenData): string;
  getData(token: string): TokenData;
}
