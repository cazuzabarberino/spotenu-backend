import AppError from "@shared/error";
import IAuthenticator from "@shared/utils/IAuthenticator";
import ICryptoManager from "@shared/utils/ICryptoManager";
import IIDGenerator from "@shared/utils/IIDGenerator";
import User from "../models/User";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  description?: string;
}

export default class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private cryptoManager: ICryptoManager,
    private idGenerator: IIDGenerator,
    private authenticator: IAuthenticator
  ) {}

  public async execute({
    name,
    username,
    email,
    password,
    role,
    description,
  }: IRequest): Promise<{ user: User; token?: string }> {
    if (!name) throw new AppError("Invalid or missing name", 400);
    if (!username) throw new AppError("Invalid or missing username", 400);
    if (!email) throw new AppError("Invalid or missing email", 400);
    if (!password) throw new AppError("Invalid or missing password", 400);
    if (role === "band" && !description)
      throw new AppError("Invalid or missing description", 400);

    if (await this.userRepository.userExist({ email }))
      throw new AppError("Email already registered", 400);

    if (await this.userRepository.userExist({ username }))
      throw new AppError("Username already registered", 400);

    if (role === "admin") {
      if (password.length < 10)
        throw new AppError("Password must have at least ten characteres", 400);
    } else if (password.length < 6)
      throw new AppError("Password must have at least six characteres", 400);

    const id = this.idGenerator.getId();

    const hashedPassword = await this.cryptoManager.encrypt(password);

    const user = {
      id,
      email,
      name,
      username,
      password: hashedPassword,
      role,
      approved: false,
      description,
    };

    await this.userRepository.createUser(user);

    if (role === "band") return { user };
    else return { user, token: this.authenticator.getToken({ id, role }) };
  }
}
