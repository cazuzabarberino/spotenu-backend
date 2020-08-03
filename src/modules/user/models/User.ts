export default interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "band" | "regular" | "premium";
  approved: boolean;
}
