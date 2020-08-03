import IUserRepository from "@modules/user/repositories/IUserRepository";
import ICreateUserDTO from "@modules/user/dtos/ICreateUserDTO";
import User from "@modules/user/models/User";
import BaseRepository from "@shared/infra/knex/BaseRepository";
import IUserExistDTO from "@modules/user/dtos/IUserExistDTO";

export default class UserRepository extends BaseRepository
  implements IUserRepository {
  constructor() {
    super("spotenu_users");
  }

  public async createUser(data: ICreateUserDTO): Promise<void> {
    await this.create(data);
  }

  public async userExist(data: IUserExistDTO): Promise<boolean> {
    const result = await this.find(data);
    return result.length > 0;
  }
}
