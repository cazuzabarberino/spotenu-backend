import ICreateUserDTO from "../dtos/ICreateUserDTO";

export default interface IUserRepository {
  createUser(data: ICreateUserDTO): Promise<void>;
}
