import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUserExistDTO from "../dtos/IUserExistDTO";

export default interface IUserRepository {
  createUser(data: ICreateUserDTO): Promise<void>;
  userExist(data: IUserExistDTO): Promise<boolean>;
}
