import { ErrorWithCode } from "./../interfaces/ErrorWithCode";
import UserRepository from "../repositories/user.repository";
import SignUpDto from "../types/dtos/SignUp.dto";
import { cryptoHelper } from "../utils/CryptoHelper";

export default class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async create(params: SignUpDto) {
    const { name, email, password, nickname, registerType } = params;
    await this.checkNicknameDuplication(nickname);
    await this.checkEmailDuplication(email);

    console.log("asdasdjdlkajsldkjlaskdalskdla");
    const passwordHash = cryptoHelper.bcryptHash(password);
    const newUser = await this.userRepository.createUser({
      name,
      nickname,
      email,
      passwordHash,
      registerType,
    });
    const jwt = cryptoHelper.encodeJwt({ id: newUser.id });
    return jwt;
  }

  public async loginByEmail(params: { email: string; password: string }) {
    const { email, password } = params;
    const user = await this.userRepository.findUserByEmail(email, true);
    if (!user) throw new ErrorWithCode("NOT REGISTERED EMAIL", "회원정보를 바르게 입력해주세요.");
    if (cryptoHelper.compareBcryptHash(password, user.passwordHash)) {
      return cryptoHelper.encodeJwt({ id: user.id });
    } else {
      throw new ErrorWithCode("INVALID PASSWORD", "회원정보를 바르게 입력해주세요.");
    }
  }

  //TODO 작업 필요
  public async loginByNaver(params: { accessToken: string }) {
    return { jwt: "", isNew: 0, email: "" };
  }

  public async checkNicknameDuplication(nickname: string) {
    const hasNickname = await this.userRepository.findUserByNickname(nickname);
    console.log(hasNickname, "asdasdasdasdsadasdasdasdasdasd");
    if (!!hasNickname) {
      throw new ErrorWithCode("DUPLICATED NICKNAME", "이미 사용 중인 닉네임입니다.");
    }
  }

  public async checkEmailDuplication(email: string) {
    const hasEmail = await this.userRepository.findUserByEmail(email);
    if (!!hasEmail) {
      throw new ErrorWithCode("DUPLICATED EMAIL", "이미 사용 중인 이메일입니다.");
    }
  }
}
