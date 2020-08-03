import IUserRepository from "../repositories/IUserRepository";
import AppError from "@shared/error";
import User from "../models/User";

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "band" | "regular" | "premium";
}

export default class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({
    name,
    username,
    email,
    password,
    role,
  }: IRequest): Promise<User> {
    if (!name) throw new AppError("Invalid or missing name", 400);
    if (!username) throw new AppError("Invalid or missing username", 400);
    if (!email) throw new AppError("Invalid or missing email", 400);
    if (!password) throw new AppError("Invalid or missing password", 400);
    if (
      !role ||
      (role !== "admin" &&
        role !== "band" &&
        role !== "premium" &&
        role !== "regular")
    )
      throw new AppError("Invalid or missing role", 400);

    const id = "lol";

    const user = {
      id,
      email,
      name,
      username,
      password,
      role,
      approved: false,
    };

    await this.userRepository.createUser(user);

    return user;
  }
}