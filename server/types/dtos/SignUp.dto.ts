import { RegisterType } from "./../index";

export default interface SignUpDto {
  email: string;
  name: string;
  password?: string;
  nickname: string;
  registerType: RegisterType;
}
