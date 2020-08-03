import CreateUserService from "@modules/user/services/CreateUserService";
import CryptoManager from "@shared/infra/bcryptjs/CryptoManager";
import Authenticator from "@shared/infra/jsonwebtoken/Authenticator";
import IDGenerator from "@shared/infra/uuid/IDGenerator";
import { Request, Response } from "express";
import UserRepository from "../../knex/UserRepository";

export default class UserController {
  public async regularSignUp(req: Request, res: Response) {
    const { name, username, email, password } = req.body;

    const createUserService = new CreateUserService(
      new UserRepository(),
      new CryptoManager(),
      new IDGenerator(),
      new Authenticator()
    );

    const response = await createUserService.execute({
      name,
      username,
      email,
      password,
    });

    res.json(response);
  }
}
