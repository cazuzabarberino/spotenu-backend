export default interface ICreateUserDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "band" | "regular" | "premium";
}
