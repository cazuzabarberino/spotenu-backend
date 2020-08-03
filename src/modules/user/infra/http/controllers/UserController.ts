import CreateUserService from "@modules/user/services/CreateUserService";
import CryptoManager from "@shared/infra/bcryptjs/CryptoManager";
import Authenticator from "@shared/infra/jsonwebtoken/Authenticator";
import IDGenerator from "@shared/infra/uuid/IDGenerator";
import { Request, Response } from "express";
import UserRepository from "../../knex/UserRepository";
import AppError from "@shared/error";

export default class UserController {
  public async regularSignUp(request: Request, response: Response) {
    const { name, username, email, password } = request.body;

    const createUserService = new CreateUserService(
      new UserRepository(),
      new CryptoManager(),
      new IDGenerator(),
      new Authenticator()
    );

    const serviceResponse = await createUserService.execute({
      name,
      username,
      email,
      password,
      role: "regular",
    });

    response.json(serviceResponse);
  }

  public async adminSignUp(request: Request, response: Response) {
    const { name, username, email, password } = request.body;

    if (request.user.role !== "admin") throw new AppError("Unauthorized", 401);

    const createUserService = new CreateUserService(
      new UserRepository(),
      new CryptoManager(),
      new IDGenerator(),
      new Authenticator()
    );

    const serviceResponse = await createUserService.execute({
      name,
      username,
      email,
      password,
      role: "admin",
    });

    response.json(serviceResponse);
  }
}
