import { Request, Response } from "express";
import CreateUserService from "@modules/user/services/CreateUserService";
import UserRepository from "../../knex/UserRepository";

export default class UserController {
  public async signUp(req: Request, res: Response) {
    const { name, username, email, password, role } = req.body;

    const createUserService = new CreateUserService(new UserRepository());

    const user = await createUserService.execute({
      name,
      username,
      email,
      password,
      role,
    });

    res.json(user);
  }
}
