import { ErrorWithCode } from './../interfaces/ErrorWithCode';
import { isEmail } from './../utils/AppUtils';
import UserRepository from "../repositories/user.repository";
import SignUpDto from "../types/dtos/SignUp.dto";
import { cryptoHelper } from "../utils/CryptoHelper";

export default class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async create(params: SignUpDto) {
    const {name, email, password, nickname, registerType } = params;
    //TODO 이메일 중복 체크
    //TODO 닉네임 중복 체크

    const passwordHash = password ? cryptoHelper.bcryptHash(password) : '';

    
  }

  public async loginByEmail() {

  }

  public async loginByNaver() {

  }

  public async checkNicknameDuplication(nickname: string) {
    const hasNickname = this.userRepository.findUserByEmail(nickname);
    if (!!hasNickname) {
      throw new ErrorWithCode('DUPLICATED NICKNAME', '이미 사용 중인 닉네임입니다.')
    }
  }

  public async checkEmailDuplication(email: string) {
    const hasEmail = this.userRepository.findUserByEmail(email);
    if (!!hasEmail) {
      throw new ErrorWithCode('DUPLICATED EMAIL', '이미 사용 중인 이메일입니다.')
    }
  }
}